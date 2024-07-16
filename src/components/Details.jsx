import { Link } from "react-router-dom";
import { useTheme } from "./themeprovider.jsx";
import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
//ui imports
import {
	LogOut,
	Plus,
	Printer,
	Save,
	Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.jsx";
import { useToast } from "./ui/use-toast.js";
//import DetailsTable from "./DetailsTable.jsx";
import {DataTableDemo} from "./ExpTable.jsx"
//zod schema

// const formSchema = z.object({
// 	voucherNo: z.coerce.number({ required_error: "voucherNo is required" }),
// 	voucherDate: z.coerce.date(),
// 	bank: z
// 		.string({ message: "bank is required" })
// 		.min(1, "bank cannot be empty"),
// 	branch: z.string(),
// 	comments: z.string().optional(),
// });

const Details = () => {
    // const { toast } = useToast();
	// const { theme, setTheme } = useTheme();

	// const form = useForm({
	// 	resolver: zodResolver(formSchema),
	// 	defaultValues: {
	// 		voucherNo: "",
	// 		voucherDate: "",
	// 		bank: "",
	// 		branch: "",
	// 		comments: "",
	// 	},
	// });
	// async function onSubmit(data) {
	// 	console.log(data);
	// 	toast({
	// 		variant: "success",
	// 		title: "Success",
	// 		description: "Voucher created successfully",
	// 	});
	// 	await new Promise((r) => setTimeout(r, 2000));
	// 	form.reset();
	// }
	return (
		<div
			style={{
				borderRadius: "6px",
				border: "1px solid #E5E7EB",
				boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
			}}
			className="flex flex-col py-3 md:px-3 gap-4 bg-white dark:bg-[#1e1b47]"
			x-chunk="dashboard-02-chunk-1"
		>
			<Tabs defaultValue="details" className="max-md:mx-auto">
				<TabsList className="dark:bg-[rgba(255,255,255,0.5)]">
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="file" className="dark:text-white">
						File Upload
					</TabsTrigger>
				</TabsList>
			</Tabs>
			
			{/* //add table here */}
			<div className="max-md:w-[95vw] mx-auto overflow-hidden w-full p-1">
				<DataTableDemo />
			</div>
			<div className="flex gap-5 max-md:gap-1 max-md:mx-auto">
				<Button className="dark:bg-[#5D7285] dark:text-white flex gap-2 items-center hover:bg-[#576a7c]">
					<Printer />
					Print
				</Button>
				<Button className="dark:bg-[#5D7285] dark:text-white flex gap-2 items-center hover:bg-[#576a7c]">
					<Save />
					Save
				</Button>
				<Button className="dark:bg-[#5D7285] dark:text-white flex gap-2 items-center hover:bg-[#576a7c]">
					<LogOut />
					Exit
				</Button>
			</div>
		</div>
	);
};

export default Details;
