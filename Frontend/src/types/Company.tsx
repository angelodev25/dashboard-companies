export type CompanyType = {
	id: string
	name: string
	description: string
	profileImage: string  
	rif: string
	phone: string
	country: string
	website: string
	createdAt: Date
	updatedAt: Date
	contacts: Contact[]
	events: Event[]
}

export type Contact = {
	id: string  
	companyId: string
	name: string
	role: string
	email: string
	phone: string
	createdAt: Date 
	updatedAt: Date 
}

export type Event = {
	id: string   
	companyId: string
	title: string
	start: string
	allDay: boolean
	timeFormat: string
	createdAt: Date
	updatedAt: Date
}
