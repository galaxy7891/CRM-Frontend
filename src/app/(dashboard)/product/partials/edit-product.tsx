"use client"

import React, { useState } from "react";
import axios from "axios";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import TextArea from "@/components/form-input/text-area-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import FailText from "@/components/status/fail-text";
import PriceInput from "@/components/form-input/price-input";
import ProfilePhotoUploader from "@/components/form-input/input-photo";

interface EditProductProps {
  onClose: () => void;
 
}

interface dataProduct {
  first_name: string;
  last_name: string;
  customerCategory: string;
  job: string;
  description: string;
  status: string;
  birthdate: null;
  email: string;
  phone: string;
  owner: string;
  address: string;
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}

const EditProduct: React.FC<EditProductProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState<dataProduct| null>(null);
  const [lead, setLead] = useState<dataProduct>({
    first_name: "",
    last_name: "",
    customerCategory: "",
    job: "",
    description: "",
    status: "",
    birthdate: null,
    email: "",
    phone: "",
    
    address: "",
    country: "",
    province: "",
    city: "",
    subdistrict: "",
    village: "",
    zip_code: "",
  });
  const handleAddLead = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Product`,
        lead,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        window.location.reload();
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log(lead);
    }
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Produk">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Kode Produk"
            placeholder="220624A1"
            value={lead.first_name}
            onChange={(e) => setLead({ ...lead, first_name: e.target.value })}
          />
        </div>
        <div className="order-2">
          <TextInput
            label="Nama Produk"
            placeholder="Roti"
            value={lead.last_name}
            onChange={(e) => setLead({ ...lead, last_name: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.first_name}</FailText>}
        </div>
        <div className="order-3">
          <SelectInput
            label="Kategori Produk"
            value={lead.status}
            options={[
              { label: "Kategori Produk", value: "", hidden: true },
              { label: "Jasa", value: "Jasa" },
              { label: "Barang", value: "Barang" },
            ]}
            // if select "jasa" => jumlah produk & satuan produk hidden
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-4">
          <PriceInput
            value={lead.status}
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            required={true}
          />
        </div>
        <div className="order-5">
          <TextInput
            label="Jumlah Produk"
            placeholder="12"
            value={lead.last_name}
            onChange={(e) => setLead({ ...lead, last_name: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-6">
          <SelectInput
            label="Satuan Produk"
            value={lead.status}
            options={[
              { label: "Satuan Produk", value: "", hidden: true },
              { label: "Box", value: "Box" },
              { label: "Pcs", value: "Pcs" },
              { label: "Unit", value: "Unit" },
            ]}
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-7">
        <ProfilePhotoUploader/>
        </div>
        <div className="order-8">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={lead.description }
            onChange={(e) => setLead({ ...lead, description: e.target.value })}
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        <DashboardSidebarYellowButton onClick={handleAddLead}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditProduct;
