import type { CompanyType } from "@/types/Company"
import type { Dispatch, SetStateAction } from "react"

export type ModalAddEventProps = {
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>,
	setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>,
	companies: CompanyType[],
	setNewEvent: Dispatch<SetStateAction<{
		eventName: string,
		companySelected: { name: string, id: string }
	}>>
}