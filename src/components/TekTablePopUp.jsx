import { useState, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Check, Plus, Save, X } from "lucide-react";
import AutoCompleteInput from "./AutoCompleteInput";


export function TekTablePopUpEdit({ row, colData, updateEntry, formSchema }) {
	const [entry, setEntry] = useState({});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const initialEntry = {};
		initialEntry.id = row.original.id;
		initialEntry.avatar = row.original.avatar;
		colData.forEach((col) => {
			initialEntry[col.name] = row.getValue(col.name);
		});
		setEntry(initialEntry);
	}, [row, colData]);

	// Update the state based on input changes
	function handleInputChange(field, value, suggestion) {
		//const fieldName = field.name;
		//console.log(fieldName);
		// if (field.peers && field.peers.length > 0 && suggestion) {
		// 	console.log(suggestion);
		// 	console.log(suggestion[fieldName]);
		// 	setEntry((prev) => ({
		// 		...prev,
		// 		[fieldName]: suggestion[fieldName],
		// 	}));
		// } else {
		// 	//console.log(value);
		// 	setEntry((prev) => ({
		// 		...prev,
		// 		[fieldName]: value,
		// 	}));
		// }
		setEntry((prev) => ({
			...prev,
			[field.name]: (field.peers && field.peers.length > 0 && suggestion) ? suggestion[field.name] : value,
		}));
	}

	function updateChildren(field, value, suggestion) {
		if (field.peers && field.peers.length > 0) {
			const peerValues = {};
			field.peers.forEach((peer) => {
				peerValues[peer] = value[peer];
			});
			//console.log(value[fieldName]);
			setEntry((prev) => ({
				...prev,
				[field.name]: value[field.name],
				...peerValues,
			}));
		}
	}

	// Validate the entry against the schema
	function validateEntry() {
		try {
			formSchema.parse(entry);
			setErrors({});
			return true;
		} catch (err) {
			if (err instanceof z.ZodError) {
				const fieldErrors = err.flatten().fieldErrors;
				setErrors(fieldErrors);
			}
			return false;
		}
	}

	// Handle form submission
	function onSubmit(event) {
		event.preventDefault();
		if (validateEntry()) {
			//console.log(entry); // Submit the validated entry
			updateEntry(entry); // Call the update function
		}
	}

	return (
		<DialogContent className="md:max-w-[60%] sm:h-[85%] md:h-max lg:h-[85%]">
			<DialogHeader>
				<DialogTitle>Edit</DialogTitle>
				<DialogDescription>
					Make changes to your row here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<form onSubmit={onSubmit}>
				<div className="grid gap-4 pb-4">
					{colData.map((field) => {
						const id = `${field.name}-${row.original.id}`;
						return (
							<div
								key={id}
								// className="grid tektablepopupformitem items-center gap-x-4 gap-y-1 md:grid-cols-3 lg:grid-cols-1"
								className="grid tektablepopupformitem items-center gap-x-4 gap-y-1"
							>
								<label
									htmlFor={id}
									className="text-left text-foreground text-sm"
								>
									{field.displayName}
								</label>
								{field.type === "comment" ? (
									<>
									<Textarea
										id={id}
										value={entry[field.name] || ""}
										onChange={(e) =>
											handleInputChange(
												field,
												e.target.value
											)
										}
										className="col-span-1 dark:bg-[#5D7285] dark:text-white"
									/>
									{errors[field.name] && (
										<><div></div>
										<p className="block text-red-500 text-xs">
											{errors[field.name]}
										</p></>
									)}</>
								) : field.type === "boolean" ? (
									<TekTableFlag
										bool={entry[field.name]}
										entry={entry}
										setEntry={setEntry}
										field={field}
									/>
								) : field.autoComplete ? (
									<>
									<AutoCompleteInput
										className="dark:bg-[#5D7285] dark:text-white"
										value={entry[field.name] || ""}
										name={field.name}
										field={field}
										onChange={(e, suggestion) =>
											handleInputChange(
												field,
												e.target.value,
												suggestion
											)
										}
										hasChildren={true}
										updateChildren={updateChildren}
										placeholder={field.displayName}
										urlpath={field.urlPath}
									/>
									{errors[field.name] && (
										<><div></div>
										<p className="block text-red-500 text-xs">
											{errors[field.name]}
										</p></>
									)}</>
								) : (
									<>
									<Input
										id={id}
										placeholder={field.displayName}
										type="text"
										value={entry[field.name] || ""}
										onChange={(e) =>
											handleInputChange(
												field,
												e.target.value
											)
										}
										className="dark:bg-[#5D7285] dark:text-white"
										disabled={field.disabled || false}
									/>
									{errors[field.name] && (
										<><div></div>
										<p className="block text-red-500 text-xs">
											{errors[field.name]}
										</p></>
									)}</>
								)}
								{/* {errors[field.name] && (
									<p className="text-red-500 text-xs">
										{errors[field.name]}
									</p>
								)} */}
							</div>
						);
					})}
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						className="bg-transparent dark:bg-sky-500/60 border border-sky-500/60 dark:border-white/20 text-gray-600 dark:text-white flex gap-2 items-center hover:bg-sky-500/60 hover:text-white"
						type="submit"
					>
						<Save className="h-4 w-4" />
						Save Changes
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}

