export function FormatDate(date: Date) {
	const months = [
		"ene",
		"feb",
		"mar",
		"abr",
		"may",
		"jun",
		"jul",
		"ago",
		"sep",
		"oct",
		"nov",
		"dic",
	]
	const dateObject = new Date(date); 
	const day = dateObject.getDate()
	const month = months[dateObject.getMonth()]
	const year = dateObject.getFullYear()

	return `${day} ${month}, ${year}`
}