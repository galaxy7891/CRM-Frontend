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
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Kode Produk"
            placeholder="220624A1"
            value={product.code}
            onChange={(e) => setProduct({ ...product, code: e.target.value })}
          />
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
              { label: "Jasa", value: "jasa" },
              { label: "Barang", value: "barang" },
            ]}
            // if select "jasa" => jumlah produk & satuan produk hidden
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            required
          />
          {errorMessage && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-4">
          <PriceInput
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required={true}
          />
        </div>
        {product.category !== "jasa" && (
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
        {/* <div className="order-7">
          <ProfilePhotoUploader/>
          <p>label</p>
          <div className="border border-black flex justify-between">
            <p>Upload Foto</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66852 4.86731C4.62212 4.82104 4.5853 4.76609 4.56016 4.70558C4.53501 4.64508 4.52204 4.58021 4.52199 4.51469C4.52193 4.44917 4.53479 4.38428 4.55982 4.32374C4.58486 4.26319 4.62159 4.20817 4.6679 4.16182L7.65672 1.16775C7.70298 1.12136 7.75794 1.08454 7.81844 1.05939C7.87895 1.03425 7.94381 1.02128 8.00933 1.02122C8.07485 1.02116 8.13974 1.03402 8.20029 1.05906C8.26084 1.08409 8.31586 1.12082 8.3622 1.16714L11.3563 4.15595C11.4499 4.24943 11.5026 4.37626 11.5027 4.50857C11.5028 4.64087 11.4504 4.7678 11.3569 4.86144C11.2634 4.95507 11.1366 5.00774 11.0043 5.00786C10.872 5.00797 10.745 4.95553 10.6514 4.86206L8.5094 2.72318L8.51403 8.00121C8.51415 8.13344 8.46173 8.2603 8.36831 8.35388C8.2749 8.44747 8.14813 8.50011 8.0159 8.50022C7.88367 8.50034 7.75681 8.44792 7.66322 8.3545C7.56964 8.26108 7.517 8.13432 7.51689 8.00209L7.51225 2.72406L5.374 4.86669C5.32774 4.91308 5.27278 4.94991 5.21228 4.97505C5.15178 5.00019 5.08691 5.01316 5.02139 5.01322C4.95587 5.01328 4.89098 5.00042 4.83043 4.97538C4.76988 4.95035 4.71487 4.91362 4.66852 4.86731ZM14.9959 8.4941L14.9994 12.4827C14.9997 12.7472 14.8948 13.0009 14.708 13.188C14.5212 13.3752 14.2676 13.4805 14.0032 13.4807L2.03738 13.4912C1.77292 13.4914 1.5192 13.3866 1.33204 13.1998C1.14487 13.0129 1.03959 12.7594 1.03936 12.4949L1.03586 8.50635C1.03563 8.24189 1.14046 7.98817 1.3273 7.801C1.51414 7.61384 1.76767 7.50856 2.03213 7.50832L6.27001 7.50461C6.33613 7.50455 6.39956 7.53076 6.44635 7.57747C6.49314 7.62417 6.51946 7.68756 6.51952 7.75367L6.51971 7.96931C6.52044 8.80754 7.2066 9.51366 8.04544 9.49735C8.43713 9.48949 8.81011 9.32827 9.0842 9.04834C9.35828 8.76841 9.5116 8.39211 9.51118 8.00034L9.51096 7.75105C9.51091 7.68493 9.53711 7.6215 9.58382 7.57471C9.63053 7.52792 9.69392 7.5016 9.76003 7.50154L13.9979 7.49783C14.2624 7.49759 14.5161 7.60243 14.7033 7.78926C14.8904 7.9761 14.9957 8.22964 14.9959 8.4941ZM12.5048 10.4906C12.5047 10.3427 12.4607 10.1981 12.3784 10.0752C12.2961 9.95229 12.1792 9.85654 12.0425 9.80005C11.9058 9.74357 11.7555 9.72889 11.6104 9.75787C11.4654 9.78686 11.3322 9.8582 11.2277 9.96288C11.1232 10.0676 11.0521 10.2009 11.0233 10.346C10.9946 10.4911 11.0095 10.6414 11.0663 10.778C11.123 10.9146 11.219 11.0314 11.342 11.1134C11.4651 11.1955 11.6097 11.2392 11.7576 11.2391C11.956 11.2389 12.1461 11.16 12.2862 11.0196C12.4264 10.8792 12.505 10.6889 12.5048 10.4906Z"
                fill="#1A1A1A"
              />
            </svg>
          </div>
        </div> */}
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
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
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
          actionButton_href="/product"
          actionButton_name="Menuju ke halaman produk"
        />
      )}
    </SidebarModal>
  );
};

export default NewProduct;
