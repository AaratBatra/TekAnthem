import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { updateFormData } from "@/store/slices/paymentSlice.js";
import { useImperativeHandle, forwardRef } from "react";

//ui imports
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea.jsx";
import AutoComplete from "./AutoComplete.jsx";

const formSchema = z.object({
	voucherNo: z.coerce.number({ required_error: "voucherNo is required" }),
	voucherDate: z.coerce.date(),
	bank: z
		.string({ message: "bank is required" })
		.min(1, "bank cannot be empty"),
	branch: z
		.string({ message: "branch is required" })
		.min(1, "branch cannot be empty"),
	comments: z.string().optional(),
});


const Payments = forwardRef((_, ref) => {
	const dispatch = useDispatch();
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
	useImperativeHandle(ref, () => ({
		handleSave: async () => {
			const isValid = await form.trigger(); // Trigger validation for the entire form
			return isValid;
		},
	}));

	function handleInputChange(fieldName, value) {
		const updatedData = { ...form.getValues(), [fieldName]: value };
		dispatch(updateFormData(updatedData));
	}
	return (
		<div
			style={{
				borderRadius: "6px",
				border: "1px solid #E5E7EB",
				boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
			}}
			className="py-3 px-5 bg-white dark:bg-[#1e1b47]"
		>
			<h1 className="text-4xl font-bold text-[#305fe1] mb-3">Payment</h1>
			<Form {...form}>
				<form className="space-y-8">
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
										<FormControl
											onChange={(e) =>
												handleInputChange(
													"voucherNo",
													e.target.value
												)
											}
										>
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
										<FormControl
											onChange={(e) =>
												handleInputChange(
													"bank",
													e.target.value
												)
											}
										>
											<AutoComplete form={form} name={'bank'} urlPath={'http://localhost:4000/payments/banks'} handleInputChange={handleInputChange}/>	
											{/* <Input
												className="dark:bg-[#5D7285] dark:text-white"
												{...field}
											/> */}
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
										<FormControl onChange={(e) =>
												handleInputChange(
													"branch",
													e.target.value
												)
											}>
											<AutoComplete form={form} name={'branch'} urlPath={'http://localhost:4000/payments/branch'} handleInputChange={handleInputChange}/>	
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
										<FormControl
											onChange={(e) =>
												handleInputChange(
													"voucherDate",
													e.target.value
												)
											}
										>
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
										<FormControl
											onChange={(e) =>
												handleInputChange(
													"comments",
													e.target.value
												)
											}
										>
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
});
export default Payments;
