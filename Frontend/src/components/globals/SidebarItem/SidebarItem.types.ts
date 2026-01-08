import { type LucideIcon } from 'lucide-react'

//tipos que se mandaran a la funcion cuando se llame desde SidebarRoutes
export type SidebarItemProps = {
	item: {
		icon: LucideIcon,
		label: string,
		href: string
	},
	key: string
}