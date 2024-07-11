
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
const UserProfileBtn = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex flex-col items-center">
					<Button
						variant="secondary"
						size="icon"
						className="rounded-full"
					>
						<CircleUser className="h-8 w-8" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
					<p className="text-center text-sm">Sanjay Kumar</p>
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
	);
};

export default UserProfileBtn;
