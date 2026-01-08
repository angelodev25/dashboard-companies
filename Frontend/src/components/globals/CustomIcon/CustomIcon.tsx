import { type CustomIconProps } from "./CustomIcon.types"

//Devuelve la imagen del ícono que se le pasa como parámetro
export function CustomIcon(props: CustomIconProps) {
	const { icon: Icon } = props // se debe declarar que el parametro es de tipo icono :Icon
	return (
		<div className="p-2 bg-slate-400/20 rounded-lg">
			<Icon strokeWidth={1} className="w-4 h-4 " />
		</div>
	)
}