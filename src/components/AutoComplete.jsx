import { useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import Autosuggest from "react-autosuggest";


/*
	This custom autocomplete component is used to display suggestions for the form.
	we need to have a complete overview of this component and how it works exactly...
	1. The input component must receive form originated by calling useForm from react hook form
	2. name is the name of the input in the form which is used for error setting and value setting of the input
	3. urlPath is the path to fetch suggestions from
	4. handleInputChange is a function that is called when the user types in the input
	5. toAccessInAPIresponse is an object that will tell this component what fields to access and how as we don't know what the api response will look like.

	Working of this component-
	
*/
const AutoComplete = ({ form, name, urlPath, handleInputChange, toAccessInAPIresponse }) => {
	const [suggestions, setSuggestions] = useState([]);
	const onSuggestionsFetchRequested = useDebouncedCallback(
		async ({ value }) => {
			const suggs = await getSuggestions(value);
			setSuggestions(suggs);
		},
		300
	);

	const onSuggestionsClearRequested = () => {
		setSuggestions(suggestions);
	};

	const fetchSuggestions = async (query, path) => {
		try {
			const res = await axios.get(path, {
				params: {
					q: query,
				},
			});
			//console.log(res.data)
			//if (res.data.length == 0) return [];
			if (res.data.length == 0 || res.data.data[0] == null) {
				form.setError(`${name}`, {message: "No suggestions found please try something else"})
				return [];
			}
			return res.data.data;
		} catch (error) {
			console.error("error fetching suggestions: ", error);
			return [];
		}
	};

	const getSuggestions = async (value) => {
        //console.log(typeof value);
		const inputValue = value//isNaN(value) ? value.trim().toLowerCase() : String(value);
		const res = await fetchSuggestions(inputValue, urlPath);
		//if (res == undefined) return [];
		return res;
	};

	const getSuggestionValue = (suggestion) => suggestion;

	const renderSuggestion = (suggestion) => (
		<div className="w-full p-2 my-2 first:mt-1 last:mb-1 bg-white hover:bg-sky-100 hover:text-blue-500 dark:hover:bg-black dark:bg-card cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 capitalize">
			{suggestion}
		</div>
	);

    // const shouldRenderSuggestions = (value) => {
    //     // Convert value to string and trim
    //     return String(value).trim().length > 0;
    // };

	const renderSuggestionsContainer = ({
		containerProps,
		children,
		query,
	}) => {
        const key = containerProps.key || 0;
        delete containerProps.key;
		return (
			<>
				{query && children ? (
					<div
						className="absolute z-10 w-[300px] p-1 rounded-lg border shadow-md bg-background"
                        key={key}
                        {...containerProps}
					>
						{children}
					</div>
				) : (
					<></>
				)}
			</>
		);
	};
	const inputProps = {
		placeholder: `Select ${name}`,
		value: isNaN(form.watch(`${name}`)) ? form.watch(`${name}`).charAt(0).toUpperCase() + form.watch(`${name}`).slice(1) : form.watch(`${name}`),
		className:
			"flex h-10 myinput-width mx-[-0.5rem] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#5D7285] dark:text-white",
		onChange: (event, { newValue }) => {
			//if (event.target.value.length == 0) 
			form.setValue(`${name}`, newValue.toString());
			handleInputChange(`${name}`, newValue);
		},
		onBlur: () => {
			// Clear the input if the value is not in suggestions
			const inp = form.getValues(`${name}`);
			if (inp.length == 0 || inp == undefined || inp == null) return; 
			if (!suggestions.includes(inp) && !suggestions.includes(parseInt(inp))) {
				//form.setValue('branch', '');
				if (form.formState.errors[`${name}`] !== undefined) {
					// there is already some error
					// the user has entered something NOT found in the suggestions
					// in this case, just let that error stay
					return
				}
				form.setError(`${name}`, {
					message: "Please select from the suggestions only",
				});
			} else {
				form.clearErrors(`${name}`);
			}
		},
	};

	const onSuggestionSelected = (event, { suggestionValue }) => {
		//form.setValue("branch", suggestionValue);
		handleInputChange(`${name}`, suggestionValue);
	};

	const renderInputComponent = (inputProps) => {
        //const {key, ...otherProps} = inputProps;
		const key = inputProps.key;
		delete inputProps.key;
		return <input key={key} {...inputProps}></input>;
	};
	return (
		<Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			onSuggestionsClearRequested={onSuggestionsClearRequested}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={inputProps}
			onSuggestionSelected={onSuggestionSelected}
			renderInputComponent={renderInputComponent}
			renderSuggestionsContainer={renderSuggestionsContainer}
            //shouldRenderSuggestions={shouldRenderSuggestions}
			theme={{
				container: "m-2",
				input: "p-2 bg-gray-300 w-full",
			}}
		/>
	);
};

export default AutoComplete;
