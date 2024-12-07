import { useState } from "react";
import { dataCompany } from "@/types/profileTypes";
import { updateCompanyUserProfile } from "@/redux/actions/profileActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import TextInput from "@/components/form-input/text-input";
import SelectInput from "@/components/form-input/dropdown-input";
import FailText from "@/components/status/fail-text";
import PhoneInput from "@/components/form-input/phone-input";
import SidebarModal from "@/components/layout/sidebar-modal";
import SidebarFooter from "@/components/layout/sidebar-footer";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SuccessModal from "@/components/status/success-modal";

interface FormEditProps {
  onClose: () => void;
  data: dataCompany;
}

const EditCompany = ({ onClose, data }: FormEditProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [companyUserProfile, setCompanyUserProfile] =
    useState<dataCompany>(data);
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateCompanyUser = () => {
    dispatch(
      updateCompanyUserProfile(
        companyUserProfile,
        setIsSuccess,
        setErrorMessage
      )
    );
  };
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Perusahaan">
      {/* Scrollable Form */}
      <form className="overflow-y-auto p-2 md:p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <TextInput
              label="Nama Perusahaan"
              placeholder="Nama Perusahaan"
              value={companyUserProfile.name || ""}
              onChange={(e) =>
                setCompanyUserProfile({
                  ...companyUserProfile,
                  name: e.target.value,
                })
              }
              required
            />
            {errorMessage && <FailText>{errorMessage?.name}</FailText>}
          </div>
          <div className="flex-1">
            <TextInput
              label="Email"
              placeholder="Email"
              value={companyUserProfile.email || ""}
              onChange={(e) =>
                setCompanyUserProfile({
                  ...companyUserProfile,
                  email: e.target.value,
                })
              }
            />
            {errorMessage && <FailText>{errorMessage?.email}</FailText>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <SelectInput
              label="Jenis Industri"
              value={companyUserProfile.industry || ""}
              options={[
                { label: "Pilih Jenis Industri", value: "", hidden: true },
                { label: "Edukasi", value: "Edukasi" },
                { label: "Kesehatan", value: "Kesehatan" },
                { label: "Manufaktur", value: "Manufaktur" },
                { label: "Pariwisata", value: "Pariwisata" },
                { label: "Real Estate", value: "Real Estate" },
                { label: "Retail", value: "Retail" },
                { label: "Teknologi", value: "Teknologi" },
                { label: "Transportasi", value: "Transportasi" },
                { label: "Lainnya", value: "Lainnya" },
              ]}
              onChange={(e) =>
                setCompanyUserProfile({
                  ...companyUserProfile,
                  industry: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-1">
            <PhoneInput
              value={companyUserProfile.phone}
              onChange={(e) =>
                setCompanyUserProfile({
                  ...companyUserProfile,
                  phone: e.target.value,
                })
              }
              required
            />
            {errorMessage?.phone && <FailText>{errorMessage?.phone}</FailText>}
          </div>
        </div>

        {/* Website */}
        <div className="grid md:grid-cols-2 gap-x-4">
          <div className="flex-1">
            <TextInput
              label="Website"
              placeholder="Website"
              value={companyUserProfile.website || ""}
              onChange={(e) =>
                setCompanyUserProfile({
                  ...companyUserProfile,
                  website: e.target.value,
                })
              }
            />
          </div>
        </div>
      </form>

      {/* Sticky Footer */}
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus semua
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleUpdateCompanyUser}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>

      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data perusahaan berhasil diperbarui"
          actionButton_name="Kembali"
          actionButton_action={onClose}
        />
      )}
    </SidebarModal>
  );
};

export default EditCompany;
