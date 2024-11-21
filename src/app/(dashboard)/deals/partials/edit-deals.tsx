import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import DateInput from "@/components/form-input/date-input";
import SelectInput from "@/components/form-input/dropdown-input";
import DurationInput from "@/components/form-input/duration-input";
import PriceInput from "@/components/form-input/price-input";
import TextArea from "@/components/form-input/text-area-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import React, { useState } from "react";

interface editDealsProps {
  onClose: () => void;
}

const EditDeals: React.FC<editDealsProps> = ({ onClose }) => {
  const [deals, setDeals] = useState({
    kategoriPembeli: "",
    tahapan: "",
  });
  const handleKategoriChange = (e) => {
    const value = e.target.value;
    setDeals({ ...deals, kategoriPembeli: value });
  };
  const handleTahapanChange = (e) => {
    const value = e.target.value;
    setDeals({ ...deals, tahapan: value });
  };
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Deals">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <TextInput
          label="Nama Deals"
          placeholder="Deals"
          // value={deals.}
          // onChange={(e) => setDeals({ ...deals, : e.target.value })}
          required
        />
        <SelectInput
          label="Kategori Pembeli"
          value={deals.kategoriPembeli}
          options={[
            { label: "Pilih Kategori Pelanggan", value: "", hidden: true },
            { label: "Pelanggan", value: "pelanggan" },
            { label: "Perusahaan", value: "perusahaan" },
          ]}
          onChange={handleKategoriChange}
          required
        />
        {/* Tampilkan field sesuai kategori pembeli */}
        {deals.kategoriPembeli === "pelanggan" && (
          <SelectInput
            label="Nama Pelanggan"
            // value={deals.}
            options={[{ label: "Pilih Pelanggan", value: "", hidden: true }]}
            // onChange={(e) =>
            //   setDeals({ ...deals, : e.target.value })
            // }
            required
          />
        )}
        {deals.kategoriPembeli === "perusahaan" && (
          <SelectInput
            label="Nama Perusahaan"
            // value={deals.}
            options={[{ label: "Pilih Perusahaan", value: "", hidden: true }]}
            // onChange={(e) =>
            //   setDeals({ ...deals, : e.target.value })
            // }
            required
          />
        )}
        <SelectInput
          label="Nama Produk "
          // value={deals}
          options={[
            { label: "Pilih Nama Produk", value: "", hidden: true },
            { label: "", value: "" },
            { label: "", value: "" },
          ]}
          // onChange={(e) => setDeals({ ...deals, : e.target.value })}
          required
        />
        <TextInput
          label="Jumlah Produk"
          placeholder="12"
          // value={deals.}
          // onChange={(e) => setDeals({ ...deals, : e.target.value })}
          required
        />
        <SelectInput
          label="Satuan Produk"
          // value={deals.}
          options={[
            { label: "Satuan Produk", value: "", hidden: true },
            { label: "Box", value: "box" },
            { label: "Pcs", value: "pcs" },
            { label: "Unit", value: "unit" },
          ]}
          // onChange={(e) =>
          //   setDeals({ ...deals, : e.target.value })
          // }
          required
        />
        <SelectInput
          label="Kategori Pembayaran"
          // value={deals.}
          options={[
            { label: "Kategori Pembayaran", value: "", hidden: true },
            { label: "Sekali", value: "" },
            { label: "Berulang", value: "" },
          ]}
          // onChange={(e) =>
          //   setDeals({ ...deals, : e.target.value })
          // }
        />
        <DurationInput
          label="Durasi Pembayaran"
          placeholder="5"
          // textValue={deals.}
          // selectValue={deals.}
          options={[
            { label: "Durasi Pembayaran", value: "", hidden: true },
            { label: "Hari", value: "" },
            { label: "Bulan", value: "" },
            { label: "Tahun", value: "" },
          ]}
          // onTextChange={(e) =>
          //     setDeals({ ...deals, : e.target.value })
          //   }
          // onSelectChange={(e) =>
          //     setDeals({ ...deals, : e.target.value })
          //   }
        />
        <SelectInput
          label="Tahapan"
          value={deals.tahapan}
          options={[
            { label: "Pilih Tahapan Deals", value: "", hidden: true },
            { label: "Kualifikasi", value: "kualifikasi" },
            { label: "Proposal", value: "proposal" },
            { label: "Negosiasi", value: "negosiasi" },
            { label: "Tercapai", value: "tercapai" },
            { label: "Gagal", value: "gagal" },
          ]}
          onChange={handleTahapanChange}
          required
        />
        {deals.tahapan === "tercapai" ? (
          <PriceInput
            label="Nilai Terkini"
            // value={deals.}
            // onChange={(e) =>
            //   setDeals({ ...deals, : e.target.value })
            // }
          />
        ) : (
          <PriceInput
            label="Perkiraan Nilai"
            // value={deals.}
            // onChange={(e) =>
            //   setDeals({ ...deals, : e.target.value })
            // }
          />
        )}

        <DateInput
          label="Tanggal Perkiraan Penutupan"
          // value={deals.}
          // onChange={(e) =>
          //   setDeals({ ...deals, : e.target.value })
          // }
          required
        />

         {/* Show "Tanggal Penutupan" field if stage is either "tercapai" or  "gagal" */}
         
        {(deals.tahapan === "tercapai" || deals.tahapan === "gagal") && (
          <DateInput
            label="Tanggal Penutupan"
            // value={deals.}
            // onChange={(e) =>
            //   setDeals({ ...deals, : e.target.value })
            // }
            required
          />
        )}
        <SelectInput
          label="Status "
          // value={deals}
          options={[
            { label: "Pilih Status", value: "", hidden: true },
            { label: "rendah", value: "rendah" },
            { label: "sedang", value: "sedang" },
            { label: "tinggi", value: "tinggi" },
          ]}
          // onChange={(e) => setDeals({ ...deals, : e.target.value })}
          required
        />
        <TextInput
          label="Tag"
          placeholder="Tag"
          // value={deals.}
          // onChange={(e) => setDeals({ ...deals, : e.target.value })}
        />
        <SelectInput
          label="Penanggung Jawab"
          // value={deals}
          options={[
            { label: "Pilih Penanggung Jawab", value: "", hidden: true },
          ]}
          // onChange={(e) => setDeals({ ...deals, : e.target.value })}
          required
        />
        <TextArea
          label="Deskripsi"
          placeholder="Deskripsi"
          // value={deals.}
          // onChange={(e) =>
          //   setDeals({ ...deals, : e.target.value })
          // }
        />
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

export default EditDeals;
