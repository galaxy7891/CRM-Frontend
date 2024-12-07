import React, { useState, useEffect } from "react";
import { companiesTypes } from "@/types/companiesTypes";
import { useDispatch } from "react-redux";
import { addCompany } from "@/redux/actions/companiesActions";
import { AppDispatch } from "@/redux/store";
import {
  getProvinces,
  getCities,
  getSubDistricts,
  getVillage,
  getZipCodes,
} from "@/utils/getAddressLocation";
import FailText from "@/components/status/fail-text";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import PhoneInput from "@/components/form-input/phone-input";
import SuccessModal from "@/components/status/success-modal";
import TextArea from "@/components/form-input/text-area-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";

interface addCompanyPropsTypes {
  onClose: () => void;
  emailLocal: string;
}
const NewCompany: React.FC<addCompanyPropsTypes> = ({
  onClose,
  emailLocal,
}) => {
  const [provinces, setProvinces] = useState<{ id: string; text: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ id: string; text: string }[]>([]);
  const [subDistricts, setSubDistricts] = useState<
    { id: string; text: string }[]
  >([]);
  const [villages, setVillages] = useState<{ id: string; text: string }[]>([]);
  const [zipCodes, setZipCodes] = useState<{ id: string; text: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [company, setCompany] = useState<companiesTypes>({
    id: "",
    name: "",
    industry: "",
    email: "",
    status: "",
    phone: "",
    owner: emailLocal,
    website: "",
    address: "",
    province: "",
    city: "",
    subdistrict: "",
    village: "",
    zip_code: "",
    description: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleAddCompany = () => {
    dispatch(addCompany(company, setIsSuccess, setErrorMessage));
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const provinces = await getProvinces();
        setProvinces(provinces);

        if (company.province) {
          const cities = await getCities(company.province);
          setCities(cities);

          if (company.city) {
            const subDistricts = await getSubDistricts(company.city);
            setSubDistricts(subDistricts);

            if (company.subdistrict) {
              const villages = await getVillage(company.subdistrict);
              setVillages(villages);

              const zipCodes = await getZipCodes(
                company.city,
                company.subdistrict
              );
              setZipCodes(zipCodes);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
  }, [company.province, company.city, company.subdistrict]);

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Perusahaan">
      <form className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Perusahaan"
            placeholder="Pt Loyal Cust"
            value={company?.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            required
          />
          {errorMessage?.name && <FailText>{errorMessage?.name}</FailText>}
        </div>
        <div className="order-2">
          <SelectInput
            label="Jenis Industri"
            value={company.industry}
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
              setCompany({ ...company, industry: e.target.value })
            }
          />
        </div>
        <div className="order-3">
          <TextInput
            label="Email"
            placeholder="loyalcust@gmail.com"
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
          />
          {errorMessage?.email && <FailText>{errorMessage?.email}</FailText>}
        </div>
        <div className="order-4">
          <PhoneInput
            value={company.phone}
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
          />
          {errorMessage?.phone && <FailText>{errorMessage?.phone}</FailText>}
        </div>
        <div className="order-5 ">
          <TextInput
            label="Website"
            placeholder="www.loyalcust.com"
            value={company.website}
            onChange={(e) =>
              setCompany({ ...company, website: e.target.value })
            }
          />
        </div>
        <div className="order-6">
          <SelectInput
            label="Status Perusahaan"
            value={company.status}
            options={[
              { label: "Pilih Status", value: "", hidden: true },
              { label: "rendah", value: "rendah" },
              { label: "sedang", value: "sedang" },
              { label: "tinggi", value: "tinggi" },
            ]}
            onChange={(e) => setCompany({ ...company, status: e.target.value })}
            required
          />
          {errorMessage?.status && <FailText>{errorMessage?.status}</FailText>}
        </div>
        <div className="order-7">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={company.address}
            onChange={(e) =>
              setCompany({ ...company, address: e.target.value })
            }
          />
        </div>
        <div className="order-8 ">
          <TextInput
            label="Penanggung Jawab"
            placeholder="Penanggung Jawab"
            value={company.owner}
            onChange={(e) => setCompany({ ...company, owner: e.target.value })}
            disabled
          />
          {errorMessage?.owner && <FailText>{errorMessage?.owner}</FailText>}
        </div>

        <div className="order-9">
          <SelectInput
            label="Provinsi"
            value={company.province}
            options={[
              { label: "Pilih Provinsi", value: "", hidden: true },
              ...provinces.map((province) => ({
                label: province.text,
                value: province.id,
              })),
            ]}
            onChange={(e) => {
              setCompany({ ...company, province: e.target.value });
            }}
          />
        </div>
        <div className="order-10 ">
          <SelectInput
            label="Kota"
            value={company.city}
            disabled={!company.province}
            options={[
              { label: "Pilih Kota", value: "", hidden: true },
              ...cities.map((city) => ({ label: city.text, value: city.id })),
            ]}
            onChange={(e) => setCompany({ ...company, city: e.target.value })}
          />
        </div>
        <div className="order-11">
          <SelectInput
            label="Kecamatan"
            value={company.subdistrict}
            disabled={!company.city}
            options={[
              { label: "Pilih Kecamatan", value: "", hidden: true },
              ...subDistricts.map((subDistrict) => ({
                label: subDistrict.text,
                value: subDistrict.id,
              })),
            ]}
            onChange={(e) =>
              setCompany({ ...company, subdistrict: e.target.value })
            }
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kelurahan/Desa"
            value={company.village}
            disabled={!company.subdistrict}
            options={[
              { label: "Pilih Kelurahan/Desa", value: "", hidden: true },
              ...villages.map((village) => ({
                label: village.text,
                value: village.id,
              })),
            ]}
            onChange={(e) =>
              setCompany({ ...company, village: e.target.value })
            }
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kode Pos"
            value={company.zip_code}
            disabled={!company.village}
            options={[
              { label: "Pilih Kode Pos", value: "", hidden: true },
              ...zipCodes.map((zipCode) => ({
                label: zipCode.text,
                value: zipCode.id,
              })),
            ]}
            onChange={(e) =>
              setCompany({ ...company, zip_code: e.target.value })
            }
          />
        </div>
        <div className="order-[14]">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={company.description}
            onChange={(e) =>
              setCompany({ ...company, description: e.target.value })
            }
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        <DashboardSidebarYellowButton onClick={handleAddCompany}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil!"
          description="Perusahaan berhasil ditambahkan"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_href="/companies"
        />
      )}
    </SidebarModal>
  );
};

export default NewCompany;
