import React, { useState } from "react";
import { productsTypes } from "@/types/productTypes";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/actions/productsActions";
import { AppDispatch } from "@/redux/store";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import SuccessModal from "@/components/status/success-modal";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import TextArea from "@/components/form-input/text-area-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import FailText from "@/components/status/fail-text";
import PriceInput from "@/components/form-input/price-input";

interface newProductsProps {
  onClose: () => void;
}

const NewProduct: React.FC<newProductsProps> = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [product, setProduct] = useState<productsTypes>({
    id: "",
    name: "",
    category: "",
    code: "",
    quantity: "",
    unit: "",
    price: "",
    description: "",
    image_url: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleAddProduct = () => {
    console.log("Data produk yang akan disimpan:", product);
    dispatch(addProduct(product, setIsSuccess, setErrorMessage));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah products">
      <form className="">
        <div className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
          <div className="order-1">
            <TextInput
              label="Kode Produk"
              placeholder="220624A1"
              value={product.code}
              onChange={(e) => setProduct({ ...product, code: e.target.value })}
              required
            />
            {errorMessage.code && <FailText>{errorMessage.code}</FailText>}
          </div>
          <div className="order-2">
            <TextInput
              label="Nama Produk"
              placeholder="Roti"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
            {errorMessage && <FailText>{errorMessage.first_name}</FailText>}
          </div>
          <div className="order-3">
            <SelectInput
              label="Kategori Produk"
              value={product.category}
              options={[
                { label: "Kategori Produk", value: "", hidden: true },
                { label: "Jasa", value: "Jasa" },
                { label: "Barang", value: "Barang" },
              ]}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            />
            {errorMessage.category && (
              <FailText>{errorMessage.category}</FailText>
            )}
          </div>
          <div className="order-4">
            <PriceInput
              placeholder="Harga Produk"
              label="Harga Produk"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required={true}
            />
          </div>
          {product.category !== "Jasa" && (
            <>
              <div className="order-5">
                <TextInput
                  label="Jumlah Produk"
                  placeholder="12"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  required
                />
                {errorMessage && <FailText>{errorMessage.quantity}</FailText>}
              </div>
              <div className="order-6">
                <SelectInput
                  label="Satuan Produk"
                  value={product.unit}
                  options={[
                    { label: "Satuan Produk", value: "", hidden: true },
                    { label: "Box", value: "box" },
                    { label: "Pcs", value: "pcs" },
                    { label: "Unit", value: "unit" },
                  ]}
                  onChange={(e) =>
                    setProduct({ ...product, unit: e.target.value })
                  }
                  required
                />
                {errorMessage && <FailText>{errorMessage.unit}</FailText>}
              </div>
            </>
          )}

          <div className="order-7">
            <TextArea
              label="Deskripsi"
              placeholder="Deskripsi"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Batal
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        <DashboardSidebarYellowButton onClick={handleAddProduct}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data produk berhasil ditambahkan"
          actionButton_name="Kembali ke Halaman Produk"
          actionButton_action={() => window.location.reload()}
          // actionButton_action={window.location.reload}
        />
      )}
    </SidebarModal>
  );
};

export default NewProduct;
