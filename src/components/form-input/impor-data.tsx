import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
        setSuccess(true);
      } else {
        console.error(response.data.message);
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
    <div>
      <input
        type="text"
        value={fileName || 'Belum ada file dipilih'}
        disabled
        className="mb-4 p-2 mt-4  border rounded-[4px] w-full border-font-gray text-start bg-light-white"
      />
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center">
        {/* Tombol Unggah Dokum en */}
        <label
          htmlFor="UnggahDokumen"
          className="bg-light-gold text-font-brown md:text-base font-medium py-3 px-6 rounded-[10px] 
    duration-200 hover:shadow-md hover:shadow-light-gold cursor-pointer"
        >
          Unggah Dokumen
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
  );
};

export default FileUpload;
