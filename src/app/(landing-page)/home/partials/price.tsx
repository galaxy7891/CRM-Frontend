import React from "react";
import CardPriceLight from "./card-price-light";
import CardPriceDark from "./card-price-dark";

const Price = () => {
  return (
    <div className="bg-light-white p-8">
        <p className="font-custom text-center mb-9 font-bold text-font-black text-xl lg:text-[32px]">Harga yang ditawarkan</p>
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
          price="700.000"
          dataProduk="500"
          dataPelanggan="500"
          dataPengguna="500"
          FontSize="text-lg"
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
              <p>Ideal untuk bisnis yang membutuhkan efisiensi lebih tinggi.</p>
            </>
          }
          price="700.000"
          dataProduk="1000"
          dataPelanggan="1000"
          dataPengguna="1000"
          FontSize="text-lg"
        />
        <CardPriceLight
          title="Bisnis"
          description="Cocok untuk perusahaan besar atau bisnis yang mengandalkan CRM sebagai inti dari operasional mereka."
          price="700.000"
          dataProduk="∞"
          dataPelanggan="∞"
          dataPengguna="∞"
          FontSize="text-3xl"
        />
      </div>
    </div>
  );
};

export default Price;
