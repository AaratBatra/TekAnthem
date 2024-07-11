import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const DetailsTable = () => {
	return (
		<Table className="overflow-x-scroll w-auto">
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow className="w-auto">
					<TableHead className="px-1 text-center">Paid To</TableHead>
					<TableHead className="px-1 text-center">Debit</TableHead>
					<TableHead className="px-1 text-center">Reference</TableHead>
					<TableHead className="text-center px-1">Comment</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="w-auto">
				<TableRow className="w-auto">
					<TableCell className="text-center"><Input placeholder="@" /></TableCell>
					<TableCell className="text-center"><Input placeholder="amt" type="number" /></TableCell>
					<TableCell className="text-center"><Input placeholder="Doc" /></TableCell>
					<TableCell className="text-left flex-nowrap"><Input placeholder="..." /></TableCell>
				</TableRow>
                <TableRow>
					<TableCell className="text-center">INV001</TableCell>
					<TableCell className="text-center">Paid</TableCell>
					<TableCell className="text-center">Credit Card</TableCell>
					<TableCell className="text-center">$250.00</TableCell>
				</TableRow>
                <TableRow>
					<TableCell className="text-center">INV001</TableCell>
					<TableCell className="text-center">Paid</TableCell>
					<TableCell className="text-center">Credit Card</TableCell>
					<TableCell className="text-center">$250.00</TableCell>
				</TableRow>
                <TableRow>
					<TableCell className="text-center">INV001</TableCell>
					<TableCell className="text-center">Paid</TableCell>
					<TableCell className="text-center">Credit Card</TableCell>
					<TableCell className="text-center">$250.00</TableCell>
				</TableRow>
                <TableRow>
					<TableCell className="text-center">INV001</TableCell>
					<TableCell className="text-center">Paid</TableCell>
					<TableCell className="text-center">Credit Card</TableCell>
					<TableCell className="text-center">$250.00</TableCell>
				</TableRow>
                <TableRow>
					<TableCell className="text-center">INV001</TableCell>
					<TableCell className="text-center">Paid</TableCell>
					<TableCell className="text-center">Credit Card</TableCell>
					<TableCell className="text-center">$250.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default DetailsTable;
