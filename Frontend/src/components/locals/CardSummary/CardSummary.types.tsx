import { type LucideIcon } from "lucide-react";
//Iconos predeterminados

//para declarar la estructura de datos
export type CardSummaryProps = {
	icon: LucideIcon;
	total: string;
	avarage: number;
	title: string;
	tooltipText: string;
};