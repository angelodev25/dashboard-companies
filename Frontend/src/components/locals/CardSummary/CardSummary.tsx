// Este componente se usa para mostrar la información de muestra
import { type CardSummaryProps } from "./CardSummary.types";
import { CustomTooltip } from "@/components/globals/CustomTooltip";
import { CustomIcon } from "@/components/globals/CustomIcon";
import { cn } from "@/lib/utils";
import { MoveDownRight, MoveUpRight, TrendingUp } from "lucide-react";

// los props son los tipos que se declaran en el archivo .types.ts
export function CardSummary(props: CardSummaryProps) {
	const { icon: Icon, total, avarage, title, tooltipText } = props
	return (
		<div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
			<div className="flex justify-between">
				<div className="flex gap-2 items-center">
					<CustomIcon icon={Icon} />
					{title}	
				</div>
				<CustomTooltip content={tooltipText} />
			</div>
			<div className="flex gap-4 mt-2 md:mt-4">
				<p className="text-2xl">{total}</p>
				<div className={cn(`flex items-center gap-1 px-2 text-xs text-white rounded-lg h-[20px] bg-black dark:bg-secondary`)}>
					{avarage}%
					{avarage < 20 && (
						<MoveDownRight strokeWidth={2} className="h-4 w-4" />
					)}
					{avarage > 20 && avarage < 75 && (
						<MoveUpRight strokeWidth={2} className="h-4 w-4" />
					)}
					{avarage > 75 && avarage < 100 && (
						<TrendingUp strokeWidth={2} className="h-4 w-4" />
					)}
				</div>
			</div>

		</div>
	)
}