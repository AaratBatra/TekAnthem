import { useState, useEffect } from "react";
import { setupAxiosInterceptors } from "@/service/index.js";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { performLogin } from "@/store/slices/AuthSlice";
// ui imports
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const loginSchema = z.object({
	email: z.string().email({
		message: "Invalid Email",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters",
	}),
});
export function LoginForm() {
	const dispatch = useDispatch();

	useEffect(() => {
		setupAxiosInterceptors(dispatch);
	}, [dispatch])

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const navigate = useNavigate();
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(data) {
		try {
			setIsLoading(true);
			const res = await axios.post("auth/login", {
				userId: data.email,
				password: data.password,
			});
			setIsLoading(false);
			if (res.data) {
				if (res.data.responseData) {
					const { token, companyName, userId, userName, companyId } =
						res.data.responseData;
					if (token) localStorage.setItem("token", token);
					dispatch(
						performLogin({
							companyName: companyName,
							userID: userId,
							username: userName,
							companyId: companyId
						})
					);
					toast({
						variant: "success",
						title: "Login Successful",
					});
					//setTimeout(() => navigate("/"), 3000);
					//navigate("/");
				} else {
					throw new Error("No token received");
				}
			} else {
				throw new Error("something went wrong");
			}
		} catch (error) {
			if (error.code === "ERR_NETWORK") {
				toast({
					variant: "destructive",
					title: "error in server communication",
					description:
						"maybe our server is down please try again later",
				});
			} else {
				console.error(error);
				toast({
					variant: "destructive",
					title: "some error has occurred",
				});
			}		
			setIsLoading(false);
		}
	}
	// async function tryfetch() {
	//     try {
	//         const res = await axios.post("v1/auth/login", {
	// 			"userId":"bhaumik.patel@tekanthem.com",
	// 			"password":"PdUYCPjaHs"
	// 		});
	//         console.log(res);
	//         console.log(res.data);
	// 		localStorage.setItem("token", res.data.responseData.token);
	//     } catch (error) {
	//         console.error(error)
	//     }
	// }
	return (
		<>
			<div className="w-full h-full bg-gray-50 dark:bg-background">
				<h1 className="text-5xl max-md:text-2xl text-center mt-6 mb-8">
					Welcome to Tek Anthem Technologies
				</h1>
				<div className="h-full w-full flex flex-col items-center justify-center">
					<Card className="w-[98%] max-w-lg border border-[#667A8A] dark:border-white rounded-3xl">
						<CardHeader className="mb-4">
							<CardTitle className="text-center text-4xl">
								Login
							</CardTitle>
							<CardDescription className="text-center text-lg">
								Enter your details below to login to your
								account
							</CardDescription>
						</CardHeader>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<CardContent className="grid gap-4">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel htmlFor="email">
													Email
												</FormLabel>
												<div className="flex gap-2 items-center">
													<FormControl>
														<Input
															id="email"
															type="email"
															placeholder="example@shikharlogistics.com"
															{...field}
														/>
														{/* <Mail /> */}
													</FormControl>
													<Mail />
												</div>
												{/* <FormDescription></FormDescription> */}
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* <FormItem className="grid gap-2">
										<FormLabel htmlFor="email">Email</FormLabel>
										<FormControl className="flex gap-2 items-center">
											<Input
												id="email"
												type="email"
												placeholder="example@shikharlogistics.com"
												{...field}
											/>
											<Mail />
										</FormControl>
										<FormMessage />
									</FormItem> */}
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel htmlFor="password">
													Password
												</FormLabel>
												<div className="flex gap-2 items-center">
													<FormControl>
														<Input
															id="password"
															type={
																showPassword
																	? "text"
																	: "password"
															}
															autoComplete="off"
															{...field}
														/>
													</FormControl>
													{showPassword ? (
														<EyeIcon
															className="select-none cursor-pointer"
															onClick={() =>
																setShowPassword(
																	false
																)
															}
														/>
													) : (
														<EyeOffIcon
															className="select-none cursor-pointer"
															onClick={() =>
																setShowPassword(
																	true
																)
															}
														/>
													)}
												</div>
												{/* <FormDescription></FormDescription> */}
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter className="flex-col gap-8 mt-6">
									{isLoading ? (
										<Button
											disabled
											className="w-full dark:text-white bg-slate-600 rounded-full"
										>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Please wait
										</Button>
									) : (
										<Button
											className="w-full dark:text-white hover:bg-slate-600 rounded-full"
											type="submit"
										>
											Log in
										</Button>
									)}

									<div className="flex justify-between items-center w-full text-xs">
										<a href="#" className="block underline">
											Other issue with login
										</a>
										<a href="#" className="block underline">
											Forgot password
										</a>
									</div>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</div>
				<footer className="fixed bottom-0 w-full h-20 bg-card flex items-center justify-center">
					<ul className="flex justify-around items-center w-1/2 max-md:w-full text-sm max-md:text-xs max-md:text-center max-md:px-2">
						<li>
							<a href="#" className="underline">
								Help Center
							</a>
						</li>
						<li>
							<a href="#" className="underline">
								Terms Of Service
							</a>
						</li>
						<li>
							<a href="#" className="underline">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="underline">
								&copy;2024shikharlogistics
							</a>
						</li>
					</ul>
				</footer>
			</div>
			<Toaster className="max-md:absolute max-md:bottom-0"/>
		</>
	);
}
