import { useState, useMemo, useEffect } from "react";
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
import { Plus } from "lucide-react";

export function TekTablePopUpEdit({ row, colData, updateEntry }) {
	const [entry, setEntry] = useState({});
	useEffect(() => {
		let initialEntry = {};
		initialEntry.id = row.original.id;
        initialEntry.avatar = row.original.avatar;
		colData.forEach((col) => {
			initialEntry[col.name] = row.getValue(col.name);
		});
        console.log(initialEntry)
		setEntry(initialEntry);
	}, [row, colData]);
	return (
		<DialogContent className="sm:max-w-[50%] sm:h-[80%]">
			<DialogHeader>
				<DialogTitle>Edit</DialogTitle>
				<DialogDescription>
					Make changes to your row here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 pb-4">
				{colData.map((field, index) => {
					const id = `${field.name}-${row.original.id}`;
					return (
						<div
							key={id}
							className="grid grid-cols-4 items-center gap-4"
						>
							<Label
								htmlFor={id}
								className="text-left text-foreground"
							>
								{field.displayName}
							</Label>
							{field.type === "comment" ? (
								<Textarea
									id={id}
									defaultValue={row.getValue(field.name)}
									onChange={(e) => {
										const obj = { ...entry };
										obj[field.name] = e.target.value;
										setEntry(obj);
									}}
									rows={3}
									className="col-span-3 dark:bg-[#5D7285] dark:text-white"
								/>
							) : (
								<Input
									id={id}
									defaultValue={row.getValue(field.name)}
									onChange={(e) => {
										const obj = { ...entry };
										obj[field.name] = e.target.value;
										setEntry(obj);
									}}
									className="col-span-3 dark:bg-[#5D7285] dark:text-white"
								/>
							)}
						</div>
					);
				})}
			</div>
			<DialogFooter>
				<Button
					type="submit"
					className="text-foreground"
					onClick={() => updateEntry(entry)}
				>
					Save changes
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}

export function TekTablePopUpAdd({ colData, updateEntry }) {
    const [entry, setEntry] = useState({});
	useEffect(() => {
		let initialEntry = {};
		colData.forEach((col) => {
			initialEntry[col.name] = "";
		});
		setEntry(initialEntry);
	}, []);
	return (
		<DialogContent className="sm:max-w-[50%] sm:h-[80%]">
			<DialogHeader>
				<DialogTitle>Add a new entry</DialogTitle>
				<DialogDescription>
					Add your details here. Click add when you're done.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 pb-4">
				{colData.map((field, index) => {
					const id = `${field.name}-${index}`;
					return (
						<div
							key={id}
							className="grid grid-cols-4 items-center gap-4"
						>
							<Label
								htmlFor={id}
								className="text-left text-foreground"
							>
								{field.displayName}
							</Label>
							{field.type === "comment" ? (
								<Textarea
									id={id}
									onChange={(e) => {
										const obj = { ...entry };
										obj[field.name] = e.target.value;
										setEntry(obj);
									}}
									rows={3}
									value={entry[field.name]}
									className="col-span-3 dark:bg-[#5D7285] dark:text-white"
								/>
							) : (
								<Input
									id={id}
									onChange={(e) => {
										const obj = { ...entry };
										obj[field.name] = e.target.value;
										setEntry(obj);
									}}
									value={entry[field.name]}
									className="col-span-3 dark:bg-[#5D7285] dark:text-white"
								/>
							)}
						</div>
					);
				})}
			</div>
			<DialogFooter>
				<Button
					type="submit"
					className="flex items-center bg-green-500 text-foreground hover:bg-green-600 md:mr-2"
					onClick={() => updateEntry(entry)}
				>
					<Plus />
					Add
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