export function TekTablePopUpAdd({ colData, updateEntry, formSchema }) {
	const [entry, setEntry] = useState({});
	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	// useEffect(() => {
	// 	let initialEntry = {};
	// 	colData.forEach((col) => {
	// 		if (!col.hideInAdd) {
	// 			initialEntry[col.name] = "";
	// 		};
	// 	});
	// 	setEntry(initialEntry);
	// }, [isSubmitted]);
	function handleInputChange(field, value, suggestion) {
		// const fieldName = field.name;
		// //console.log(fieldName);
		// if (field.peers && field.peers.length > 0 && suggestion) {
		// 	console.log(suggestion[fieldName]);
		// 	setEntry((prev) => ({
		// 		...prev,
		// 		[fieldName]: suggestion[fieldName],
		// 	}));
		// } else {
		// 	//console.log(value);
		// 	setEntry((prev) => ({
		// 		...prev,
		// 		[fieldName]: value,
		// 	}));
		// }
		setEntry((prev) => ({
			...prev,
			[field.name]: (field.peers && field.peers.length > 0 && suggestion) ? suggestion[field.name] : value,
		}));
	}

	function updateChildren(field, value, suggestion) {
		const fieldName = field.name;
		if (field.peers && field.peers.length > 0) {
			const peerValues = {};
			field.peers.forEach((peer) => {
				peerValues[peer] = value[peer];
			});
			//console.log(value[fieldName]);
			setEntry((prev) => ({
				...prev,
				[fieldName]: value[fieldName],
				...peerValues,
			}));
		}
	}
	function validateEntry() {
		try {
			
			formSchema.parse(entry);
			setErrors({});
			return true;
		} catch (err) {
			if (err instanceof z.ZodError) {
				const fieldErrors = err.flatten().fieldErrors;
				setErrors(fieldErrors);
			}
			return false;
		}
	}
	function onSubmit(event) {
		event.preventDefault();
		
		if (validateEntry()) {
			//console.log(entry); // Submit the validated entry
			updateEntry(entry); // Call the update function
			setIsSubmitted(true);
		}
	}
	return (
		<DialogContent className="md:max-w-[60%] sm:h-[85%] md:h-max lg:h-[85%]">
			<DialogHeader>
				<DialogTitle>Add a new entry</DialogTitle>
				<DialogDescription>
					Add your details here. Click add when you're done.
				</DialogDescription>
			</DialogHeader>
			<form onSubmit={onSubmit}>
				<div className="grid gap-4 pb-4">
					{colData.map((field, index) => {
						const id = `${field.name}-${index}`;
						if (field.hideInAdd) return null;						
						return (
							<div
								key={id}
								className="grid tektablepopupformitem items-center gap-x-4 gap-y-1"
							>
								<Label
									htmlFor={id}
									className="text-left text-foreground"
								>
									{field.displayName}
								</Label>
								{/* <CustomeComponent field = {field}/> */}
								{field.type === "comment" ? (
									<>
									<Textarea
										id={id}
										value={entry[field.name] || ""}
										onChange={(e) =>
											handleInputChange(
												field,
												e.target.value
											)
										}
										className="col-span-1 dark:bg-[#5D7285] dark:text-white"
									/>
									{errors[field.name] && (
										<><div></div>
										<p className="block text-red-500 text-xs">
											{errors[field.name]}
										</p></>
									)}</>
								) : field.type == "boolean" ? (
									<TekTableFlag
										bool={false}
										entry={entry}
										setEntry={setEntry}
										field={field}
									/>
								) : field.autoComplete ? (
									<>
									<AutoCompleteInput
										className="dark:bg-[#5D7285] dark:text-white"
										value={entry[field.name] || ""}
										name={field.name}
										field={field}
										onChange={(e, suggestion) =>
											handleInputChange(
												field,
												e.target.value,
												suggestion
											)
										}
										hasChildren={true}
										updateChildren={updateChildren}
										placeholder={field.displayName}
										urlpath={field.urlPath}
									/>
									{errors[field.name] && (
										<><div></div>
										<p className="block text-red-500 text-xs">
											{errors[field.name]}
										</p></>
									)}</>
								) : (
									<>
									<Input
										id={id}
										placeholder={field.displayName}
										type = "text"
										value={entry[field.name] || ""}
										onChange={(e) =>
											handleInputChange(
												field,
												e.target.value
											)
										}
										className="dark:bg-[#5D7285] dark:text-white"
										disabled={field.disabled || false}
									/>
									{errors[field.name] && (
										<><div></div>
										<p className="block text-red-500 text-xs">
											{errors[field.name]}
										</p></>
									)}</>
								)}
								{/* <div></div>
								{errors[field.name] && (
									<p className="text-red-500 text-xs">
										{errors[field.name]}
									</p>
								)} */}
							</div>
						);
					})}
				</div>
				<DialogFooter>
					{/* <Button
						type="submit"
						className="flex items-center bg-green-500 text-foreground hover:bg-green-600 md:mr-2"
						// onClick={() => {
						// 	validateEntry();
						// 	updateEntry(entry);
						// }}
					>
						<Plus />
						Add
					</Button> */}
					<Button
						variant="outline"
						className="bg-transparent dark:bg-sky-500/60 border border-sky-500/60 dark:border-white/20 text-gray-600 dark:text-white flex gap-2 items-center hover:bg-sky-500/60 hover:text-white"
						type="submit"
					>
						<Save className="h-4 w-4" />
						Save
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}

// function CustomeComponent({ field }) {

// 	switch (field.type) {
// 		case "boolean": return <TekTableFlag bool={false} entry={entry} setEntry={setEntry} field={field}/>;
// 		default: return (<Input
// 		id={id}
// 		placeholder={field.displayName}
// 		type = {field.type === "number" ? "number" : "text"}
// 		value={entry[field.name] || ""}
// 		onChange={(e) =>
// 			handleInputChange(
// 				field,
// 				e.target.value
// 			)
// 		}
// 		className="dark:bg-[#5D7285] dark:text-white"
// 		disabled={field.disabled || false}
// 	/>);
// 	}
// }

function TekTableFlag({ bool, entry, setEntry, field }) {
	const [flag, setFlag] = useState(bool);
	useEffect(() => {
		const obj = { ...entry };
		obj[field.name] = flag;
		setEntry(obj);
	}, [flag]);
	return (
		<Button
			variant="ghost"
			size="icon"
			className="cursor-pointer"
			onClick={(e) => {
				e.preventDefault();
				setFlag(!flag);
			}}
		>
			{flag ? (
				<Check className="text-green-500 w-4 h-4" />
			) : (
				<X className="text-red-500 w-4 h-4" />
			)}
		</Button>
	);
}
