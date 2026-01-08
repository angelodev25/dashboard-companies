import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { type CustomTooltipProps } from "./CustomTooltip.types"
import { Info } from "lucide-react"

// muestra la pequeña descripcion del cuadro de informacion mediante el icono de informacion activandose con tootltipTrigger
export function CustomTooltip(props: CustomTooltipProps) {
	const { content } = props 
	return (
		<Tooltip>
			<TooltipTrigger>
				<Info strokeWidth={1} className="h-5 w-5" />
			</TooltipTrigger>
			<TooltipContent>
				<p>{content}</p>
			</TooltipContent>
		</Tooltip>
	)
}