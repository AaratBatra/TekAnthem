import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTableData } from "@/store/slices/paymentSlice.js";

//ui imports
import { LogOut, Printer, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.jsx";
import { useToast } from "./ui/use-toast.js";
import { DataTableDemo } from "./ExpTable.jsx";

//zod schema
const initialData = [
	{
		id: "1",
		paidTo: "Ramesh Traders",
		avatar: "/assets/mockPerson1.jpg",
		debit: 10000,
		reference: "https://example.com/doc1",
		comments: "Payment for services",
	},
	{
		id: "2",
		paidTo: "Anil Enterprises",
		avatar: "/assets/mockPerson.jpeg",
		debit: 5000,
		reference: "https://example.com/doc2",
		comments: "Reimbursement",
	},
	{
		id: "3",
		paidTo: "Suresh Distributors",
		avatar: "/assets/mockPerson1.jpg",
		debit: 7000,
		reference: "https://example.com/doc1",
		comments: "Car",
	},
	{
		id: "4",
		paidTo: "Rajesh Suppliers",
		avatar: "/assets/mockPerson.jpeg",
		debit: 9000,
		reference: "https://example.com/doc2",
		comments: "Cycle",
	},
	{
		id: "5",
		paidTo: "Mahesh Agencies",
		avatar: "/assets/mockPerson1.jpg",
		debit: 2000,
		reference: "https://example.com/doc1",
		comments: "new",
	},
	{
		id: "6",
		paidTo: "Vijay Traders",
		avatar: "/assets/mockPerson.jpeg",
		debit: 16000,
		reference: "https://example.com/doc2",
		comments: "gears",
	},
	{
		id: "7",
		paidTo: "Vijay Traders",
		avatar: "/assets/mockPerson.jpeg",
		debit: 16000,
		reference: "https://example.com/doc2",
		comments: "100",
	},
	{
		id: "8",
		paidTo: "Vijay Traders",
		avatar: "/assets/mockPerson.jpeg",
		debit: 16000,
		reference: "https://example.com/doc2",
		comments: "200",
	}
	// More initial data here...
];

const Details = ({ handleSave }) => {
	const { toast } = useToast();
	const dispatch = useDispatch();
	const formData = useSelector((state) => state.payment.formData);
	const [tableData, setTableData] = useState(initialData);
	useEffect(() => {
		dispatch(updateTableData(tableData));
	}, [tableData, dispatch]);
	async function sendData() {
		const isFormValid = await handleSave();
		if (isFormValid) {
			sendDataToServer();
		} else {
			toast({
				variant: "destructive",
				title: "invalid form",
				description: "Please check the payments form and try again"
			})
		}
	}
	async function sendDataToServer() {
		const payload = {
			formData,
			tableData,
		};
		console.log(tableData)
		try {
			const res = await fetch('http://localhost:4000/payments/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
			if (!res.ok) throw new Error("error saving data");
			toast({
				variant: "success",
				title: "Successfully saved"
			})
		} catch (error) {
			console.error("failed to fetch: ", error);
			toast({variant: 'destructive', title: "error sending data"});
		}
	}
	return (
		<div
			style={{
				borderRadius: "6px",
				border: "1px solid #E5E7EB",
				boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
			}}
			className="flex flex-col py-3 md:px-3 gap-4 bg-white dark:bg-[#1e1b47]"
			x-chunk="dashboard-02-chunk-1"
		>
			<Tabs defaultValue="details" className="max-md:mx-auto">
				<TabsList className="dark:bg-[rgba(255,255,255,0.5)]">
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="file" className="dark:text-white">
						File Upload
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* //add table here */}
			<div className="max-md:w-[95vw] mx-auto overflow-hidden w-full p-1">
				<DataTableDemo data={tableData} setData={setTableData} />
			</div>
			<div className="flex gap-5 max-md:gap-1 max-md:mx-auto">
				<Button className="dark:bg-[#5D7285] dark:text-white flex gap-2 items-center hover:bg-[#576a7c]">
					<Printer />
					Print
				</Button>
				<Button
					className="dark:bg-[#5D7285] dark:text-white flex gap-2 items-center hover:bg-[#576a7c]"
					onClick={() => sendData()}
				>
					<Save />
					Save
				</Button>
				<Button className="dark:bg-[#5D7285] dark:text-white flex gap-2 items-center hover:bg-[#576a7c]">
					<LogOut />
					Exit
				</Button>
			</div>
		</div>
	);
};
export default Details;
