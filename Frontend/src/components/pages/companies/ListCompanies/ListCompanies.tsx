import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { type CompanyType } from '@/types/Company'
import { Loader2 } from "lucide-react";

export function ListCompanies(props: { refreshKey: number; }) { 
	const { refreshKey } = props;
	const { userId } = useAuth();
	const [companies, setCompanies] = useState < CompanyType[] > ([])
	const [loading, setLoading] = useState(false)

	const makeRequest = async () => {
		try {
			setLoading(true)
			const res = await axios.get("http://localhost:3000/companies", {
				data: userId,
			})
			setCompanies(Array.isArray(res.data.companies) ? res.data.companies : [res.data.companies]);
		} catch (e) {
			console.log("Error fetching database. " + e)
			setCompanies([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!userId) {
			console.log("Unauthorized")
			setLoading(false)
		} else {	
			makeRequest()
		}
	}, [refreshKey])

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center p-8 space-y-4">
				<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
				<p className="text-gray-600" >Cargando...</p>
			</div>
		)
	}

	return (
		<DataTable columns={columns} data={companies} />
	)
}