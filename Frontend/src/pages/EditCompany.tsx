import { CompanyInformation } from "@/components/pages/EditCompany/CompanyInformation"
import { Header } from "@/components/pages/EditCompany/Header"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { type CompanyType } from '@/types/Company'
import { Footer } from "@/components/pages/EditCompany/Footer"

export default function EditCompany() {
	const { id } = useParams()
	const { userId } = useAuth()
	const [company, setCompany] = useState < CompanyType | null > (null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState < string | null > (null)

	if (!id) {
		console.log("No hay id en la url")
		return <Navigate to="/error" />
	}

	if (!userId) {
		return <Navigate to="/error" />
	}

	const getCompany = async () => {
		try {
			setLoading(true)
			setError(null)
			
			const response = await axios.get("http://localhost:3000/companyId", {
				params: { id: id, userId: userId }
			})
		
			if (response.data.success && response.data.company) {
				setCompany(response.data.company)
			} else {
				setError("No se encontró la compañía")
			}
		} catch (e: any) {
			console.error("Error al obtener compañía:", e)
			setError(e.response?.data?.error || e.message || "Error al cargar la compañía")

		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getCompany()
	}, [id, userId])

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
				<p className="ml-4">Loading info...</p>
			</div>
		)
	}

	if (error || company === null) {
		return (
			<div className="text-center p-8">
				<h2 className="text-xl text-red-600">Error</h2>
				<p>{error}</p>
			</div>
		)
	}

	return (
		<div>
			<Header />
			<CompanyInformation company={company} />
			<Footer companyId={company.id} />
		</div>
	)
}