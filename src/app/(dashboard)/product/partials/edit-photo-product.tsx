import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import SidebarModal from "@/components/layout/sidebar-modal";
import SidebarFooter from "@/components/layout/sidebar-footer";
import FailText from "@/components/status/fail-text";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import DashboardChangePhotoButton from "@/components/button/dashboard-change-photo-button";

interface FormEditProps {
  onClose: () => void;
  data: Data;
  id: string;
}

interface Data {
  image_url: string;
}

const EditImageProduct = ({ onClose, data, id }: FormEditProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debugging: log the photo selected
    console.log("Selected photo:", photo);
    
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (photo) {
      formData.append("photo_product", photo); // Pastikan Anda menggunakan nama 'photo' sesuai dengan API
    }
    
    // Debugging: log formData to check if file is appended properly
    console.log("Form data before sending:", formData);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, // URL untuk API
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ini penting untuk mengirimkan form data
          },
        }
      );

      // Debugging: log response to check if the API response is as expected
      console.log("API response:", response);

      if (!response.data.success) {
        setErrorMessage(response.data.message.photo[0]);
      } else {
        // Reload page after success
        console.log("Photo updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Produk">
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <Image
          src={
            preview
              ? preview
              : data?.image_url
              ? data?.image_url
              : "/images/default.jpg"
          }
          alt="image"
          width={160}
          height={160}
          className="rounded-full w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
        />
        <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg pt-4">
          Sesuaikan foto produk yang anda pilih.
        </p>
        <FailText>{errorMessage}</FailText>
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
  );
};

export default EditImageProduct ;
