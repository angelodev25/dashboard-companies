import { CompaniesChart } from "@/components/pages/Analytics/CompaniesChart/CompaniesChart"
import { Event } from "@/types/Company"
import { CompanyType } from "@/types/Company"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"

export default function Analytics() {
	const { userId } = useAuth()
	const [companies, setCompanies] = useState < CompanyType[] > ([])
	const [events, setEvents] = useState < Event[] > ([])
	if (!userId) return <Navigate to="/sign-in" />


	const request = async () => {
		try {
			const res_companies = await axios.get("http://localhost:3000/companies", {
				data: userId
			})

			const res_events = await axios.get("http://localhost:3000/events")
			setCompanies(res_companies.data.companies)
			setEvents(res_events.data.events)
		} catch (e) {
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