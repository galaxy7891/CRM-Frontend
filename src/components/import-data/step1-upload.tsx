"use client";

import Image from "next/image";
import React from "react";
import FileUpload from "../form-input/impor-data";
import Link from "next/link";

const ImporFile = () => {
  return (
    <div className="bg-font-white dark:bg-dark-navy py-6 shadow-lg rounded-lg h-full w-full flex flex-col justify-center items-center">
      <p>Stepper</p>
      <Image
        src="/icons/table/impor.svg"
        alt="impor"
        width={150}
        height={150}
      />
      <p className="font-custom font-bold md:text-2xl text-lg text-font-black mt-4">
        Unggah Dokumen
      </p>
      <div className="font-custom text-xs md:text-base text-center text-font-black mt-2">
        <p>
          Unggah dokumen dengan format <span className="font-bold">xlsx</span>{" "}
          atau
          <span className="block">
            {" "}
            unduh template sesuai format yang telah ditentukan.
          </span>{" "}
          <Link
            href="/path/to/template.xlsx"
            download="Template.xlsx"
            className="font-bold text-dark-gold hover:underline cursor-pointer"
          >
            Unduh Template
          </Link>
        </p>
      </div>

      <FileUpload />
    </div>
  );
};

export default ImporFile;
