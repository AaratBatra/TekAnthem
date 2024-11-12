import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
const AutoCompleteInput = (Inputprops) => {
    const inputRef = useRef(null);
	const [suggestions, setSuggestions] = useState([]);
    const [suggestionClicked, setSuggestionClicked] = useState(false);
	const { value, urlpath, onChange, name, field, hasChildren, updateChildren, ...rest } = Inputprops;
	
	const prepareData = (data) => {
		if (!data.responseData) return null;
		const arr = data.responseData;
		return arr.map((entry)=>{
			let grp_type = null;
			if (entry.additionalData1 === "A") {
				grp_type = "Asset"
			} else if (entry.additionalData1 === "L") {
				grp_type = "Liability"
			} else if (entry.additionalData1 === "E") {
				grp_type = "Expense"
			} else if (entry.additionalData1 === "I") {
				grp_type = "Income"
			} else {
				grp_type = entry.additionalData1;
			}
			return {
				groupCode: entry.code,
				group: entry.value,
				Type: grp_type ? grp_type : "null"
			}
		})
	}
	const fetchSuggestions = async (urlpath) => {
		try {
			//console.log(name);
			const payload = {
				term: value,
				companyId: localStorage.getItem("companyId"),
				lookupType: name.toUpperCase()
			}
			//console.log(payload);
			const res = await axios.post(urlpath, payload);
			//console.log(res.data);
			//console.log(prepareData(res.data));
			const preparedData = prepareData(res.data);
			if (!preparedData) throw new Error("problem in preparing the data received from api");
			setSuggestions(preparedData);
		} catch (error) {
			console.error(
				"error fetching suggestions for simple input: ",
				error
			);
		}
	};

    const debouncedFetchSuggestions = useDebouncedCallback((query) => {
        fetchSuggestions(urlpath, query);
    }, 200);

    useEffect(() => {
		if (value.length == 0 || suggestionClicked) {
            setSuggestions([]);
            setSuggestionClicked(false);
            return;
        };
		debouncedFetchSuggestions(value);
	}, [value]);

    const handleSuggestionClick = (suggestion) => {
        // Update the input value using the onChange handler
		if (hasChildren) {
			onChange({ target: { value: suggestion[name] } }, suggestion);
			updateChildren(field, suggestion);
		} else {
			onChange({ target: { value: suggestion } }, suggestion);
		}
        setSuggestions([]);
        setSuggestionClicked(true);
    };

	return (
		<div className="relative">
			<Input name={name} {...rest} value={value} onChange={onChange} ref={inputRef} autoComplete="off"/>
			{suggestions.length > 0 ? (
				<div className="absolute top-10 z-10">
					<ScrollArea className="border rounded-lg w-max max-h-[250px] p-1 shadow-md bg-background">
						<ul>
							{suggestions.map((suggestion, index) => (
								<div
									key={index}
									className="w-full p-2 my-2 first:mt-1 last:mb-1 bg-white hover:bg-sky-100 hover:text-blue-500 dark:hover:bg-black dark:bg-card cursor-pointer relative flex select-none items-center rounded-sm px-4 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 capitalize"
                                    onClick={() => handleSuggestionClick(suggestion)}
								>
									{suggestion[name] || suggestion}
								</div>
							))}
						</ul>
					</ScrollArea>
				</div>
			): <></>}
		</div>
	);
};

export default AutoCompleteInput;
