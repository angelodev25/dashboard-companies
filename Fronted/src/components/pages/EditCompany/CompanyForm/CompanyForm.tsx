import axios from 'axios'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { type CompanyFormProps } from "./CompanyForm.types";

import {
	Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'

import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import z from 'zod';
import { formSchema } from './CompanyForm.form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/utils/supabaseClient';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/clerk-react';
import type { SupabaseClient } from '@supabase/supabase-js';

export function CompanyForm(props: CompanyFormProps) {
	const { company } = props
	const [photoUploaded, setPhotoUploaded] = useState(false)
	const [imageUrl, setImageUrl] = useState("")
	const { getClient } = useSupabase()
	const [file, setFile] = useState < File | null > (null)
	const { user } = useUser()

	const form = useForm < z.infer < typeof formSchema >> ({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: company.name,
			country: company.country,
			website: company.website,
			phone: company.phone,
			profileImage: company.profileImage,
			rif: company.rif,
			description: company.description
		}
	});

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

		const { data, error } = await client.storage
			.from("uploads")
			.upload(filePath, file);

		if (error) {
			toast.error("Failed uploading image", { description: error.message })
			console.log(error)
		} else {
			toast.success("Image uploaded!")
			console.log("archivo subido: " + data)	
			setPhotoUploaded(true)
			getImageUrl(filePath, client)
		}
	}

	const getImageUrl = (filePath: string, client: SupabaseClient) => {
		const { data } = client.storage 
			.from('uploads') 
			.getPublicUrl(filePath); 

		setImageUrl(data.publicUrl);
		console.log("Url de la foto: " + data.publicUrl);
	}

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			toast.promise < { name: string } > (
				() =>
					new Promise((resolve) =>
						setTimeout(() => resolve({ name: "Photo" }), 2000)
					),
				{
					loading: "Updating changes...",
				}
			)
			await axios.put(`http://localhost:3000/company/${company.id}`, values)
			toast.success("Company updated successfully")
		} catch (e: any) {
			toast.error('Something went wrong', { description: e.message })
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
				<div className="grid grid-cols-2 gap-3">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input placeholder='Company name...' type="text" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} >
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select country" />
										</SelectTrigger>
									</FormControl>	
									<SelectContent>
										<SelectItem value="spain">España</SelectItem>
										<SelectItem value="united-kingdom">Reino Unido</SelectItem>
										<SelectItem value="italy">Italia</SelectItem>
										<SelectItem value="france">Francia </SelectItem>
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
									<Input placeholder='www.yourdomain.com' type="text" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input placeholder='+58 444 11 55' type="text" {...field} />
								</FormControl>
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
									<Input placeholder='j-12345678' type="text" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="profileImage"
						render={() => (
							<FormItem>
								<FormLabel>Profile Image</FormLabel>
								<FormControl>
									<div>
										{photoUploaded ? (
											<p className="text-center">Image uploaded</p>
										) : (
											<>
												<Input type="file" onChange={(e) => setFile(e.target.files![0] ?? null)} className="border cursor-pointer" />
												<Button type="button" className="bg-[#777777] dark:bg-[#000076] border dark:text-white dark:hover:bg-[#000022] cursor-pointer mt-1  w-40" onClick={handleUpload}>Upload Photo</Button>
											</>
										)}
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder='something...' 
										{...field}
										
										value={form.getValues().description ?? ''}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="cursor-pointer" >Edit Company</Button>
			</form>
		</Form>
	)
}