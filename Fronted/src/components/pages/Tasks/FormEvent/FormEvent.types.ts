import type { CompanyType } from "@/types/Company"
import type { Dispatch, SetStateAction } from "react"

export type FormEventProps = {
	setNewEvent: Dispatch<SetStateAction<{
		eventName: string,
		companySelected: { name: string, id: string } 
	}>>,
	setOpen: Dispatch<SetStateAction<boolean>>,
	companies: CompanyType[],
	setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>
}