import { Navbar } from "@/components/globals/Navbar";
import { Sidebar } from "@/components/globals/Sidebar";

export default function Header({ children }: { children: React.ReactElement }) {
	return (
		<div className="flex w-full h-screen">
			<div className="hidden xl:block w-80 h-full xl:fixed">
				<Sidebar />
			</div>
			<div className="w-full xl:ml-80">
				<Navbar />
				<div className="p-6 bg-[#cfcfcf] dark:bg-[#383845]">
					{children}
				</div>
			</div>
		</div>
	)
}