import DashboardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import React from 'react';
import LightCard from './partials/light-card';
import DarkCard from './partials/dark-card';

const UpgradeLoyalCust = () => {
  return (
    <div>
      <HeaderWithBackButton title="Tingkatkan CRM" />
      <div>
        <DashboardCard>
          <div className="grid gap-9 lg:grid-cols-3">
            <LightCard
              title="Regular"
              description={
                <>
                  <p>Cocok untuk usaha kecil dan menengah.</p>
                  <br />
                  <p>Kelola data pelanggan dan tindak lanjut dengan mudah.</p>
                </>
              }
              price="300.000"
              dataProduk="50"
              dataPelanggan="100"
              dataPengguna="10"
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
              price="500.000"
              dataProduk="100"
              dataPelanggan="500"
              dataPengguna="25"
            />
            <LightCard
              title="Bisnis"
              description="Cocok untuk perusahaan besar atau bisnis yang mengandalkan CRM sebagai inti dari operasional mereka."
              price="800.000"
              dataProduk="200"
              dataPelanggan="1000"
              dataPengguna="50"
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default UpgradeLoyalCust;
