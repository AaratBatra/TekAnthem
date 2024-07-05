import {
	HandCoins,
	Home,
	LineChart,
	Newspaper,
	PieChart,
	TicketCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const NavActiveContents = (props) => {
	return (
		<div className="border border-secondary-foreground rounded-md p-1 bg-muted/40">
			<Link
				to="#"
				className="w-full flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
			>
				<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
					<Home className="h-5 w-5" />
				</div>
				{props.contents[0]}
			</Link>
			<Link
				to="#"
				className="w-full flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
			>
				<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
					<PieChart className="h-5 w-5" />
				</div>
				{props.contents[1]}
			</Link>
			<Link
				to="#"
				className="w-full flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
			>
				<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
					<HandCoins className="h-5 w-5" />
				</div>
				{props.contents[2]}
			</Link>
			<Link
				to="#"
				className="w-full flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
			>
				<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
					<TicketCheck className="h-5 w-5" />
				</div>
				{props.contents[3]}
			</Link>
			<Link
				to="#"
				className="w-full flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
			>
				<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
					<Newspaper className="h-5 w-5" />
				</div>
				{props.contents[4]}
			</Link>
			<Link
				to="#"
				className="w-full flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all  hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group"
			>
				<div className="flex justify-center items-center h-8 w-8 rounded-md bg-white text-black group-hover:text-white group-hover:bg-[#0C7FDA]">
					<LineChart className="h-5 w-5" />
				</div>
				{props.contents[5]}
			</Link>
		</div>
	);
};

export default NavActiveContents;
