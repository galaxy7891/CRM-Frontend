'use client';

import Image from 'next/image';
import React from 'react';
import ImportSuccess from '@/components/import/import-success';
import ImportFailed from '@/components/import/import-failed';
// import FileUpload from '@/components/form-input/impor-data';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import FailText from '@/components/status/fail-text';

const ImporFile = () => {
  const [fileName, setFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessageDetail, setErrorMessageDetail] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmitFile = async () => {
    console.log('gass', fileName);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file!);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/import/leads`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message);
        setErrorMessageDetail(response.data.data);
        console.log(response.data.data.failedData);
        setIsFailed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      {isSuccess ? (
        <ImportSuccess href="/leads" />
      ) : isFailed ? (
        <ImportFailed errorMessageDetail={errorMessageDetail} />
      ) : (
        <>
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
              Unggah dokumen dengan format{' '}
              <span className="font-bold">xlsx</span> atau
              <span className="block">
                {' '}
                unduh template sesuai format yang telah ditentukan.
              </span>
              <Link
                href={`https://drive.google.com/uc?export=download&id=1Roidvdc-NiEXgnt08FmCP80UdRf7Gu-4`}
                download="template-export-leads.xlsx"
                className="font-bold text-dark-gold hover:underline cursor-pointer"
              >
                Unduh Template
              </Link>
            </p>
          </div>
          <div>
            <input
              type="text"
              value={fileName || 'Belum ada file dipilih'}
              disabled
              className=" p-2 mt-4  border rounded-[4px] w-full border-font-gray text-start bg-light-white"
            />
            {errorMessage && <FailText>{errorMessage} </FailText>}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 mt-4 md:space-y-0 items-center">
              {/* Tombol Unggah Dokum en */}
              <label
                htmlFor="UnggahDokumen"
                className="bg-light-gold text-font-brown md:text-base font-medium py-3 px-6 rounded-[10px] 
    duration-200 hover:shadow-md hover:shadow-light-gold cursor-pointer"
              >
                Pilih Dokumen
              </label>

              {/* Tombol Selanjutnya */}
              <button
                className="bg-light-gold text-font-brown md:text-base font-medium py-3 px-12 rounded-[10px] 
    duration-200 disabled:bg-font-light disabled:text-font-grayLight disabled:cursor-not-allowed 
    enabled:hover:shadow-md enabled:hover:shadow-light-gold"
                disabled={!fileName}
                onClick={handleSubmitFile}
              >
                Selanjutnya
              </button>
            </div>

            <input
              id="UnggahDokumen"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImporFile;
