import { useTheme } from "./themeprovider.jsx";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
//ui imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "./ui/use-toast.js";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea.jsx";

const formSchema = z.object({
	voucherNo: z.coerce.number({ required_error: "voucherNo is required" }),
	voucherDate: z.coerce.date(),
	bank: z
		.string({ message: "bank is required" })
		.min(1, "bank cannot be empty"),
	branch: z.string(),
	comments: z.string().optional(),
});
const Payments = () => {
	const { theme, setTheme } = useTheme();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			voucherNo: "",
			voucherDate: "",
			bank: "",
			branch: "",
			comments: "",
		},
	});
	async function onSubmit(data) {
		console.log(data);
		toast({
			variant: "success",
			title: "Success",
			description: "Voucher created successfully",
		});
		await new Promise((r) => setTimeout(r, 2000));
		form.reset();
	}

	return (
		<div
			style={{
				borderRadius: "6px",
				border: "1px solid #E5E7EB",
				boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
			}}
			// dark:bg-[#1e1b47]
			className="py-3 px-5 bg-white dark:bg-[#1e1b47]"
		>
			<h1 className="text-4xl font-bold text-[#305fe1] mb-3">Payment</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col">
							<FormField
								control={form.control}
								name="voucherNo"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Voucher No
										</FormLabel>
										<FormControl>
											<Input
												placeholder="#"
												type="number"
												className="dark:bg-[#5D7285] dark:text-white"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bank"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Cash/Bank
										</FormLabel>
										<FormControl>
											<Input
												className="dark:bg-[#5D7285] dark:text-white"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="branch"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Branch
										</FormLabel>
										<FormControl>
											<Input
												className="dark:bg-[#5D7285] dark:text-white"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="voucherDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Voucher Date
										</FormLabel>
										<FormControl>
											<Input
												className="dark:bg-[#5D7285] dark:text-white"
												type="date"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								className="space-y-4"
								name="comments"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">
											Comments
										</FormLabel>
										<FormControl>
											<Textarea
												className="dark:bg-[#5D7285] dark:text-white"
												placeholder="comments"
												rows="4"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Payments;
