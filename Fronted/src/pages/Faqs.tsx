import { AccordionFaqs } from "@/components/pages/faqs/AccordionFaqs/AccordionFaqs";

export default function Faqs() {
	return (
		<div className="msxd-w-full mx-auto bg-background shadow-md rounded-lg p-6">
			<h2 className="text-3xl mb-8">FAQs</h2>
			<div className="mb-5">
				<p>Texto de explicacion</p>
				<p>Otro texto de explicacion</p>
			</div>
			<AccordionFaqs />
		</div>
	)
}