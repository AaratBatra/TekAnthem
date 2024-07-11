//ui imports
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import Sidebar from "./Sidebar.jsx";
import UserProfileBtn from "./UserProfileBtn.jsx";
import SidebarMob from "./SidebarMob.jsx";
import Payments from "./Payments.jsx";
import Details from "./Details.jsx";
import { Search } from "lucide-react";


export function Dashboard() {
	return (
		<div
			className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]`}
		>
			{/* sidebar for pc */}
			<Sidebar />
			<div className="flex flex-col">
				<header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
					{/* mobile sidebar */}
					<SidebarMob />
					<div className="w-full flex-1">
						<div className="flex items-center">
							<Avatar className="size-16">
								<AvatarImage
									src={"/assets/e-shipping.png"}
									alt="company logo"
									className="object-center object-cover"
								/>
								<AvatarFallback>Profile</AvatarFallback>
							</Avatar>
							<h1 className="text-sm font-bold text-center mt-0 ms-2">
								Shikhar Logistics
							</h1>
						</div>
					</div>
					{/* user profile with dropdown */}
					<UserProfileBtn />
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 max-md:p-1 lg:gap-6 lg:p-6">
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
					<Payments />
					<Details />
				</main>
			</div>
			<Toaster className="bg-green-500" />
		</div>
	);
}
