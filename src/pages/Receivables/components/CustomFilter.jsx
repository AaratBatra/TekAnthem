import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FlaskConical, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CustomFilter = ({ toggleFilter, columns, table, setCustomFiltering }) => {
	const [column, setColumn] = useState("");
	const [operator, setOperator] = useState("");
	const [value, setValue] = useState("");

	const handleApplyFilter = () => {
		setCustomFiltering({ column, operator, value });
	};

	const handleClearFilter = () => {
		setColumn("");
		setOperator("");
		setValue("");
		setCustomFiltering({ column: "", operator: "", value: "" });
		table.resetColumnFilters();
	};
	return (
		<div
			className={cn(
				"mx-auto w-full transition-all duration-500 overflow-hidden",
				toggleFilter ? "h-[250px]" : "h-0"
			)}
		>
			<Card className="mx-auto w-max max-md:w-fit dark:bg-transparent dark:border-gray-200">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Filter <FlaskConical className="w-4 h-4" />
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center">
					<div className="grid grid-cols-3 gap-4 items-center max-md:grid-cols-2">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="column">Columns</Label>
							<Select value={column} onValueChange={setColumn}>
								<SelectTrigger id="column">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent position="popper">
									{columns.map((column, idx, arr) =>
										idx === arr.length - 1 ? null : (
											<SelectItem
												key={column.id}
												value={column.id}
											>
												{column.id}
											</SelectItem>
										)
									)}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="operator">Operator</Label>
							<Select
								value={operator}
								onValueChange={setOperator}
							>
								<SelectTrigger id="operator">
									<SelectValue placeholder="Choose" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="contains">
										Contains
									</SelectItem>
									<SelectItem value="doesNotContain">
										Does not contain
									</SelectItem>
									<SelectItem value="equals">
										Equals
									</SelectItem>
									<SelectItem value="doesNotEqual">
										Does not equal
									</SelectItem>
									<SelectItem value="startsWith">
										Starts with
									</SelectItem>
									<SelectItem value="endsWith">
										Ends with
									</SelectItem>
									<SelectItem value="isEmpty">
										Is empty
									</SelectItem>
									<SelectItem value="isNotEmpty">
										Is not empty
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="value">Value</Label>
							<Input
								id="value"
								type="text"
								onChange={(e) => setValue(e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={handleClearFilter}>
						<Trash className="w-4 h-4 mr-2" /> Clear all
					</Button>
					<Button variant="outline" onClick={handleApplyFilter}>
                        <Plus className="w-4 h-4 mr-2" /> Apply Filter
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default CustomFilter;

// 		filterFns: {
// 			colContains: (row, columnId, filterValue) => {
// 				return row
// 					.getValue(columnId)
// 					.toLowerCase()
// 					.includes(filterValue.toLowerCase());
// 			},
// 			colDoesNotContain: (row, columnId, filterValue) => {
// 				return !row
// 					.getValue(columnId)
// 					.toLowerCase()
// 					.includes(filterValue.toLowerCase());
// 			},
// 			colEquals: (row, columnId, filterValue) => {
// 				return row.getValue(columnId) == filterValue;
// 			},
// 			colDoesNotEqual: (row, columnId, filterValue) => {
// 				return row.getValue(columnId) != filterValue;
// 			},
// 			colStartsWith: (row, columnId, filterValue) => {
// 				return row.getValue(columnId)
// 					.toString()
// 					.toLowerCase()
// 					.trim()
// 					.startsWith(filterValue);
// 			},
// 			// remove the filter value from filter state if it is falsy (empty string in this case)
// // 			colStartsWith.autoRemove = (val) => !val;

// // // transform/sanitize/format the filter value before it is passed to the filter function
// // colStartsWith.resolveFilterValue = (val) => val.toString().toLowerCase().trim();
// 		},
