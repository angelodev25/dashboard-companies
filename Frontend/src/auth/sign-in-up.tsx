import { SignIn } from "@clerk/clerk-react";
import { Logo } from "../components/globals/Logo";

// Este archivo, en ésta ruta, es para personalizar la página de login, muy importate colocar el children
export default function LayaoutAuth() {
	return (
		<div className="flex flex-col justify-center h-full items-center">
			<Logo />
			<h1 className="text-3xl my-2">Bienvenido a mi Dashboard</h1>
			<h2 className="text-2xl mb-1">AngeDevDashboard</h2>
			<SignIn />
		</div>
	)
}