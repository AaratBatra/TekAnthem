import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTheme } from "./themeprovider.jsx";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { performLogout } from "@/store/slices/AuthSlice.js";
//ui imports
import {
	Bell,
	LayoutDashboard,
	Package,
	Package2,
	ShoppingCart,
	Table2,
	Home,
	ChevronRight,
	ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "./ui/switch";
import NavMobActiveContents from "./NavMobActiveContents";
import { cn } from "@/lib/utils.js";


const Sidebar = ({expanded, setExpanded}) => {
	const { theme, setTheme } = useTheme();
	const [toggleLedger, setToggleLedger] = useState(false);
	const [togglePayables, setTogglePayables] = useState(false);
	const [toggleReceivables, setToggleReceivables] = useState(false);
	const [toggleInventory, setToggleInventory] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const linkData = {
		Dashboard: [],
		Payables: ["Supplier", "Payment", "Invoice"],
		Receivables: ["Customer", "Invoice", "Receipt"],
		Ledger: ["Chart of Account", "Payment", "Receipt", "Journal", "Contra"],
		Inventory: ["Item"],
	};
	function handleToggleTheme() {
		if (theme == "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}

	return (
		<div className="hidden border-r h-full bg-white dark:bg-muted/40 shadow-md rounded-2xl md:block">
			{/* <div className="flex h-full lg:max-h-screen flex-col gap-2  md:w-[245px] lg:w-[60px] relative lg:fixed lg:left-0"> */}
			<div className={cn(
				"flex h-full lg:max-h-screen flex-col gap-2 relative lg:fixed lg:left-0",
				expanded ? "md:w-[245px] lg:w-[280px]" : "md:w-[60px] lg:w-[60px]"
			)}>
				<div className="flex py-4 items-center border-b px-4 lg:px-6 overflow-hidden">
					<Link
						to="/"
						className="flex items-center gap-2 font-semibold"
					>
						<img src="/assets/ta-logo.png" className="block h-6 w-6" />
						{/* <Package2 className="h-6 w-6" /> */}
						<span>TekAnthem</span>
					</Link>
					<Button
						variant="outline"
						size="icon"
						className="ml-auto h-8 w-8"
					>
						<Bell className="h-5 w-5" />
						<span className="sr-only">Toggle notifications</span>
					</Button>
				</div>
				<ScrollArea className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								isActive
									? "flex items-center relative gap-3 bg-green-200 text-[#2b9731] rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
									: "flex items-center relative gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group active:text-[#2b9731] active:bg-green-200"
							}
						>
							{({ isActive }) => (
								<>
									<div
										className={
											isActive
												? "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] text-green-200 bg-[#2b9731]"
												: "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] bg-white text-black group-active:text-green-200 group-active:bg-[#2b9731]"
										}
									>
										<LayoutDashboard className="h-5 w-5" />
									</div>
									Dashboard
								</>
							)}
						</NavLink>
						<NavLink
							to="/payables"
							className={({ isActive }) =>
								isActive
									? "flex items-center relative gap-3 bg-green-200 text-[#2b9731] rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
									: "flex items-center relative gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group active:text-[#2b9731] active:bg-green-200"
							}
							onClick={() => setTogglePayables(!togglePayables)}
						>
							{({ isActive }) => (
								<>
									<div
										className={
											isActive
												? "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] text-green-200 bg-[#2b9731]"
												: "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] bg-white text-black group-active:text-green-200 group-active:bg-[#2b9731]"
										}
									>
										<ShoppingCart className="h-5 w-5" />
									</div>
									Payables
									{togglePayables ? (
										<ChevronDown className="absolute right-4" />
									) : (
										<ChevronRight className="absolute right-4" />
									)}
								</>
							)}
							{/* <div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<ShoppingCart className="h-5 w-5" />
							</div>
							Payables{" "}
							{togglePayables ? (
								<ChevronDown className="absolute right-4" />
							) : (
								<ChevronRight className="absolute right-4" />
							)} */}
						</NavLink>
						{togglePayables ? (
							<NavMobActiveContents
								contents={linkData.Payables}
								for={"payables"}
							/>
						) : (
							<></>
						)}
						<NavLink
							to="/receivables"
							className={({ isActive }) =>
								isActive
									? "flex items-center relative gap-3 bg-green-200 text-[#2b9731] rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
									: "flex items-center relative gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group active:text-[#2b9731] active:bg-green-200"
							}
							onClick={() =>
								setToggleReceivables(!toggleReceivables)
							}
						>
							{({ isActive }) => (
								<>
									<div
										className={
											isActive
												? "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] text-green-200 bg-[#2b9731]"
												: "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] bg-white text-black group-active:text-green-200 group-active:bg-[#2b9731]"
										}
									>
										<Package className="h-5 w-5" />
									</div>
									Receivables
									{toggleReceivables ? (
										<ChevronDown className="absolute right-4" />
									) : (
										<ChevronRight className="absolute right-4" />
									)}
								</>
							)}
						</NavLink>
						{toggleReceivables ? (
							<NavMobActiveContents
								contents={linkData.Receivables}
								for={"receivables"}
							/>
						) : (
							<></>
						)}
						<NavLink
							to="/ledger"
							className={({ isActive }) =>
								isActive
									? "flex items-center relative gap-3 bg-green-200 text-[#2b9731] rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
									: "flex items-center relative gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group active:text-[#2b9731] active:bg-green-200"
							}
							onClick={() => setToggleLedger(!toggleLedger)}
						>
							{({ isActive }) => (
								<>
									<div
										className={
											isActive
												? "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] text-green-200 bg-[#2b9731]"
												: "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] bg-white text-black group-active:text-green-200 group-active:bg-[#2b9731]"
										}
									>
										<Table2 className="h-5 w-5" />
									</div>
									Ledger
									{toggleLedger ? (
										<ChevronDown className="absolute right-4" />
									) : (
										<ChevronRight className="absolute right-4" />
									)}
								</>
							)}

							{/* <div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<Table2 className="h-5 w-5" />
							</div>
							Ledger{" "}
							{toggleLedger ? (
								<ChevronDown className="absolute right-4" />
							) : (
								<ChevronRight className="absolute right-4" />
							)} */}
						</NavLink>
						{toggleLedger ? (
							<NavMobActiveContents
								contents={linkData.Ledger}
								for={"ledger"}
							/>
						) : (
							<></>
						)}
						<NavLink
							to="/inventory"
							className={({ isActive }) =>
								isActive
									? "flex items-center relative gap-3 bg-green-200 text-[#2b9731] rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
									: "flex items-center relative gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group active:text-[#2b9731] active:bg-green-200"
							}
							onClick={() => setToggleInventory(!toggleInventory)}
						>
							{({ isActive }) => (
								<>
									<div
										className={
											isActive
												? "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] text-green-200 bg-[#2b9731]"
												: "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-white group-hover:bg-[#0C7FDA] bg-white text-black group-active:text-green-200 group-active:bg-[#2b9731]"
										}
									>
										<Home className="h-5 w-5" />
									</div>
									Inventory{" "}
									{toggleInventory ? (
										<ChevronDown className="absolute right-4" />
									) : (
										<ChevronRight className="absolute right-4" />
									)}
								</>
							)}
						</NavLink>
						{toggleInventory ? (
							<NavMobActiveContents
								contents={linkData.Inventory}
								for={"inventory"}
							/>
						) : (
							<></>
						)}
					</nav>
				</ScrollArea>
				<div className={cn("mt-auto p-1 relative bottom-0 md:w-[240px] lg:w-auto", expanded ? "block" : "hidden")}>
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
										theme == "dark" ? "#FFFFFF" : "#5D7285"
									}
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clipPath="url(#clip0_14_430)">
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
								className="w-full py-6 flex justify-between items-center dark:text-white hover:bg-slate-600"
								onClick={()=>{
									dispatch(performLogout());
									navigate('/login', {
										replace: true
									})
								}}
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
	);
};

export default Sidebar;
