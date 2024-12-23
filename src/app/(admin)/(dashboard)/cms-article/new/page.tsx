"use client";

import { useDispatch } from "react-redux";
import { addArticle } from "@/redux/actions/CMSActions";
import { AppDispatch } from "@/redux/store";
import DashboardCard from "@/components/layout/dashboard-card";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import React, { useState, useRef, useEffect } from "react";
import ImageArticle from "../partials/image-article";
import TitleArticle from "../partials/title-article";
import SelectArticleStatus from "../partials/select-article-status";
import { articleTypes } from "@/types/CMSTypes";
import SuccessModal from "@/components/status/success-modal";
import FailText from "@/components/status/fail-text";

const NewArticle = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [article, setArticle] = useState<articleTypes>({
    title: "",
    status: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const trixRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleAddArticle = () => {
    dispatch(
      addArticle(article, content, photo, setIsSuccess, setErrorMessage)
    );
  };

  useEffect(() => {
    const trixElement = trixRef.current;

    const handleTrixChange = (event: TrixEditorEvent) => {
      const htmlContent = event.target.innerHTML;
      setContent(htmlContent);
      console.log("Updated Content:", htmlContent);
    };

    if (trixElement) {
      trixElement.addEventListener(
        "trix-change",
        handleTrixChange as EventListener
      );
    }

    return () => {
      if (trixElement) {
        trixElement.removeEventListener(
          "trix-change",
          handleTrixChange as EventListener
        );
      }
    };
  }, []);

  return (
    <>
      <HeaderWithBackButton title="Tambah Artikel" />
      <DashboardCard>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <ImageArticle onChange={handleFileChange} preview={preview} />
            {errorMessage && <FailText>{errorMessage.photo_article}</FailText>}
          </div>

          <div className="col-span-12 lg:col-span-7 gap-4 flex flex-col justify-center">
            <TitleArticle
              label="Judul Artikel"
              required
              placeholder="Judul Artikel"
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
            {errorMessage && <FailText>{errorMessage.title}</FailText>}
            <SelectArticleStatus
              label="Status Artikel"
              value={article.status}
              options={[
                { label: "Pilih Status Artikel", value: "", hidden: true },
                { label: "Terbit", value: "Terbit" },
                { label: "Draf", value: "Draf" },
              ]}
              onChange={(e) =>
                setArticle({ ...article, status: e.target.value })
              }
              required
            />
            {errorMessage && <FailText>{errorMessage.status}</FailText>}
            <p className="block text-xs md:text-base font-custom text-font-black dark:text-font-white pb-2">
              Artikel
            </p>
            <form>
              <input type="hidden" id="body" name="body" />
              <trix-editor ref={trixRef} input="body"></trix-editor>
            </form>
            {errorMessage && <FailText>{errorMessage.description}</FailText>}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddArticle}
                className="sm:py-3 sm:px-16 py-3 px-12 bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
              >
                Tambah
              </button>
            </div>
          </div>
          {isSuccess && (
            <SuccessModal
              header="Berhasil"
              description="Artikel berhasil ditambahkan"
              actionButton_href="/cms-article"
              actionButton_name="Kembali ke Halaman Artikel"
            />
          )}
        </div>
      </DashboardCard>
    </>
  );
};

export default NewArticle;
