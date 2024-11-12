import Section from "@/components/tnc";
import React from "react";

const TermCondition = () => {
  return (
    <div>
      <p className="font-custom text-font-black font-medium text-2xl">
        Syarat dan Ketentuan Penggunaan Website LoyalCust
      </p>
      <p>
      Selamat datang di website CRM LoyalCust! Dengan mengakses atau menggunakan layanan website ini, Anda setuju untuk terikat dengan syarat dan ketentuan berikut:
      </p>
      <Section
        title="1. Definisi"
        items={[
          "Website: Platform CRM online yang diakses melalui alamat yang kami sediakan, termasuk seluruh konten, fungsionalitas, layanan, dan perangkat lunak terkait.",
          "Pengguna: Individu, organisasi, atau entitas lain yang mendaftar dan/atau menggunakan layanan di website CRM ini.",
          "Layanan: Sistem manajemen hubungan pelanggan (CRM) yang menyediakan berbagai fitur untuk mengelola, memonitor, dan mengoptimalkan hubungan pelanggan.",
          "Akun: Informasi pengguna yang terdiri dari identitas unik dan kata sandi yang dibutuhkan untuk mengakses layanan di website.",
        ]}
      />
    </div>
  );
};

export default TermCondition;
