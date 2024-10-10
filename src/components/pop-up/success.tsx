"use client";

import Image from "next/image";
import { useState } from "react";

export default function PopUpSuccess() {
	const [isOpen, setIsOpen] = useState(true);

	const handleClose = () => {
		setIsOpen(false);
		window.location.reload();
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
			<div className="relative w-[291px] bg-white rounded-lg shadow-lg py-5 px-7">
				<button
					type="button"
					className="absolute top-2 right-2"
					onClick={handleClose}
				>
					<Image
						src="/icons/close-circle.svg"
                        alt="close"
						width={24}
						height={24}
						className="relative"
					/>
				</button>

				<div className="flex flex-col items-center py-3 space-y-3 text-center">
					<div className="icon">
						<Image
							src="/icons/success.png"
                            alt="success"
							width={44}
							height={44}
							className="relative w-11 h-11 shadow-custom-success"
						/>
					</div>
					<h2 className="font-button-md">Successful!</h2>
					<p className="font-tag">Data has been successfully saved</p>
				</div>
			</div>
		</div>
	);
}
