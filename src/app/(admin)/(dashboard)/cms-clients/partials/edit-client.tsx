import React, { useState } from "react";
import { clientTypes, EditCustomerProps } from "@/types/administratorTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateClient } from "@/redux/actions/administratorActions";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import DurationInput from "@/components/form-input/duration-input";
import TextInput from "@/components/form-input/text-input";
import SelectInput from "@/components/form-input/dropdown-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import FailText from "@/components/status/fail-text";
import SuccessModal from "@/components/status/success-modal";

const EditCustomer: React.FC<EditCustomerProps> = ({
  onClose,
  clientProps,
}) => {
  const [client, setClient] = useState<clientTypes>({
    ...clientProps,
    quantity: clientProps.quantity || null,
    category: clientProps.category || "",
  });
  console.log(client);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleEdiClient = () => {
    dispatch(updateClient(client, setIsLoading, setIsSuccess, setErrorMessage));
  };
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Pelanggan">
      <form className="flex-grow ">
        <div className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
          <div>
            <SelectInput
              label="Edit Tipe Pelanggan"
              value={client.account_type}
              options={[
                { label: "Pilih Tipe Akun Pelanggan", value: "", hidden: true },
                { label: "Percobaan", value: "Percobaan" },
                { label: "Reguler", value: "Reguler" },
                { label: "Profesional", value: "Profesional" },
                { label: "Bisnis", value: "Bisnis" },
                { label: "Tidak Aktif", value: "Tidak Aktif" },
              ]}
              onChange={(e) =>
                setClient({ ...client, account_type: e.target.value })
              }
              required
            />
            {errorMessage.account_type && (
              <FailText>{errorMessage.account_type}</FailText>
            )}
          </div>
          <div>
            <TextInput
              label="Batas Langganan"
              disabled
              placeholder="Batas Langganan"
              value={client.end_date}
              onChange={(e) =>
                setClient({ ...client, end_date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <DurationInput
              label="Tambah Durasi"
              placeholder="5"
              selectValue={client.category || ""}
              options={[
                { label: "Pilih Penambahan Durasi", value: "", hidden: true },
                { label: "Hari", value: "Hari" },
                { label: "Bulan", value: "Bulan" },
                { label: "Tahun", value: "Tahun" },
              ]}
              onSelectChange={(e) =>
                setClient({ ...client, category: e.target.value })
              }
              textValue={String(client.quantity) || ""}
              onTextChange={(e) =>
                setClient({ ...client, quantity: Number(e.target.value) })
              }
            />
            <ul>
              {errorMessage.category && (
                <li>
                  <FailText>{errorMessage.category}</FailText>
                </li>
              )}
              {errorMessage.quantity && (
                <li>
                  <FailText>{errorMessage.quantity}</FailText>
                </li>
              )}
            </ul>
          </div>
          <div>
            <TextInput
              disabled
              label="Nama Perusahaan"
              placeholder="Nama Perusahaan"
              value={client.user_company.name}
              onChange={() => {}}
              required
            />
          </div>
          <div>
            <TextInput
              disabled
              label="Email Perusahaan"
              placeholder="Email Perusahaan"
              value={client.user_company.email}
              onChange={() => {}}
              required
            />
          </div>
          <div>
            <TextInput
              disabled
              label="Nomor Perusahaan"
              placeholder="Nomor Perusahaan"
              value={client.user_company.phone || "-"}
              onChange={() => {}}
              required
            />
          </div>
        </div>
      </form>
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Batal
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleEdiClient}>
          {isLoading ? "Menyimpan..." : "Simpan"}
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data Client berhasil diubah"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_action={() => window.location.reload()}
        />
      )}
    </SidebarModal>
  );
};

export default EditCustomer;
