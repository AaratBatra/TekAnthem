import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import SidebarMob from "./components/SidebarMob";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import UserProfileBtn from "./components/UserProfileBtn";
import Payment from "./pages/Ledger/Payment";
import { Toaster } from "./components/ui/toaster";
import { setupAxiosInterceptors } from "./service/index.js";
import { cn } from "@/lib/utils";
import ExpSidebar from "./components/ExpSidebar";
function App() {
	const { companyName, userID, username } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	setupAxiosInterceptors(dispatch);
	const [expanded, setExpanded] = useState(false);
	return (
		<>
			{/* <div
			//className={`grid gap-2 min-h-screen h-full w-full md:grid-cols-[245px_1fr] lg:grid-cols-[60px_1fr] pe-2 max-lg:pe-0 max-lg:px-2`}
			className={cn(
				"grid gap-2 min-h-screen h-full w-full pe-2 max-lg:pe-0 max-lg:px-2",
				expanded ? "md:grid-cols-[245px_1fr] lg:grid-cols-[280px_1fr]" : "md:grid-cols-[60px_1fr] lg:grid-cols-[60px_1fr]"
			)} */}
			<div className="flex ps-24 w-full min-h-screen max-md:ps-0">
		{/* > */}
			{/* sidebar for pc */}
			{/* <Sidebar expanded={expanded} setExpanded={setExpanded}/> */}
			<ExpSidebar />
			<div className="flex flex-col w-full">
				<header className="flex h-16 items-center border-b bg-white dark:bg-muted/40 rounded-2xl shadow-sm px-4 lg:px-8 border">
					{/* mobile sidebar */}
					<SidebarMob />
					<div className="w-full flex-1">
						<div className="flex items-center">
							<Avatar>
								<AvatarImage
									src={"/assets/ta-logo.png"}
									alt="company logo"
									className="object-center object-cover"
								/>
								<AvatarFallback>Profile</AvatarFallback>
							</Avatar>
							<h1 className="text-sm font-bold text-center mt-0 ms-2">
								{companyName ? companyName : "no company"}
								{/* Shikhar Logistics */}
							</h1>
						</div>
					</div>
					{/* user profile with dropdown */}
					<UserProfileBtn />
				</header>
				<Outlet />
				{/* <Payment /> */}
			</div>
		</div>
			<Toaster />
		</>
	);
}

export default App;
