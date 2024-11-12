import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

const chartConfig = {
	revenue: {
		label: "revenue",
		color: "hsl(var(--chart-1))",
	},
};

const RenderChart = ({ row }) => {
	const chartData = () => {
		const q1 = row.original.q1;
		const q2 = row.original.q2;
		const q3 = row.original.q3;
		const q4 = row.original.q4;
		return [
			{ quarter: "Q1", revenue: q1 },
			{ quarter: "Q2", revenue: q2 },
			{ quarter: "Q3", revenue: q3 },
			{ quarter: "Q4", revenue: q4 },
		];
	};
	return (
		<div className="w-full h-[480px] max-md:w-screen">
			<Card className="w-[600px] h-full mx-auto bg-transparent dark:border dark:border-gray-50 max-md:w-full">
				<CardHeader>
					<CardTitle>Area Chart - Linear</CardTitle>
					<CardDescription>
						Showing total revenue for the last 4 quarters
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<AreaChart
							accessibilityLayer
							data={chartData()}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="quarter"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										indicator="dot"
										hideLabel
									/>
								}
							/>
							<Area
								dataKey="revenue"
								type="linear"
								fill="var(--color-revenue)"
								fillOpacity={0.4}
								stroke="var(--color-revenue)"
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
				<CardFooter>
					<div className="flex w-full items-start gap-2 text-sm">
						<div className="grid gap-2">
							<div className="flex items-center gap-2 font-medium leading-none">
								A sample demo of power of shad CN +
								customization + recharts{" "}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="flex items-center gap-2 leading-none text-muted-foreground">
								Possible by headless UI 🔥
							</div>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default RenderChart;
