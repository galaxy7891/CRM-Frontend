import React from "react";
import ServiceCard from "./partials/service-card";
import CardLeft from "../about-us/card-left";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";

const Services = () => {
  return (
    <>
      <BgLightWhite>
        <div className="flex flex-col items-center justify-center gap-6">
          <ServiceCard
            title="Manajemen Pelanggan"
            description="Fitur Leads kami memberikan kemudahan untuk membantu Anda mengelola setiap prospek dari awal hingga akhir. Dari pengumpulan hingga konversi, fitur ini memastikan Anda tidak melewatkan satu pun kesempatan untuk menjadikan prospek sebagai pelanggan setia."
            image="/images/manajemen-pelanggan.png"
          />
          <CardLeft
            title="Manajemen Deals"
            description="Fitur Deals kami memungkinkan Anda mengelola, memonitor, dan mempercepat penutupan transaksi dengan lebih mudah. Lacak progres setiap prospek dan ambil keputusan tepat waktu. Tingkatkan produktivitas dan raih hasil optimal dengan pengelolaan deals yang lebih terstruktur."
            image="/images/manajemen-deals.png"
          />
          <ServiceCard
            title="Manajemen Produk"
            description="Tidak perlu lagi repot mencari data produk. Fitur managemen produk kami memungkinkan Anda menyimpan seluruh informasi produk di satu dashboard, sehingga Anda bisa mengakses detail produk kapan saja. Atur, ubah, dan perbarui katalog produk dengan cepat untuk mendukung tim penjualan Anda."
            image="/images/manajemen-produk.png"
          />
        </div>
      </BgLightWhite>
    </>
  );
};

export default Services;
