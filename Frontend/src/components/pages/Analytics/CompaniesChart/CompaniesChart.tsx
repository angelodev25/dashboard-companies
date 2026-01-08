import { CompaniesChartProps } from "./CompaniesChart.types";

import { BarChart, Bar, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, XAxis } from 'recharts'

export function CompaniesChart(props: CompaniesChartProps) {
	const { companies, events } = props
	console.log(companies)
	const dataChart = companies.map(company => ({
		name: company.name.length > 10 ? company.name.slice(0, 10) + '...' : company.name,
		eventsByCompany: events.filter(event => event.companyId === company.id).length 
	}))

	return (
		<div className="h-[500px]" >
			<ResponsiveContainer width="100%" height="100%" >
				<BarChart width={500} height={300} data={dataChart} >
					<CartesianGrid strokeDasharray="2 2" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="eventsByCompany" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}