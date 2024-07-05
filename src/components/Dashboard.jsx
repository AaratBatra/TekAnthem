import { Link } from "react-router-dom";
import { useTheme } from "./themeprovider.jsx";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
//ui imports
import {
	Bell,
	CircleUser,
	LayoutDashboard,
	LogOut,
	Menu,
	Package,
	Package2,
	Plus,
	Printer,
	Save,
	Search,
	ShoppingCart,
	Table2,
	Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "./ui/switch";
import NavActiveContents from "./NavActiveContents";
import NavMobActiveContents from "./NavMobActiveContents";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { useToast } from "./ui/use-toast.js";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea.jsx";

//zod schema

const formSchema = z.object({
	voucherNo: z.coerce.number({ required_error: "voucherNo is required" }),
	voucherDate: z.coerce.date(),
	bank: z
		.string({ message: "bank is required" })
		.min(1, "bank cannot be empty"),
	branch: z.string(),
	comments: z.string().optional(),
});
export function Dashboard() {
	const { toast } = useToast();
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
	function handleToggleTheme() {
		if (theme == "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}
	return (
		<div
			className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]`}
		>
			<div className="hidden border-r h-full bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2 lg:fixed lg:top-0 lg:left-0 lg:w-[280px]">
					<div className="flex py-4 items-center border-b px-4 lg:px-6">
						<Link
							to="/"
							className="flex items-center gap-2 font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="">TekAnthem</span>
						</Link>
						<Button
							variant="outline"
							size="icon"
							className="ml-auto h-8 w-8"
						>
							<Bell className="h-5 w-5" />
							<span className="sr-only">
								Toggle notifications
							</span>
						</Button>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								to="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							>
								<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
									<LayoutDashboard className="h-5 w-5" />
								</div>
								Dashboard2
							</Link>
							<Link
								to="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							>
								<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
									<ShoppingCart className="h-5 w-5" />
								</div>
								Payables
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									6
								</Badge>
							</Link>
							<Link
								to="#"
								className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							>
								<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
									<Package className="h-5 w-5" />
								</div>
								Receivables{" "}
							</Link>
							<Link
								to="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							>
								<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
									<Table2 className="h-5 w-5" />
								</div>
								Ledger
							</Link>
							<NavActiveContents
								contents={[
									"Inventory",
									"Account Chart",
									"Payment",
									"Receipt",
									"Journal",
									"Contra",
								]}
							/>
						</nav>
					</div>
					<div className="mt-auto p-1">
						<Card x-chunk="dashboard-02-chunk-0">
							<CardHeader className="p-1 pt-0 pb-1">
								<CardTitle className="hidden"></CardTitle>
								<CardDescription className="hidden"></CardDescription>
								<div className="w-full p-2 flex items-center justify-between">
									<svg
										width="51"
										height="52"
										viewBox="0 0 51 52"
										fill={
											theme == "dark"
												? "#FFFFFF"
												: "#5D7285"
										}
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clip-path="url(#clip0_14_430)">
											<path
												d="M27.3639 42.8308C32.5268 42.8308 37.2421 40.4818 40.3661 36.6328C40.8282 36.0635 40.3243 35.2316 39.6101 35.3676C31.4891 36.9142 24.0314 30.6877 24.0314 22.4899C24.0314 17.7677 26.5593 13.4253 30.6678 11.0872C31.3012 10.7268 31.1419 9.76662 30.4223 9.6337C29.4134 9.44767 28.3897 9.354 27.3639 9.35385C18.1245 9.35385 10.6254 16.8411 10.6254 26.0923C10.6254 35.3317 18.1127 42.8308 27.3639 42.8308Z"
												fill={
													theme == "dark"
														? "#FFFFFF"
														: "#5D7285"
												}
											/>
										</g>
										<defs>
											<clipPath id="clip0_14_430">
												<rect
													width="33.4769"
													height="33.4769"
													fill="white"
													transform="translate(8.84613 9.35385)"
												/>
											</clipPath>
										</defs>
									</svg>
									<Button size="sm" variant="ghost">
										{theme == "dark"
											? "Dark Mode"
											: "Light Mode"}
									</Button>
									<Switch
										onCheckedChange={handleToggleTheme}
										checked={theme == "dark"}
									/>
								</div>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Button
									size="sm"
									className="w-full py-6 flex justify-between items-center dark:text-white"
								>
									<svg
										width="35"
										height="34"
										viewBox="0 0 35 34"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M16.7692 2.94352C20.2321 2.94352 23.0563 5.71931 23.0563 9.13675V15.8182H14.5411C13.9308 15.8182 13.4483 16.2924 13.4483 16.8922C13.4483 17.4781 13.9308 17.9663 14.5411 17.9663H23.0563V24.6338C23.0563 28.0512 20.2321 30.841 16.7408 30.841H9.82933C6.35229 30.841 3.52808 28.0652 3.52808 24.6477V9.1507C3.52808 5.71931 6.36648 2.94352 9.84352 2.94352H16.7692ZM26.5995 12.0802C27.018 11.6478 27.7015 11.6478 28.1199 12.0663L32.193 16.1253C32.4022 16.3346 32.5138 16.5996 32.5138 16.8925C32.5138 17.1715 32.4022 17.4505 32.193 17.6457L28.1199 21.7048C27.9107 21.9141 27.6317 22.0256 27.3667 22.0256C27.0877 22.0256 26.8088 21.9141 26.5995 21.7048C26.1811 21.2864 26.1811 20.6029 26.5995 20.1844L28.8313 17.9666H23.0566V15.8185H28.8313L26.5995 13.6006C26.1811 13.1822 26.1811 12.4987 26.5995 12.0802Z"
											fill="white"
										/>
									</svg>
									Log out
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
					<Sheet className="max-sm:px-3">
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">
									Toggle navigation menu
								</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="left"
							className="flex flex-col max-sm:px-3"
						>
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									to="#"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<Package2 className="h-6 w-6" />
									<span className="sr-only">Acme Inc</span>
								</Link>
								<Link
									to="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 max-md:py-[3px] text-muted-foreground  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
								>
									<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
										<LayoutDashboard className="h-5 w-5" />
									</div>
									Dashboard2
								</Link>
								<Link
									to="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 max-md:py-[6px] text-foreground hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
								>
									<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
										<ShoppingCart className="h-5 w-5" />
									</div>
									Payables
									<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
										6
									</Badge>
								</Link>
								<Link
									to="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 max-md:py-[3px] text-muted-foreground  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
								>
									<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
										<Package className="h-5 w-5" />
									</div>
									Receivables
								</Link>
								<Link
									to="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 max-md:py-[3px] text-muted-foreground  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
								>
									<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
										<Table2 className="h-5 w-5" />
									</div>
									Ledger
								</Link>
								<NavMobActiveContents
									contents={[
										"Inventory",
										"Account Chart",
										"Payment",
										"Receipt",
										"Journal",
										"Contra",
									]}
								/>
							</nav>
							{/*  */}
							<div className="mt-auto">
								<Card>
									<CardHeader className="px-6 py-3 max-md:p-1">
										<CardTitle className="hidden"></CardTitle>
										<CardDescription className="hidden"></CardDescription>
										<div className="w-full px-2 flex justify-between items-center">
											<svg
												width="51"
												height="52"
												viewBox="0 0 51 52"
												fill={
													theme == "dark"
														? "#FFFFFF"
														: "#5D7285"
												}
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0_14_430)">
													<path
														d="M27.3639 42.8308C32.5268 42.8308 37.2421 40.4818 40.3661 36.6328C40.8282 36.0635 40.3243 35.2316 39.6101 35.3676C31.4891 36.9142 24.0314 30.6877 24.0314 22.4899C24.0314 17.7677 26.5593 13.4253 30.6678 11.0872C31.3012 10.7268 31.1419 9.76662 30.4223 9.6337C29.4134 9.44767 28.3897 9.354 27.3639 9.35385C18.1245 9.35385 10.6254 16.8411 10.6254 26.0923C10.6254 35.3317 18.1127 42.8308 27.3639 42.8308Z"
														fill={
															theme == "dark"
																? "#FFFFFF"
																: "#5D7285"
														}
													/>
												</g>
												<defs>
													<clipPath id="clip0_14_430">
														<rect
															width="33.4769"
															height="33.4769"
															fill="white"
															transform="translate(8.84613 9.35385)"
														/>
													</clipPath>
												</defs>
											</svg>{" "}
											<Button
												size="sm"
												variant="ghost"
												className="bg-none"
											>
												{theme == "dark"
													? "Dark Mode"
													: "Light Mode"}
											</Button>
											<Switch
												onCheckedChange={
													handleToggleTheme
												}
												checked={theme == "dark"}
											/>
										</div>
									</CardHeader>
									<CardContent className="px-6 pt-2 pb-3 max-sm:p-2">
										<Button
											size="sm"
											className="w-full py-6 flex justify-between items-center"
										>
											<svg
												width="35"
												height="34"
												viewBox="0 0 35 34"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M16.7692 2.94352C20.2321 2.94352 23.0563 5.71931 23.0563 9.13675V15.8182H14.5411C13.9308 15.8182 13.4483 16.2924 13.4483 16.8922C13.4483 17.4781 13.9308 17.9663 14.5411 17.9663H23.0563V24.6338C23.0563 28.0512 20.2321 30.841 16.7408 30.841H9.82933C6.35229 30.841 3.52808 28.0652 3.52808 24.6477V9.1507C3.52808 5.71931 6.36648 2.94352 9.84352 2.94352H16.7692ZM26.5995 12.0802C27.018 11.6478 27.7015 11.6478 28.1199 12.0663L32.193 16.1253C32.4022 16.3346 32.5138 16.5996 32.5138 16.8925C32.5138 17.1715 32.4022 17.4505 32.193 17.6457L28.1199 21.7048C27.9107 21.9141 27.6317 22.0256 27.3667 22.0256C27.0877 22.0256 26.8088 21.9141 26.5995 21.7048C26.1811 21.2864 26.1811 20.6029 26.5995 20.1844L28.8313 17.9666H23.0566V15.8185H28.8313L26.5995 13.6006C26.1811 13.1822 26.1811 12.4987 26.5995 12.0802Z"
													fill="white"
												/>
											</svg>
											Log out
										</Button>
									</CardContent>
								</Card>
							</div>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex flex-col items-center">
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
								>
									<CircleUser className="h-8 w-8" />
									<span className="sr-only">
										Toggle user menu
									</span>
								</Button>
								<p className="text-center text-sm">
									Sanjay Kumar
								</p>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					<div className="flex items-center w-20">
						<Avatar className="size-16">
							<AvatarImage
								src={"/assets/e-shipping.png"}
								alt="company logo"
								className="object-center object-cover"
							/>
							<AvatarFallback>Profile</AvatarFallback>
						</Avatar>
						<h1 className="text-md font-light text-center mt-0 ms-2">
							Inventory
						</h1>
					</div>
					<div
						style={{
							borderRadius: "6px",
							border: "1px solid #E5E7EB",
							boxShadow:
								"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
						}}
						// dark:bg-[#1e1b47]
						className="py-3 px-5 bg-white dark:bg-[#1e1b47]"
					>
						<h1 className="text-4xl font-bold text-[#305fe1] mb-3">
							Payment
						</h1>
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
										<Button
											className="w-24 h-10 self-end dark:bg-[#5D7285] dark:text-white hover:bg-[#576a7c]"
											type="submit"
										>
											Submit
										</Button>
									</div>
								</div>
							</form>
						</Form>
					</div>
					<div
						style={{
							borderRadius: "6px",
							border: "1px solid #E5E7EB",
							boxShadow:
								"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
						}}
						className="flex flex-col py-3 px-5 gap-4 bg-white dark:bg-[#1e1b47]"
						x-chunk="dashboard-02-chunk-1"
					>
						<Tabs defaultValue="details" className="max-md:mx-auto">
							<TabsList className="dark:bg-[rgba(255,255,255,0.5)]">
								<TabsTrigger value="details">
									Details
								</TabsTrigger>
								<TabsTrigger
									value="file"
									className="dark:text-white"
								>
									File Upload
								</TabsTrigger>
							</TabsList>
						</Tabs>
						<div className="flex justify-between w-48 max-md:mx-auto">
							<Button className="flex items-center bg-green-500 text-white hover:bg-green-600">
								<Plus />
								Add
							</Button>
							<Button
								variant="destructive"
								className="flex items-cente text-white"
							>
								<Trash />
								Delete
							</Button>
						</div>
						<div
							style={{
								padding: "10px 20px",
							}}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full items-center justify-center gap-[30px] flex-wrap"
						>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Paid To
								</h1>
							</div>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Debit
								</h1>
							</div>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Reference
								</h1>
							</div>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Comment
								</h1>
							</div>
						</div>
						<div className="flex gap-5 max-md:gap-1">
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
				</main>
			</div>
			<Toaster className="bg-green-500" />
		</div>
	);
}
