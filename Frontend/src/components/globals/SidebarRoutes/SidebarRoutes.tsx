import { SidebarItem } from "../SidebarItem";
import { Separator } from "@/components/ui/separator";
import { dataGeneralSidebar, dataSupportSidebar, dataToolsSidebar } from "./SidebarRoutes.Data";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/globals/Logo";

// informacion mostrada en el sidebar
export function SidebarRoutes() {
	return (
		<div className="flex flex-col justify-between h-full">
			<div className="flex-1 overflow-y-auto" >
				<Logo />
				<div className="p-2 md:p-3">	
					<p className="text-slate-500 mb-2">GENERAL</p>
					{dataGeneralSidebar.map((item) => (
						<SidebarItem key={item.label} item={item} />
					))}
				</div>

				<Separator />

				<div className="p-2 md:p-3">	
					<p className="text-slate-500 mb-2">TOOLS</p>
					{dataToolsSidebar.map((item) => (
						<SidebarItem key={item.label} item={item} />
					))}
				</div>

				<Separator />

				<div className="p-2 md:p-3">	
					<p className="text-slate-500 mb-2">SUPPORT</p>
					{dataSupportSidebar.map((item) => (
						<SidebarItem key={item.label} item={item} />
					))}
				</div>
			</div>
			<div className="shrink-0 border-t">
				<div className="text-center p-6">
					<Button variant="outline" className="w-full">Upgrade Plan</Button>
				</div>
				<Separator />
				<footer className="mt-3 p-3 text-center">
					2025 - All rights reserved
				</footer>
			</div>
		</div>
	)
}