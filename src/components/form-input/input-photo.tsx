import React, { useState } from "react";
import Image from "next/image";
import SidebarModal from "../layout/sidebar-modal";
import FailText from "../status/fail-text";
import SidebarFooter from "../layout/sidebar-footer";
import DashboardSidebarYellowButton from "../button/dashboard-sidebar-yellow-button";
import DashboardChangePhotoButton from "../button/dashboard-change-photo-button";

const ProfilePhotoUploader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("Belum ada file dipilih");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set nama file
      setPreview(URL.createObjectURL(selectedFile));
      setIsModalOpen(true); // Membuka modal saat file dipilih
    }
  };

  const handleUpdatePhoto = () => {
    setIsLoading(true);
    // Lakukan proses penyimpanan gambar atau upload ke server
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
    }, 2000);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setFile(null);
    setPreview(null);
    setFileName("Belum ada file dipilih"); // Reset nama file
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        Upload Foto
      </label>
      <input
        type="text"
        value={fileName}
        disabled
        onClick={() => document.getElementById("file-input")?.click()} // Tambahkan onClick untuk membuka file picker
        className="mb-4 p-2 mt-4 border rounded-[4px] w-full border-font-gray text-start bg-light-white"
      />

      {isModalOpen && (
        <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Profil">
          <div className="flex-grow flex flex-col justify-center items-center text-center">
            <Image
              src={preview || "/images/default.jpg"}
              alt="image"
              width={160}
              height={160}
              className="rounded-full w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
            />
            <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg pt-4">
              Sesuaikan foto profil yang Anda pilih.
            </p>
            <FailText>{errorMessage}</FailText>
            {file && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Nama file: {file.name}
              </p>
            )}
          </div>

          <SidebarFooter>
            <DashboardChangePhotoButton onChange={handleFileChange}>
              Ganti Foto
            </DashboardChangePhotoButton>
            <DashboardSidebarYellowButton onClick={handleUpdatePhoto}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </DashboardSidebarYellowButton>
          </SidebarFooter>
        </SidebarModal>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
