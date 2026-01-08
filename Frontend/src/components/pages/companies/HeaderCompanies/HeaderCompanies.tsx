"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { FormCreateCustomer } from '../FormCreateCustomer'

import { useState } from "react"

interface HeaderCompaniesProps {
	onCompanyCreated?: () => void;
}

export function HeaderCompanies({ onCompanyCreated }: HeaderCompaniesProps) {
	const [openModalCreate, setOpenModalCreate] = useState(false)

	return (
		<div className="flex justify-between items-center">
			<h2 className="text-2xl" >List of companies</h2>
			<Dialog open={openModalCreate} onOpenChange={setOpenModalCreate} >
				<DialogTrigger asChild>
					<Button className="cursor-pointer border" >Create Company</Button>
				</DialogTrigger>
				<DialogContent className="sn:max-w-[625px] md:max-w-[720px]">
					<DialogHeader>
						<DialogTitle className="text-2xl text-[#a0b0d8] mb-3">Create Customer</DialogTitle>
						<DialogDescription>
							Create and configure your customer
						</DialogDescription>
					</DialogHeader>
					<FormCreateCustomer setOpenModalCreate={setOpenModalCreate} onSuccess={onCompanyCreated} />
				</DialogContent>
			</Dialog>
		</div>
	)
}