import { useAuth } from "@clerk/clerk-react";
import type { ListContactProps } from "./ListContacts.types";

import { Loader2, Mail, Phone } from 'lucide-react'
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Contact } from "@/types/Company";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export function ListContacts(props: ListContactProps) {
	const { company, refreshKey } = props
	const { userId } = useAuth()
	const [contacts, setContacts] = useState < Contact[] > ([])
	const [loading, setLoading] = useState(false)
	const API_URL = import.meta.env.VITE_API_URL

	if (!userId) return <Navigate to="/sign-in" />

	const listContacts = async () => {
		try {
			setLoading(true)
			const response = await axios.get(`${API_URL}/contacts/${company.id}`)

			if (!response.data.contacts) {
				return
			}

			setContacts(Array.isArray(response.data.contacts) ? response.data.contacts : [response.data.contacts])

		} catch (e) {
			toast.error("An error happened")
			setContacts([])
			console.log(e);
		} finally {
			setLoading(false)
		}
	}


	useEffect(() => {
		listContacts()
	}, [refreshKey])

	return (
		<div>
			<div className="mt-4 mb-2 grid grid-cols-3 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 rounded-lg" >
				<p>Name</p>
				<p>Role</p>
				<p className="text-right" >Contact</p>
			</div>
			{loading && (
				<div className="flex flex-col items-center justify-center p-8 space-y-4">
					<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
					<p className="text-gray-600" >Cargando...</p>
				</div>
			)}
			{contacts.length === 0 && !loading && <div className="bg-gray-400/5 p-4 flex justify-center text-center">No hay contactos</div>}
			{contacts.map((contact) => (
				<div key={contact.id} className="bg-gray-400/2">
					<div className="grid grid-cols-3 gap-x-3 items-center justify-between p-3">
						<p>{contact.name}</p>
						<p>{contact.role}</p>
						<div className="flex items-center justify-end gap-x-6">
							<a href={`telto: ${contact.phone}`} target="_blank">
								<Phone className="w-4 h-4" />
							</a>
							<a href={`mailto: ${contact.email}`} target="_blank">
								<Mail className="w-4 h-4" />
							</a>
						</div>
					</div>
					<Separator />
				</div>
			))}
		</div>
	)
} 