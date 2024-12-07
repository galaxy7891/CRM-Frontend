import { ChangeEvent } from 'react';

const FileImportSubmit = ({
  fileName,
  handleSubmitFile,
  handleFileChange,
  children,
}: {
  fileName: string;
  handleSubmitFile: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-4  mt-4 space-y-2 lg:space-y-0 items-center justify-center">
        <label
          htmlFor="UnggahDokumen"
          className="bg-light-gold w-full lg:w-auto text-center text-font-brown text-xs md:text-base font-medium p-[8px] lg:py-3 md:px-6 rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold cursor-pointer"
        >
          Pilih Dokumen
        </label>

        <button
          className="bg-light-gold w-full lg:w-auto text-font-brown text-xs md:text-base font-medium p-[8px] lg:py-3 md:px-12  rounded-[10px]  duration-200 disabled:bg-font-light disabled:text-font-grayLight disabled:cursor-not-allowed  enabled:hover:shadow-md enabled:hover:shadow-light-gold"
          disabled={!fileName}
          onClick={handleSubmitFile}
        >
          {children}
        </button>
      </div>

      <input
        id="UnggahDokumen"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default FileImportSubmit;
