import { Button } from "@/components/ui/button";
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Trash, UserPlus } from "lucide-react";
import React from "react";

const DataTableRowActions = ({row, table}) => {
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-6 w-8 p-0 border">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:bg-sky-400 dark:text-white">
						<Edit className="h-4 w-4 mr-2" />
						<span>Edit</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-red-500 hover:text-white dark:text-white">
						<Trash className="h-4 w-4 mr-2" />
						<span>Delete</span>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<UserPlus className="mr-2 h-4 w-4" />
							<span>Change Status</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem onClick={() => {table.options.meta.updateData(row.id, 'status', 'Active')}}>
									<div className="inline-block rounded-full h-4 w-4 bg-green-500 mr-2"></div>
									<span>Active</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => {table.options.meta.updateData(row.id, 'status', 'Inactive')}}>
									<div className="inline-block rounded-full h-4 w-4 bg-red-500 mr-2"></div>
									<span>Inactive</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableRowActions;
