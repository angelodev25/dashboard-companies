import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { type CompanyType } from '@/types/Company'
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export function ListCompanies(props: { refreshKey: number; }) { 
	const { refreshKey } = props;
	const { userId } = useAuth();
	const [companies, setCompanies] = useState < CompanyType[] > ([])
	const [loading, setLoading] = useState(false)
	const API_URL = import.meta.env.VITE_API_URL

	if (!userId) return <Navigate to="/sign-in" />

	const makeRequest = async () => {
		try {
			setLoading(true)
			const res = await axios.get(`${API_URL}/companies`, {
				params: { userId: userId }
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