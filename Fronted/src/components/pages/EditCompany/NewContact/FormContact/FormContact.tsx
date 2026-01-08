import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormField,
   FormItem,
   FormControl,
   FormLabel,
   FormMessage
} from "@/components/ui/form"

import {
   Select,
   SelectContent,
   SelectTrigger,
   SelectItem,
   SelectValue
} from '@/components/ui/select'
import type { FormContactProps } from "./FormContact.types"
import { Navigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import z from "zod"
import { formSchema } from "./FormContact.form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"

function FormContact(props: FormContactProps) {
   const { setOpen, onSuccess } = props
   const params = useParams()
   const { userId } = useAuth()

   const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         role: "",
         email: "",
         phone: "",
      }
   })

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         toast.promise < { name: string } > (
            () =>
               new Promise((resolve) =>
                  setTimeout(() => resolve({ name: "Photo" }), 2000)
               ),
            {
               loading: "Creating",
            }
         )
         if (!userId) {
            toast.error("No estás registrado")
            return <Navigate to="/sign-in" />
         }

         console.log(params.id)

         const contact = await axios.post(`http://localhost:3000/company/${params.id}/contact`, values)
         console.log(contact)
         toast.success("Contact Created")
         setOpen(false)
         if (onSuccess) {
            onSuccess()
         }
      } catch (error: any) {
         toast.error("There was an error", { description: error.message })
         console.log(error);
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4" >
            <FormField 
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input placeholder="Tyrone Gonzáles" {...field} />
                     </FormControl>
                     <FormMessage />

                  </FormItem>
               )}
            />
            <FormField 
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input type="email" placeholder="email@gamil.com" {...field} />
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
                     <FormLabel>Phone</FormLabel>
                     <FormControl>
                        <Input placeholder="+58 444 111 22 33" {...field} />
                     </FormControl>
                     <FormMessage />

                  </FormItem>
               )}
            />
            <FormField 
               control={form.control}
               name="role"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Role</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Select the role" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="Comercial">Comercial</SelectItem>
                           <SelectItem value="CEO">CEO</SelectItem>
                           <SelectItem value="Customer Service">Customer Service</SelectItem>
                           <SelectItem value="Analytics">Analytics</SelectItem>
                           <SelectItem value="Other">Other...</SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="cursor-pointer" >Save Contact</Button>
         </form>
      </Form>
   )
}

export default FormContact
