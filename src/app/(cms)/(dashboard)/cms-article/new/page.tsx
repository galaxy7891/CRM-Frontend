import DashboardCard from "@/components/layout/dashboard-card";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import React from "react";
import ImageArticle from "./partials/image-article";
import TitleArticle from "./partials/title-article";
import SelectArticleStatus from "./partials/select-article-status";

const NewArticle = () => {
  return (
    <>
      <HeaderWithBackButton title="Tambah Artikel" />
      <DashboardCard>
        <div className="grid grid-cols-12 gap-6">
          {/* Bagian Upload Foto */}
          <div className="col-span-12 lg:col-span-5 flex justify-center items-center">
            <ImageArticle />
          </div>

          {/* Bagian Input Judul Artikel */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
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
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default NewArticle;
