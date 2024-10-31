import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import PhoneInput from "@/components/form-input/phone-input";
import TextArea from "@/components/form-input/text-area-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import React, { useState } from "react";

interface FormEditProps {
  onClose: () => void;
  data: data;
}

interface data {
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  phone: string;
}
const EditCompany: React.FC<FormEditProps> = ({ onClose, data }) => {
  const [firstName, setFirstName] = useState(data?.first_name);
  const [email, setEmail] = useState(data?.email);
  const [status, setStatus] = useState(data?.status);
  const [phone, setPhone] = useState(data?.phone);
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Perusahaan">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Perusahaan"
            placeholder="Pt Loyal Cust"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="order-2">
          <SelectInput
            label="Jenis Industri"
            value={status}
            options={[
              { label: "Manufaktur", value: "Manufaktur" },
              { label: "Teknologi", value: "Teknologi" },
              { label: "Lainnya", value: "Lainnya" },
            ]}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-3">
          <TextInput
            label="Email"
            placeholder="loyalcust@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-4">
          <PhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="order-5 ">
          <TextInput
            label="Website"
            placeholder="www.loyalcust.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-6">
          <SelectInput
            label="Status Perusahaan"
            value={status}
            options={[
              { label: "Rendah", value: "Rendah" },
              { label: "Sedang", value: "Sedang" },
              { label: "Tinggi", value: "Tinggi" },
            ]}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="order-7">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-8 ">
          <SelectInput
            label="Penanggung Jawab"
            value={status}
            options={
              [
                // get data from karyawan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>

        <div className="order-9">
          <SelectInput
            label="Provinsi"
            value={status}
            options={
              [
                // get data from api provinsi
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-10 ">
          <SelectInput
            label="Kota"
            value={status}
            options={
              [
                // get data from api kota
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-11">
          <SelectInput
            label="Kecamatan"
            value={status}
            options={
              [
                // get data from api kecamatan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kelurahan"
            value={status}
            options={
              [
                // get data from api kelurahan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kode Pos"
            value={status}
            options={
              [
                // get data from api kode pos
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        {/* <DashboardSidebarYellowButton onClick={handleSubmit}>
            Tambah
          </DashboardSidebarYellowButton> */}
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditCompany;
