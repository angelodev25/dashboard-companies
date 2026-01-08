"use client"
import { CustomIcon } from "@/components/globals/CustomIcon";
import { Percent } from "lucide-react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { dataTotalSuscribers } from "./TotalSuscribers.data"

export function TotalSuscribers() {

	

	return (
		<div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full xl:w-96 hover:shadow-lg transition">
			<div className="flex gap-4 items-center mb-4">
				<CustomIcon icon={Percent} />
				<p className="text-xl">Total suscribers</p>
			</div>
			<div className="w-full h-[200px] p-5">
				<ResponsiveContainer aspect={1} maxHeight={200} >
					<PieChart>
						<Pie dataKey="value" data={dataTotalSuscribers} outerRadius={80} labelLine={false} />
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}