import type { FooterProps } from "./Footer.types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Footer(props: FooterProps) {
	const { companyId } = props
	const navigate = useNavigate()

	const onDeleteCompany = async () => {
		try {
			await axios.delete(`http://localhost:3000/company/${companyId}`)
			toast("Company Deleted")
			navigate(-1)
		} catch (e: any) {
			toast.error("Something went wrong", { description: e.message })
			console.log(e);
		}
	}

	return (
		<div className="flex justify-end mt-5" >
			<Button variant="destructive" onClick={onDeleteCompany} className="cursor-pointer" >
				<Trash className="w-4 h-4" />
				Delete Company
			</Button>
		</div>
	)
}