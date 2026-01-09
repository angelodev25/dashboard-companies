import { LastCustomers } from "@/components/locals/LastCustomers";
import { SalesDistributors } from "@/components/locals/SalesDistributors";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CardSummary } from "@/components/locals/CardSummary"
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import { TotalSuscribers } from "@/components/locals/TotalSuscribers";
import { ListIntegrations } from "@/components/locals/ListIntegrations";
import { useEffect } from "react";
// importaciones desde lucide-react para usar iconos

// componente principal de datos
// UserButton muestra el boton con la imagen del usuario y la funcion de sign-out

// datos de muestra
const dataCardsSummary = [
   {
      icon: UsersRound,
      total: "10.523",
      avarage: 15,
      title: "Companies created",
      tooltipText: "See all of companies created"
   },
   {
      icon: Waypoints,
      total: "85.2%",
      avarage: 80,
      title: "Total Revenue",
      tooltipText: "See total revenue"
   },
   {
      icon: BookOpenCheck,
      total: "258.1$",
      avarage: 30,
      title: "bounce Rate",
      tooltipText: "See all of bounce rate"
   },
]

export default function Home() {
   return (
      <TooltipProvider>
         <div className="p-6 bg-[#fafbfc] dark:bg-[#383847]">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
               {dataCardsSummary.map(({ icon, total, avarage, title, tooltipText }) => (
                  <CardSummary 
                     key={title}
                     icon={icon}
                     total={total}
                     avarage={avarage}
                     title={title}
                     tooltipText={tooltipText}
                  />
               ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-12 mt-12">
               <LastCustomers />
               <SalesDistributors />
            </div>
            <div className="flex-col md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
               <TotalSuscribers />
               <ListIntegrations />
            </div>
         </div>
      </TooltipProvider>
   )
}