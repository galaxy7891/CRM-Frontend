"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { importProducts } from "@/redux/actions/productsActions";
import { ImportErrorMessageDetailTypes } from "@/types/otherTypes";
import ImportSuccess from "@/components/import/import-success";
import ImportFailed from "@/components/import/import-failed";
import ImportInstruction from "@/components/import/import-instruction";
import FileInput from "@/components/form-input/file-input";
import FileImportSubmit from "@/components/form-input/file-import-submit";
import FailText from "@/components/status/fail-text";
import DashboardCard from "@/components/layout/dashboard-card";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import ImportTitle from "@/components/import/import-title";

const ImporFile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorMessageDetail, setErrorMessageDetail] =
    useState<ImportErrorMessageDetailTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleSubmitFile = () => {
    if (file) {
      dispatch(
        importProducts(
          file,
          setIsLoading,
          setIsSuccess,
          setErrorMessage,
          setErrorMessageDetail,
          setIsFailed
        )
      );
    }
  };
  return (
    <>
      <HeaderWithBackButton title="Impor Dokumen" />
      <div className="">
        {isSuccess ? (
          <ImportSuccess href="/product" />
        ) : isFailed ? (
          <ImportFailed errorMessageDetail={errorMessageDetail!} />
        ) : (
          <DashboardCard>
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/icons/table/impor.svg"
                alt="impor"
                width={150}
                height={150}
              />
              <ImportTitle />
              <div className="flex flex-col w-full mt-2 sm:px-32 2xl:px-60">
                <ImportInstruction href="https://drive.google.com/uc?export=download&id=1-JdR7UrkWEgNq3rwOD_g3tUuM3e75DJI" />
                <FileInput value={fileName || "Belum ada file dipilih"} />

                {errorMessage && <FailText>{errorMessage} </FailText>}
                <FileImportSubmit
                  fileName={fileName}
                  handleSubmitFile={handleSubmitFile}
                  handleFileChange={handleFileChange}
                >
                  {isLoading ? "Memuat..." : "Selanjutnya"}
                </FileImportSubmit>
              </div>
            </div>
          </DashboardCard>
        )}
      </div>
    </>
  );
};

export default ImporFile;
