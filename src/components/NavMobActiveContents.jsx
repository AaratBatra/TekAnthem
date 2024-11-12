import {
	HandCoins,
	Home,
	LineChart,
	Newspaper,
	PieChart,
	TicketCheck,
	Users,
	ReceiptText,
	Handshake,
	ShoppingBasket,
	Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
/**
 * customer, invoice, supplier, item
 */
function resolveIcon(item) {
	let jsx = <></>;
	switch (item) {
		case "Inventory":
			jsx = <Home className="h-5 w-5" />;
			break;
		case "Chart of Account":
			jsx = <PieChart className="h-5 w-5" />;
			break;
		case "Payment":
			jsx = <HandCoins className="h-5 w-5" />;
			break;
		case "Receipt":
			jsx = <TicketCheck className="h-5 w-5" />;
			break;
		case "Journal":
			jsx = <Newspaper className="h-5 w-5" />;
			break;
		case "Contra":
			jsx = <LineChart className="h-5 w-5" />;
			break;
		case "Customer":
			jsx = <Users className="h-5 w-5" />;
			break;
		case "Invoice":
			jsx = <ReceiptText className="h-5 w-5" />;
			break;
		case "Supplier":
			jsx = <Handshake className="h-5 w-5" />;
			break;
		case "Item":
			jsx = <ShoppingBasket className="h-5 w-5" />;
			break;
		default:
			jsx = <Circle className="h-5 w-5" />;
			break;
	}
	return jsx;
}
//border border-secondary-foreground rounded-md
const NavMobActiveContents = (props) => {
	return (
		<>
			{props.contents.length > 0 ? (
				<div className="p-1 ps-8">
					{props.contents.map((item, index) => {
						return (
							<NavLink
								key={index}
								to={`/${props.for}/${item.toLowerCase()}`}
								className={({ isActive }) =>
									isActive
										? "w-full flex items-center gap-4 rounded-xl px-3 py-2 max-md:py-[6px] hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group bg-green-200 text-[#2b9731]"
										: "w-full flex items-center gap-4 rounded-xl px-3 py-2 max-md:py-[6px] hover:text-[#0C7FDA] hover:bg-[#E9F5FE] group active:text-[#2b9731] active:bg-green-200"
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
											{resolveIcon(item)}
										</div>
										{/* {item == "AccountChart" ? "Accout Chart" : item} */}
										{item}
									</>
								)}
							</NavLink>
						);
					})}
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default NavMobActiveContents;
