import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/clerk-react'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function useSupabase() {
	const { getToken, isSignedIn } = useAuth()

	async function getClient() {
		if (!isSignedIn) {
			throw new Error('Usuario no autenticado en Clerk')
		}

		const token = await getToken({ template: 'supabase' })
		if (!token) {
			throw new Error('No se pudo obtener el token de Clerk')
		}

		// ✅ Crear cliente con el token en cada request
		return createClient(supabaseUrl, supabaseAnonKey, {
			global: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		})
	}

	return { getClient }
}
