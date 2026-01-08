import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
	const navigate = useNavigate()

	return (
		<div className="flex items-center text-xl mb-2" >
			<ArrowLeft className="h-5 w-5 cursor-pointer mr-2" onClick={() => navigate("/companies")} />
			Edit Company
		</div>
	)
}