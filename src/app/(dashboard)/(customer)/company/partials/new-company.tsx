import SidebarModal from "@/components/layout/sidebar-modal";
import React from "react";

interface FormEditProps {
  onClose: () => void;
}

const NewCompany: React.FC<FormEditProps> = ({ onClose }) => {
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Company">
      <div>NewCompany</div>
    </SidebarModal>
  );
};

export default NewCompany;
