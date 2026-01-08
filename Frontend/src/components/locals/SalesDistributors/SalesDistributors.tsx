import { CustomIcon } from "@/components/globals/CustomIcon";
import { BarChart } from "lucide-react";
import { GraphicSuscribers } from "../GraphicSuscribers";

export function SalesDistributors() {
	return (
		<div className="shadow-sn bg-background p-5 rounded-lg mt-5 xl:mt-0">
			<div className="flex gap-x-2 items-center">
				<CustomIcon icon={BarChart} />
				<p className="text-xl">Sales Distribution</p>
			</div>
			<GraphicSuscribers />
		</div>
	)
}