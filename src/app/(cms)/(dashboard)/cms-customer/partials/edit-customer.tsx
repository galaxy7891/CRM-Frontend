import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import DateInput from "@/components/form-input/date-input";
import SelectInput from "@/components/form-input/dropdown-input";
import TextContainer from "@/components/form-input/text-container";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import React from "react";

interface EditCustomerProps {
  onClose: () => void;
}
const EditCustomer: React.FC<EditCustomerProps> = ({ onClose }) => {
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Pelanggan">
      <form className="flex-grow ">
        <div className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
          <SelectInput
            label="Edit Tipe Pelanggan"
            // value={}
            options={[
              { label: "Pilih Tipe Akun Pelanggan", value: "", hidden: true },
              { label: "Percobaan", value: "" },
              { label: "Reguler", value: "" },
              { label: "Profesional", value: "" },
              { label: "Bisnis", value: "" },
              { label: "Tidak Aktif", value: "" },
            ]}
            // onChange={}
            required
          />
          <DateInput
            label="Batas Langganan"
            // value={|| ''}
            // onChange={(e) => set({ ..., : e.target.value })}
            required
          />
          <TextContainer label="Nama Perusahaan" value="halo" />
          <TextContainer label="Email Perusahaan" value="halo" />
          <TextContainer label="Nomor Telepon Perusahaan" value="halo" />
        </div>
      </form>
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton>Simpan</DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditCustomer;
