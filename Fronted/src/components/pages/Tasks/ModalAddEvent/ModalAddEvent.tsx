import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ModalAddEventProps } from "./ModalAddEvent.types";
import { FormEvent } from "../FormEvent";

export function ModalAddEvent(props: ModalAddEventProps) {
	const { open, setOpen, setNewEvent, companies, setOnSaveNewEvent } = props
	return (
		<Dialog open={open} onOpenChange={setOpen} >
			<DialogContent className="sm:max-w-[425px]" >
				<DialogHeader>
					<DialogTitle>
						Add a new event
					</DialogTitle>
				</DialogHeader>
				<FormEvent setOpen={setOpen} setNewEvent={setNewEvent} companies={companies} setOnSaveNewEvent={setOnSaveNewEvent} />
			</DialogContent>
		</Dialog>
	)
}