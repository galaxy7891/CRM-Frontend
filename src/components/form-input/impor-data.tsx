import React, { useState, ChangeEvent } from "react";

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="">
      <input
        type="text"
        value={fileName || "Belum ada file dipilih"}
        disabled
        className="mb-4 p-2 mt-4  border rounded-[4px] w-full border-font-gray text-start bg-light-white"
      />
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center">
        {/* Tombol Unggah Dokumen */}
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
          disabled={true}
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
