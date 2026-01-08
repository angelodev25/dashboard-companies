import { UserX2 } from "lucide-react";

export default function ErrorPage() {
	return (
		<div className="flex flex-col  bg-background items-center justify-center text-center border bg-gray-400">
			<h1 className="text-3xl text-red-700 p-4 font-bold flex justify-center items-center" >
				<UserX2 className="h-8 w-8 m-1" />
				Error
			</h1>
			<div className="text-gray-700 mb-4 justify-center text-2xl font-bold border-b" >
				La URL no existe o no tienes acceso.
			</div>
		</div>
	)
}