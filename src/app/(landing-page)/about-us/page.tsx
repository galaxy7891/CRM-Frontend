import React from 'react';
import AboutLoyalCust from './about-loyalcust';
import CardLeft from './ceo';
import BgLightWhite from '@/components/landing-page/layout/bg-light-white';

const AboutUs = () => {
  return (
    <>
      <BgLightWhite>
        <div className="flex flex-col items-center justify-center gap-6">
          <AboutLoyalCust
            title="Tentang LoyalCust"
            description={
              <div className="text-justify">
                <p>
                  LoyalCust hadir dari gabungan kata &quot;Loyal&quot; dan
                  &quot;Customer,&quot; yang mencerminkan komitmen kami untuk
                  membantu bisnis mempertahankan loyalitas pelanggan. Kami
                  memahami bahwa pelanggan yang setia adalah aset berharga bagi
                  pertumbuhan bisnis yang berkelanjutan.
                </p>
                <p className="mt-5">
                  Melalui aplikasi CRM kami, LoyalCust membantu Anda memahami
                  kebutuhan pelanggan lebih dalam, merancang strategi hubungan
                  pelanggan yang tepat, dan meningkatkan efisiensi dalam
                  pengelolaan hubungan pelanggan. Dengan pendekatan ini,
                  LoyalCust bertujuan untuk memperkuat ikatan antara bisnis dan
                  pelanggannya, sehingga Anda dapat mencapai pertumbuhan yang
                  lebih cepat dan lebih efisien.
                </p>
              </div>
            }
            image="/images/about-us.png"
          />

          <CardLeft
            title="Pendiri"
            description='Randy Rahman Hussen, merupakan Direktur Operasional dari PT. Campus Data Media. Dengan sebuah Visi besar untuk "Menjadi platform terdepan dalam manajemen hubungan pelanggan yang memberdayakan bisnis lokal untuk membangun  hubungan yang kuat dan berkelanjutan dengan pelanggan mereka." '
            image="/images/randy.png"
          />
        </div>
      </BgLightWhite>
    </>
  );
};

export default AboutUs;
