import SidebarModal from "@/components/layout/sidebar-modal";
import React from "react";
import Step2_Succes from "./step2-succes";
import Step1_Invite from "./step1-invite";
import Step2_Failed from "./step2-failed";

interface InviteEmployeeProps {
  onClose: () => void;
}

const InviteEmployee: React.FC<InviteEmployeeProps> = ({ onClose }) => {
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Undang Pengguna">
      <Step1_Invite/>
      {/* <Step2_Succes/> */}
      {/* <Step2_Failed/> */}
    </SidebarModal>
  );
};

export default InviteEmployee;
