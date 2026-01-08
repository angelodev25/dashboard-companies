import { LazyLoadImage } from "react-lazy-load-image-component";
import type { CompanyInformationProps } from "./CompanyInformation.types";
import { User } from "lucide-react";
import { CompanyForm } from "../CompanyForm";
import NewContact from "../NewContact/NewContact";
import { ListContacts } from "../ListContacts";
import { useState } from "react";

export function CompanyInformation(props: CompanyInformationProps) {
	const { company } = props
	const [refreshKey, setRefreshKey] = useState(0)

	const handleRefreshContacts = () => {
		setRefreshKey(prev => prev + 1)
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4" >
			<div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 max-h-[460px]">
				<div>
					<LazyLoadImage src={company.profileImage} alt="Company Image" width={50} height={50} className="rounded-lg mb-3" />
					<CompanyForm company={company} />
				</div>
			</div>
			<div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
				<div className="flex items-center justify-between gap-x-2">
					<div className="flex items-center gap-x-2">
						<User className="h-5 w-5 " />
						Contacts
					</div>
					<div>
						<NewContact onContactCreated={handleRefreshContacts} />
					</div>
				</div>
				<ListContacts company={company} refreshKey={refreshKey} />
			</div>
		</div>
	)
}