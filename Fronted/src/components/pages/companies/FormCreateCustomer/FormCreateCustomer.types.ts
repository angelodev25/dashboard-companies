import type { SetStateAction, Dispatch } from "react"

export type FormCreateCustomerProps = {
	setOpenModalCreate: Dispatch<SetStateAction<boolean>>;
	onSuccess?: () => void;
}