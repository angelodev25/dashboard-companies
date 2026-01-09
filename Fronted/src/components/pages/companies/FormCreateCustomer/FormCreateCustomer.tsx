import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type FormCreateCustomerProps } from "./FormCreateCustomer.types"
import { useEffect, useState } from "react"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useSupabase } from "@/utils/supabaseClient"
import { useAuth, useUser } from "@clerk/clerk-react"
import type { SupabaseClient } from "@supabase/supabase-js"

const formSchema = z.object({
	name: z.string(),
	country: z.string().min(2),
	website: z.string().min(2),
	phone: z.string().min(6),
	rif: z.string().min(6),
	profileImage: z.string()
})

export function FormCreateCustomer(props: FormCreateCustomerProps) {
	const { setOpenModalCreate, onSuccess } = props
	const [photoUplaoded, setPhotoUploaded] = useState(false)
	const [file, setFile] = useState < File | null > (null);
	const [imageUrl, setImageUrl] = useState("")
	const { user } = useUser();
	const { getClient } = useSupabase()
	const { userId } = useAuth()
	const API_URL = import.meta.env.VITE_API_URL
	
	const form = useForm < z.infer < typeof formSchema >> ({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			country: "",
			website: "",
			phone: "",
			rif: "",
			profileImage: ""
		},
	})

	useEffect(() => { 
		if (imageUrl) { 
			form.setValue("profileImage", imageUrl); 
		}
	}, [imageUrl, form]);
 
	const handleUpload = async () => {

		toast.promise < { name: string } > (
			() =>
				new Promise((resolve) =>
					setTimeout(() => resolve({ name: "Photo" }), 2000)
				),
			{
				loading: "Uploading...",
			}
		)
		
		if (!file || !user) return;

		const client = await getClient()

		const filePath = `${user.id}/${Date.now()}-${file.name}`

		const { error } = await client.storage
			.from("uploads")
			.upload(filePath, file);

		if (error) {
			toast.error("Failed uploading image", { description: error.message })
			console.log(error)
		} else {
			toast.success("Image uploaded!")
			setPhotoUploaded(true)
			getImageUrl(filePath, client)
		}
	}

	const getImageUrl = (filePath: string, client: SupabaseClient) => {
		const { data } = client.storage 
			.from('uploads') 
			.getPublicUrl(filePath); 

		setImageUrl(data.publicUrl);
	}

	const { isValid } = form.formState
 
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			toast.promise < { name: string } > (
				() =>
					new Promise((resolve) =>
						setTimeout(() => resolve({ name: "Photo" }), 2000)
					),
				{
					loading: "Creating...",
				}
			)
			if (!userId) {
				toast.error("Access denied")
				return
			};

			await axios.post(`${API_URL}/company`, { userId, ...values });
			toast.success("Company created")

			setOpenModalCreate(false)
			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			console.log("Full Error: " + error)
			toast.error("Something went wrong. ", { description: error.message })
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-2 gap-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company name</FormLabel>
									<FormControl>
										<Input placeholder="company name..." type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select country" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="spain">España</SelectItem>
											<SelectItem value="united-kingdom">Reino Unido</SelectItem>
											<SelectItem value="france">Francia</SelectItem>
											<SelectItem value="italy">Italia</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input placeholder="www.yourdomain.com" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input placeholder="+58 426 111 2222" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rif"
							render={({ field }) => (
								<FormItem>
									<FormLabel>RIF</FormLabel>
									<FormControl>
										<Input placeholder="j-123456789" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="profileImage"
							render={({}) => (
								<FormItem>
									<FormLabel>Profile Image (Máx. 4MB)</FormLabel>
									<FormControl>
										{photoUplaoded ? (
											<div className="grid">
												<p className="text-sm ml-4 text-slate-400">Image uploaded</p>
												<img src={imageUrl} alt="photo" width={50} height={50} className="flex justify-center items-center ml-4 mt-1 " />
											</div>
										) : (
											<div className="grid items-center">
												<Input type="file" onChange={(e) => setFile(e.target.files![0] ?? null)} className="border cursor-pointer" />
												<Button type="button" className="bg-[#777777] dark:bg-[#000076] border dark:text-white dark:hover:bg-[#000022] cursor-pointer mt-1  w-40" onClick={handleUpload} >Upload Photo</Button>
											</div>
										)}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={!isValid} className="text-center cursor-pointer after:bg-[#030305]" >Submit</Button>
				</form>
			</Form>
		</div>
	)
}