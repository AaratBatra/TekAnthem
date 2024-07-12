import { Outlet } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import SidebarMob from "./components/SidebarMob";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import UserProfileBtn from "./components/UserProfileBtn";
import Payment from "./pages/Ledger/Payment";

function App() {
	return (
		<>
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
							<Avatar className="md:size-16 size-12">
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
				<Outlet />
				{/* <Payment /> */}
			</div>
			{/* <Toaster className="bg-green-500" /> */}
		</div>
		</>
	);
}

export default App;
