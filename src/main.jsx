import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./components/Dashboard.jsx";
import { ThemeProvider } from "@/components/themeprovider.jsx";
import { Toaster } from './components/ui/toaster.jsx'
const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	}
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
