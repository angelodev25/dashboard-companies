import { CompaniesChart } from "@/components/pages/Analytics/CompaniesChart/CompaniesChart"
import type { Event, CompanyType } from "@/types/Company"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"

export default function Analytics() {
	const { userId } = useAuth()
	const [companies, setCompanies] = useState < CompanyType[] > ([])
	const [events, setEvents] = useState < Event[] > ([])
	const API_URL = import.meta.env.VITE_API_URL

	if (!userId) return <Navigate to="/sign-in" />

	const request = async () => {
		try {
			const res_companies = await axios.get(`${API_URL}/companies`, {
				params: { userId: userId }
			})

			const res_events = await axios.get(`${API_URL}/events`)
			setCompanies(res_companies.data.companies)
			setEvents(res_events.data.events)
		} catch (e: any) {
			toast.error("Error", { description: e.message })
			console.log(e)
		}
	}

	useEffect(() => {
		request()
	}, [])

	return (
		<div className="bg-background shadow-md rounded-lg p-4">
			<h2 className="text-2xl mb-5" >Analytics</h2>
			<div>
				<CompaniesChart companies={companies} events={events} />
			</div>
		</div>
	)
}