import { Calendar } from "@/components/pages/Tasks/Calendar/Calendar"
import type { CompanyType, Event } from "@/types/Company"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Tasks() {
	const { userId } = useAuth() 
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [companies, setCompanies] = useState < CompanyType[] > ([])
	const [events, setEvents] = useState < Event[] > ([])

	if (!userId) {
		toast.warning("Debes estar autenticado")
		navigate("/sign-in")
	}

	const makeRequests = async () => {
		try {
			const res_comp = await axios.get("http://localhost:3000/companies", {
				params: { userId: userId },
			})
			setCompanies(Array.isArray(res_comp.data.companies) ? res_comp.data.companies : [res_comp.data.companies]);

			const res_events = await axios.get("http://localhost:3000/events")
			setEvents(Array.isArray(res_events.data.events) ? res_events.data.events : [res_events.data.events])

		} catch (e: any) {
			setError(e.message)
		}
	}

	useEffect(() => {
		makeRequests()
	}, [])

	if (error) {
		return (
			<div className="flex flex-col  bg-background items-center justify-center text-center border bg-gray-400">
				<h1 className="text-3xl text-red-700 p-4 font-bold flex justify-center items-center" >
					<XIcon className="h-9 w-9 m-1 font-bold " />
					Error
				</h1>
				<div className="text-gray-700 mb-4 justify-center text-2xl font-bold border-b" >
					{error}
				</div>
			</div>
		)
	}

	return (
		<div>
			<Calendar companies={companies} events={events} />
		</div>
	)
}