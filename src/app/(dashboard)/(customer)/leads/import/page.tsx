'use client';

import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import { ImportErrorMessageDetailTypes } from '@/types/otherTypes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { importLeads } from '@/redux/actions/leadsActions';
import ImportInstruction from '@/components/import/import-instruction';
import FileInput from '@/components/form-input/file-input';
import FileImportSubmit from '@/components/form-input/file-import-submit';
import ImportSuccess from '@/components/import/import-success';
import ImportFailed from '@/components/import/import-failed';
import DashboardCard from '@/components/layout/dashboard-card';
import FailText from '@/components/status/fail-text';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import ImportTitle from '@/components/import/import-title';

const ImporFile = () => {
  const [fileName, setFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessageDetail, setErrorMessageDetail] =
    useState<ImportErrorMessageDetailTypes | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmitFile = async () => {
    if (file) {
      dispatch(
        importLeads(
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  return (
    <>
      <HeaderWithBackButton title="Impor Dokumen" />

      {isSuccess ? (
        <ImportSuccess href="/leads" />
      ) : isFailed ? (
        <ImportFailed errorMessageDetail={errorMessageDetail!} />
      ) : (
        <DashboardCard>
          <div className="flex flex-col items-center h-full w-full">
            <Image
              src="/images/icons/table/impor.svg"
              alt="impor"
              width={150}
              height={150}
            />
            <ImportTitle />
            <div className="flex flex-col w-full mt-2 sm:px-32 2xl:px-60">
              <ImportInstruction href="https://drive.google.com/uc?export=download&id=1GkYrWRMJZr9-tRnRqRxDHXdkZ4vhFfNs" />

              <FileInput value={fileName || 'Belum ada file dipilih'} />
              {errorMessage && <FailText>{errorMessage} </FailText>}
              <FileImportSubmit
                fileName={fileName}
                handleSubmitFile={handleSubmitFile}
                handleFileChange={handleFileChange}
              >
                {isLoading ? 'Memuat...' : 'Selanjutnya'}
              </FileImportSubmit>
            </div>
          </div>
        </DashboardCard>
      )}
    </>
  );
};

export default ImporFile;
