import DashboardCard from "@/components/layout/dashboard-card";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import React from "react";
import LightCard from "./partials/light-card";
import DarkCard from "./partials/dark-card";

const UpgradeLoyalCust = () => {
  return (
    <div>
      <HeaderWithBackButton title="Tingkatkan CRM" />
      <div>
        <DashboardCard>
          <div className="grid gap-9 md:grid-cols-3">
            <LightCard
              title="Regular"
              description={
                <>
                  <p>Cocok untuk usaha kecil dan menengah.</p>
                  <br />
                  <p>Kelola data pelanggan dan tindak lanjut dengan mudah.</p>
                </>
              }
              price="700.000"
              dataProduk="500"
              dataPelanggan="500"
              dataPengguna="500"
              FontSize="text-lg"
            />
            <DarkCard
              title="Profesional"
              description={
                <>
                  <p>
                    Cocok untuk bisnis yang ingin lebih dari sekadar manajemen
                    kontak dasar.
                  </p>
                  <br />
                  <p>
                    Ideal untuk bisnis yang membutuhkan efisiensi lebih tinggi.
                  </p>
                </>
              }
              price="700.000"
              dataProduk="1000"
              dataPelanggan="1000"
              dataPengguna="1000"
              FontSize="text-lg"
            />
            <LightCard
              title="Bisnis"
              description="Cocok untuk perusahaan besar atau bisnis yang mengandalkan CRM sebagai inti dari operasional mereka."
              price="700.000"
              dataProduk="∞"
              dataPelanggan="∞"
              dataPengguna="∞"
              FontSize="text-3xl"
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default UpgradeLoyalCust;
