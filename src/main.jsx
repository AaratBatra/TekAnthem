import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/themeprovider.jsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
import App from "./App.jsx";
import Landing from "./pages/Landing.jsx";
import Payment from "./pages/Ledger/Payment.jsx";
import { Toaster } from './components/ui/toaster.jsx';
import ErrorPage from "./pages/ErrorPage";
import Payables from "./pages/Payables/Payables";
import Supplier from "./pages/Payables/Supplier";
import PayablePayment from "./pages/Payables/PayablePayment";
import PayableInvoice from "./pages/Payables/PayableInvoice";
import Receivables from "./pages/Receivables/Receivables";
import Customer from "./pages/Receivables/Customer";
import ReceivableInvoice from "./pages/Receivables/ReceivableInvoice";
import ReceivableReceipt from "./pages/Receivables/ReceivableReceipt";
import Ledger from "./pages/Ledger/Ledger";
import AccountChart from "./pages/Ledger/AccountChart";
import LedgerReceipt from "./pages/Ledger/LedgerReceipt";
import Journal from "./pages/Ledger/Journal";
import Contra from "./pages/Ledger/Contra";
import Inventory from "./pages/Inventory/Inventory";
import Item from "./pages/Inventory/Item";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />
			},
			{
				path: "/payables",
				element: <Payables />,
				children: [
					{
						path: "/payables/supplier",
						element: <Supplier />
					},
					{
						path: "/payables/payment",
						element: <PayablePayment />
					},
					{
						path: "/payables/invoice",
						element: <PayableInvoice />
					}
				]
			},
			{
				path: "/receivables",
				element: <Receivables />,
				children: [
					{
						path: "/receivables/customer",
						element: <Customer />
					},
					{
						path: "/receivables/invoice",
						element: <ReceivableInvoice />
					}, 
					{
						path: "/receivables/receipt",
						element: <ReceivableReceipt />
					}
				]
			},
			{
				path: "/ledger", 
				element: <Ledger />,
				children: [
					{
						path: "/ledger/Chart of Account",
						element: <AccountChart />
					},
					{
						path: "/ledger/payment",
						element: <Payment />
					},
					{
						path: "/ledger/receipt",
						element: <LedgerReceipt />
					},
					{
						path: "/ledger/journal",
						element: <Journal />
					},
					{
						path: "/ledger/contra",
						element: <Contra />
					}
				]
			}, 
			{
				path: "/inventory",
				element: <Inventory />,
				children: [
					{
						path: "/inventory/item",
						element: <Item />
					}
				]
			}
		]
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<RouterProvider router={router}>
				<App />
				<Toaster />
			</RouterProvider>
		</ThemeProvider>
	</React.StrictMode>
);
