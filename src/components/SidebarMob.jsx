import { NavLink, Link } from "react-router-dom";
import { useTheme } from "./themeprovider.jsx";
import { useState, useEffect, useRef } from "react";
//ui imports
import {
	LayoutDashboard,
	Menu,
	Package,
	Package2,
	ShoppingCart,
	Table2,
	Home,
	ChevronRight,
	ChevronDown,
	Bell,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "./ui/switch";
import NavMobActiveContents from "./NavMobActiveContents";
import { useToast } from "./ui/use-toast.js";

const SidebarMob = () => {
	const { toast } = useToast();
	const { theme, setTheme } = useTheme();
	const [toggleLedger, setToggleLedger] = useState(false);
	const [togglePayables, setTogglePayables] = useState(false);
	const [toggleReceivables, setToggleReceivables] = useState(false);
	const [toggleInventory, setToggleInventory] = useState(false);

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
		<Sheet className="max-sm:px-3">
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="shrink-0 md:hidden"
				>
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col max-sm:px-3">
				<ScrollArea>
					<nav className="grid gap-2 text-lg font-medium">
						<div className="flex item-center py-4 px-4 border-b">
						<Link
							to="/"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span>TekAnthem</span>
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
						<Link
							to="/dashboard"
							className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
						>
							<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<LayoutDashboard className="h-5 w-5" />
							</div>
							Dashboard
						</Link>
						<NavLink
							to="/payables"
							className="flex relative items-center gap-4 rounded-lg px-3 py-2  text-muted-foreground 
							transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							onClick={() => setTogglePayables(!togglePayables)}
						>
							<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<ShoppingCart className="h-5 w-5" />
							</div>
							Payables{" "}
							{togglePayables ? (
								<ChevronDown className="absolute right-4" />
							) : (
								<ChevronRight className="absolute right-4" />
							)}
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
							className="relative flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							onClick={() =>
								setToggleReceivables(!toggleReceivables)
							}
						>
							<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<Package className="h-5 w-5" />
							</div>
							Receivables{" "}
							{toggleReceivables ? (
								<ChevronDown className="absolute right-4" />
							) : (
								<ChevronRight className="absolute right-4" />
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
							className="relative flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							onClick={() => setToggleLedger(!toggleLedger)}
						>
							<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<Table2 className="h-5 w-5" />
							</div>
							Ledger{" "}
							{toggleLedger ? (
								<ChevronDown className="absolute right-4" />
							) : (
								<ChevronRight className="absolute right-4" />
							)}
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
							className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
							onClick={() => setToggleInventory(!toggleInventory)}
						>
							<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
								<Home className="h-5 w-5" />
							</div>
							Inventory{" "}
							{toggleInventory ? (
								<ChevronDown className="absolute right-4" />
							) : (
								<ChevronRight className="absolute right-4" />
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
									onCheckedChange={handleToggleTheme}
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
	);
};

export default SidebarMob;
