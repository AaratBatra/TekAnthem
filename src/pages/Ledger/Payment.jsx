import Details from "@/components/Details";
import Payments from "@/components/Payments";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef } from "react";
const Payment = () => {
	const paymentsRef = useRef(null);
	const handleSave = () => {
		if (paymentsRef.current) {
			const isValid = paymentsRef.current.handleSave();
			return isValid;
		} else {
			console.error("cannot get ref")
		}
	};
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 max-md:p-1 lg:gap-6 lg:p-6">
			<form>
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search payments..."
						className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
					/>
				</div>
			</form>
			<Payments ref={paymentsRef} />
			<Details handleSave={handleSave} />
		</main>
	);
};

export default Payment;
