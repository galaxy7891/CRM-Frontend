"use client";

import DashboardCard from "@/components/layout/dashboard-card";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import React, { useState } from "react";
import ImageArticle from "./partials/image-article";
import TitleArticle from "./partials/title-article";
import SelectArticleStatus from "./partials/select-article-status";
import Editor from "@/components/novel-rich-text/editor/editor";

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

const NewArticle = () => {
  const [content, setContent] = useState<string>("");
  return (
    <>
      <HeaderWithBackButton title="Tambah Artikel" />
      <DashboardCard>
        <div className="grid grid-cols-12 gap-6">
          {/* Bagian Upload Foto */}
          <div className="col-span-12 lg:col-span-5">
            <ImageArticle />
          </div>

          {/* Bagian Input Judul Artikel */}
          <div className="col-span-12 lg:col-span-7 gap-4 flex flex-col justify-center">
            <TitleArticle
              label="Judul Artikel"
              required
              placeholder="Judul Artikel"
            />
            <SelectArticleStatus
              label="Status Artikel"
              // value=
              options={[
                { label: "Pilih Status Artikel", value: "", hidden: true },
                { label: "Terbit", value: "Terbit" },
                { label: "Draf", value: "Draf" },
              ]}
              // onChange={(e) => setLead({ ...lead, status: e.target.value })}
              required
            />
            <p className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Artikel
            </p>
            <Editor initialValue={defaultValue} onChange={setContent} />
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default NewArticle;
