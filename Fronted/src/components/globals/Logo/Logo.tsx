"use client"

import { useNavigate } from "react-router"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function Logo() {
	const navigate = useNavigate()

	return (
		<div className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2" onClick={() => navigate("/")} >
			<LazyLoadImage src="/logoipsum-383.svg" alt="Logo" width={30} height={30} effect="blur" threshold={100} />
			<h1 className="font-bold text-xl text-[#1A0340] dark:text-[#a0a0d0]">A-Manager</h1>
		</div>
	)
}