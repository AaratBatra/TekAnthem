import { useDispatch, useSelector } from "react-redux";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, Laptop, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useTheme } from "./themeprovider";
import { useNavigate } from "react-router-dom";
import { performLogout } from "@/store/slices/AuthSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const UserProfileBtn = () => {
	const { username } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex flex-col items-center">
					{/* <Button
						variant="secondary"
						size="icon"
						className="rounded-full"
					>
						<CircleUser className="h-8 w-8" />
						<span className="sr-only">Toggle user menu</span>
					</Button> */}
					<Avatar className="h-10 w-10 my-1 cursor-pointer">
						<AvatarImage
							src="/assets/mockPerson.jpeg"
							alt="Avatar"
						/>
						<AvatarFallback>Logo</AvatarFallback>
					</Avatar>
					<p className="text-center text-sm">
						{username ? username : "no name"}
					</p>
					{/* Sanjay Kumar */}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<Settings className="mr-2 h-4 w-4" />
						<span>Theme</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem onClick={() => setTheme("light")}>
								<Sun className="mr-2 h-4 w-4" />
								<span>Light</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								<Moon className="mr-2 h-4 w-4" />
								<span>Dark</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setTheme("system")}>
								<Laptop className="mr-2 h-4 w-4" />
								<span>System</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuItem><User className="mr-2 h-4 w-4" />
				<span>Support</span></DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						dispatch(performLogout());
						navigate("/login", {
							replace: true,
						});
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfileBtn;
