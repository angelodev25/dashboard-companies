import { HeaderCompanies } from '@/components/pages/companies/HeaderCompanies'
import { ListCompanies } from '@/components/pages/companies/ListCompanies'
import { useState } from 'react'

export default function Companies() {
	// Estado para forzar re-render de ListCompanies
	const [refreshKey, setRefreshKey] = useState(0)

	// Función para refrescar la lista de empresas
	const handleRefreshCompanies = () => {
		setRefreshKey(prev => prev + 1)
	}

	return (
		<div>
			{/* Pasa la función de refresh a HeaderCompanies */}
			<HeaderCompanies onCompanyCreated={handleRefreshCompanies} />
			{/* Key para forzar re-render */}
			<ListCompanies refreshKey={refreshKey} />
		</div>
	)
}