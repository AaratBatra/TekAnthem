import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavLink } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./themeprovider.jsx";
import { useDispatch, useSelector } from "react-redux";
import { performLogout } from "@/store/slices/AuthSlice.js";
//ui imports
import {
	ChevronLeft,
	ChevronRight,
	Home,
	LayoutDashboard,
	Package,
	ShoppingCart,
	Table2,
	Bell,
	Package2,
	ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const NavPCItem = ({ icon, name, href, navFor }) => {
	const [expanded, setExpanded] = useState(false);
	const linkData = {
		Dashboard: [],
		Payables: ["Supplier", "Payment", "Invoice"],
		Receivables: ["Customer", "Invoice", "Receipt"],
		Ledger: ["Chart of Account", "Payment", "Receipt", "Journal", "Contra"],
		Inventory: ["Item"],
	};
	return (
		<>
			<NavLink
				to={href}
				className={({ isActive }) =>
					isActive
						? "w-full flex items-center relative gap-3 bg-[#EEF2FF] text-[#4F46E5] rounded-2xl px-3 py-2 transition-all hover:text-[#4F46E5] hover:bg-[#EEF2FF] group"
						: "w-full flex items-center relative gap-3 text-muted-foreground rounded-2xl px-3 py-2 transition-all hover:text-[#4F46E5] hover:bg-[#EEF2FF] group active:text-[#4F46E5] active:bg-[#EEF2FF] dark:text-white"
				}
				onClick={() => setExpanded(!expanded)}
			>
				{({ isActive }) => (
					<>
						<div
							className={
								isActive
									? "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-[#4F46E5] text-[#4F46E5]"
									: "flex justify-center items-center h-8 w-8 rounded-md group-hover:text-[#4F46E5] text-black dark:text-white"
							}
						>
							{icon}
						</div>
						{name}
						{expanded ? (
							<ChevronDown className="absolute right-4" />
						) : (
							<ChevronRight className="absolute right-4" />
						)}
					</>
				)}
			</NavLink>
			{expanded ? (
				<NavMobActiveContents contents={linkData[name]} for={navFor} />
			) : (
				<></>
			)}
		</>
	);
};

const ExpSidebar = () => {
	const { theme, setTheme } = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username } = useSelector((state) => state.auth);
	const smallLinkData = [
		{
			name: "Dashboard",
			icon: <LayoutDashboard className="h-5 w-5" />,
			href: "/dashboard",
		},
		{
			name: "Payables",
			icon: <ShoppingCart className="w-5 h-5" />,
			href: "/payables",
			for: "payables",
		},
		{
			name: "Receivables",
			icon: <Package className="w-5 h-5" />,
			href: "/receivables",
			for: "receivables",
		},
		{
			name: "Ledger",
			icon: <Table2 className="w-5 h-5" />,
			href: "/ledger",
			for: "ledger",
		},
		{
			name: "Inventory",
			icon: <Home className="w-5 h-5" />,
			href: "/inventory",
			for: "inventory",
		},
	];
	const ref = useRef(null);
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setExpanded(false);
			}
		};

		// Add event listener for clicks outside
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	useEffect(() => {
		if (ref.current) {
			ref.current.style.width = expanded ? "280px" : "80px";
		}
	}, [expanded]);
	return (
		<aside
			ref={ref}
			className={cn(
				"fixed left-0 z-50 h-full w-20 flex-col items-center hidden md:flex bg-white dark:bg-muted/40 shadow-md rounded-2xl pt-2 pb-2 transition-all duration-500 border",
				expanded
					? "items-start px-4 w-full dark:bg-background"
					: "items-center"
			)}
		>
			{expanded ? (
				<img src="/ta-full-logo.svg" className="block cursor-pointer" onClick={()=>navigate("/")}/>
			) : (
				<Avatar onClick={() => navigate("/")} className="cursor-pointer">
					<AvatarImage src="/assets/ta-logo.png" alt="Avatar" />
					<AvatarFallback>Logo</AvatarFallback>
				</Avatar>
			)}
			<ScrollArea className="w-full flex-1">
				<nav
					className={cn(
						"flex flex-col items-center md:py-5 gap-4",
						expanded ? "w-full" : "w-auto"
					)}
				>
					{smallLinkData.map((link, index) => (
						<TooltipProvider key={index}>
							<Tooltip>
								<TooltipTrigger asChild>
									{expanded ? (
										<NavPCItem
											name={link.name}
											icon={link.icon}
											href={link.href}
											navFor={link.for}
										/>
									) : (
										<NavLink
											to={link.href}
											className={
												"flex h-9 w-9 rounded-full dark:text-white dark:hover:text-[#4F46E5] hover:bg-[#EEF2FF] active:bg-[#EEF2FF] hover:text-[#4F46E5] active:text-[#4F46E5] items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:h-12 md:w-12"
											}
										>
											{link.icon}
											<span className="sr-only">
												{link.name}
											</span>
										</NavLink>
									)}
								</TooltipTrigger>
								<TooltipContent side="right">
									{link.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
				</nav>
			</ScrollArea>
			<Separator className="mt-auto mb-3" />
			<div className="flex flex-col items-center gap-4 w-full">
				<div
					className={cn(
						"w-full grid grid-cols-[auto_1fr] gap-2",
						expanded ? "" : "flex flex-col items-center"
					)}
				>
					<Avatar>
						<AvatarImage
							src="/assets/mockPerson.jpeg"
							alt="Avatar"
						/>
						<AvatarFallback>Logo</AvatarFallback>
					</Avatar>
					{expanded ? (
						<div className="overflow-hidden whitespace-nowrap">
							<p className="whitespace-nowrap text-gray-600 dark:text-gray-300 font-light text-sm">
								Welcome back!👋
							</p>
							<p className="whitespace-nowrap text-sm">
								{username}
							</p>
						</div>
					) : (
						""
					)}
				</div>

				<div
					className={cn(
						"w-full flex justify-center",
						expanded ? "justify-end" : ""
					)}
				>
					<Button
						size="icon"
						variant="ghost"
						className={cn(
							"bg-[#D9D9D9] rounded-full float-end transition-transform duration-500",
							expanded ? "rotate-180" : "rotate-0"
						)}
						aria-label={
							expanded ? "Collapse Sidebar" : "Expand Sidebar"
						}
						onClick={() => setExpanded(!expanded)}
					>
						<ChevronRight className="w-5 h-5 dark:text-black" />
						{/* {expanded ? (
							<ChevronLeft className="w-5 h-5 dark:text-black" />
						) : (
							
						)} */}
					</Button>
				</div>
			</div>
		</aside>
	);
};

export default ExpSidebar;
