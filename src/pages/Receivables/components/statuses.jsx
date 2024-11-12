export const statuses = [
	{
		value: "Active",
		label: "Active",
		icon: () => (
			<div className="inline-block rounded-full h-4 w-4 bg-green-500 mr-2"></div>
		),
		render: () => (
			<span className="w-fit h-6 font-semibold mx-auto flex items-center justify-center bg-[#16C09861] border border-[#00B087] text-green-700 rounded-sm py-2 px-3">
				Active
			</span>
		),
	},
	{
		value: "Inactive",
		label: "Inactive",
		icon: () => (
			<div className="inline-block rounded-full h-4 w-4 bg-red-500 mr-2"></div>
		),
		render: () => (
			<span className="w-fit h-6 font-semibold mx-auto flex items-center justify-center bg-[#FFC5C5] border border-[#DF0404] text-red-500 rounded-sm py-2 px-3">
				Inactive
			</span>
		),
	},
];
