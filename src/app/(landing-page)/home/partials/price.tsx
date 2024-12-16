import React from "react";
import CardPriceLight from "./card-price-light";
import CardPriceDark from "./card-price-dark";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";
import Title from "@/components/landing-page/layout/title";

const Price = () => {
  return (
    <>
      <BgLightWhite>
        <Title>Harga yang ditawarkan</Title>
        <div className="grid gap-9 md:grid-cols-3">
          <CardPriceLight
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
          <CardPriceDark
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
          <CardPriceLight
            title="Bisnis"
            description="Cocok untuk perusahaan besar atau bisnis yang mengandalkan CRM sebagai inti dari operasional mereka."
            price="800.000"
            dataProduk="200"
            dataPelanggan="1000"
            dataPengguna="50"
          />
        </div>
      </BgLightWhite>
    </>
  );
};

export default Price;
