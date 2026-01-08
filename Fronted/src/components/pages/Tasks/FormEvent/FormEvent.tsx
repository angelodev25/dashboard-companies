import z from "zod";
import type { FormEventProps } from "./FormEvent.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	eventName: z.string().min(2),
	companySelected: z.object({
		name: z.string().min(2),
		id: z.string()
	})
})

export function FormEvent(props: FormEventProps) {
	const { setOpen, setOnSaveNewEvent, setNewEvent, companies } = props

	const form = useForm < z.infer < typeof formSchema >> ({
		resolver: zodResolver(formSchema),
		defaultValues: {
			eventName: "",
			companySelected: {
				name: "",
				id: ""
			}
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setNewEvent(values)
		setOpen(false)
		setOnSaveNewEvent(true)
	} 

	const handleCompanyChange = (newValue: string) => {
		const selectedCompany = companies.find(company => company.name === newValue)
		if (selectedCompany) {
			form.setValue("companySelected", {
				name: selectedCompany.name,
				id: selectedCompany.id
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
				<FormField
					control={form.control}
					name="eventName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Meeting..." {...field} />
							</FormControl>
							<FormDescription>This is the name of your event</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="companySelected.name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<Select onValueChange={(newValue) => {
								field.onChange(newValue)
								handleCompanyChange(newValue)
							}}
								defaultValue={field.value} >
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a company..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{companies.map((company) => (
										<SelectItem key={company.id} value={company.name} >{company.name}</SelectItem>
									))}	
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="cursor-pointer" >Create Event</Button>
			</form>
		</Form>
	)
}