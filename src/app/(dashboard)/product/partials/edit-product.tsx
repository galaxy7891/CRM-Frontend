"use client";

import React, { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { productsTypes, editProductsPropsTypes } from "@/types/productTypes";
import { updateProduct } from "@/redux/actions/productsActions";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import TextArea from "@/components/form-input/text-area-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import FailText from "@/components/status/fail-text";
import PriceInput from "@/components/form-input/price-input";
import SuccessModal from "@/components/status/success-modal";

const EditProduct: React.FC<editProductsPropsTypes> = ({
  onClose,
  productProps,
}) => {
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [product, setProduct] = useState<productsTypes>(productProps);

  const dispatch = useDispatch<AppDispatch>();

  const handleEditProduct = () => {
    console.log("Data produk yang akan disimpan:", product);
    dispatch(updateProduct(product, setIsSuccess, setErrorMessage));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Produk">
      <form className="flex-grow ">
        <div className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
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
            {errorMessage && <FailText>{errorMessage.name}</FailText>}
          </div>
          <div className="order-3">
            <SelectInput
              label="Kategori Produk"
              value={product.category}
              options={[
                { label: 'Kategori Produk', value: '', hidden: true },
                { label: 'jasa', value: 'jasa' },
                { label: 'barang', value: 'barang' },
              ]}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            />
            {errorMessage && <FailText>{errorMessage.category}</FailText>}
          </div>
          <div className="order-4">
            <PriceInput
              label="Harga Produk"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required={true}
            />
            {errorMessage && <FailText>{errorMessage.price}</FailText>}
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
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleEditProduct}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data produk berhasil diubah"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_action={() => onClose()}
        />
      )}
    </SidebarModal>
  );
};

export default EditProduct;
