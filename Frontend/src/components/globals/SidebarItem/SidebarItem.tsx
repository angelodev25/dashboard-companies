import { Link, useLocation } from "react-router-dom";
import { type SidebarItemProps } from "./SidebarItem.types";
import { cn } from "@/lib/utils";

// Funcion para mostrar correctamente cada elemento en el sidebar
export function SidebarItem(props: SidebarItemProps) {
	const { item } = props
	const { icon: Icon, label, href } = item // siempre declarar que icon: Icon

	const pathname = useLocation().pathname
	const activePath = pathname === href

	return (
		<Link to={href} className={cn(`flex gap-x-2 mt-2 light:text-slate-700  dark:text-white text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`, activePath && `bg-slate-400/35`)}>
			<Icon className="h-5 w-5" strokeWidth={1} />
			{label}
		</Link>
	)
}