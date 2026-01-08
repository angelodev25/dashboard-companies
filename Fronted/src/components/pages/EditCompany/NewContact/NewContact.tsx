import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useState } from "react"
import FormContact from "./FormContact/FormContact"

function NewContact(props: { onContactCreated: any }) {
  const [open, setOpen] = useState(false)
  const { onContactCreated } = props
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button className="cursor-pointer" >Add New Contact</Button>
      </DialogTrigger>
      <DialogContent className="sn:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add new contact</DialogTitle>
          <DialogDescription>
            Create your contacts to manage them later
          </DialogDescription>
        </DialogHeader>
        <FormContact setOpen={setOpen} onSuccess={onContactCreated} />
      </DialogContent>
    </Dialog>
  )
}

export default NewContact