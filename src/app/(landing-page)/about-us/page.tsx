import React from "react";
import ServiceCard from "../services/partials/service-card";
import CardLeft from "./card-left";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";

const AboutUs = () => {
  return (
    <>
      <BgLightWhite>
        <div className="items-center justify-center">
          <ServiceCard
            title="Tentang LoyalCust"
            description='LoyalCust hadir dari gabungan kata "Loyal" dan "Customer," yang mencerminkan komitmen kami untuk membantu bisnis mempertahankan loyalitas pelanggan. Kami memahami bahwa pelanggan yang setia adalah aset berharga bagi pertumbuhan bisnis yang berkelanjutan. Melalui aplikasi CRM kami, LoyalCust membantu Anda memahami kebutuhan pelanggan lebih dalam, merancang strategi hubungan pelanggan yang tepat, dan meningkatkan efisiensi dalam pengelolaan hubungan pelanggan. Dengan pendekatan ini, LoyalCust bertujuan untuk memperkuat ikatan antara bisnis dan pelanggannya, sehingga Anda dapat mencapai pertumbuhan yang lebih cepat dan lebih efisien. Dibuat berdasarkan riset kebutuhan para pelaku bisnis dalam mengelola pelanggan yang berkualitas'
            image="/images/login.png"
          />
          <CardLeft
            title="Pendiri"
            description='Randy Rahman Hussen, merupakan Direktur Operasional dari PT. Campus Data Media. Dengan sebuah Visi besar untuk "Menjadi platform terdepan dalam manajemen hubungan pelanggan yang memberdayakan bisnis lokal untuk membangun  hubungan yang kuat dan berkelanjutan dengan pelanggan mereka." '
            image="/images/pendiri.png"
          />
        </div>
      </BgLightWhite>
    </>
  );
};

export default AboutUs;
