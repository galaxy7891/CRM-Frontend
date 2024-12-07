import React from "react";
import ServiceCard from "../services/partials/service-card";
import CardLeft from "./card-left";

const AboutUs = () => {
  return (
    <div className="bg-light-white p-8">
      <div className="items-center justify-center">
        <ServiceCard
          title="Tentang LoyalCust"
          description='LoyalCust hadir dari gabungan kata "Loyal" dan "Customer," yang mencerminkan komitmen kami untuk membantu bisnis mempertahankan loyalitas pelanggan. Kami memahami bahwa pelanggan yang setia adalah aset berharga bagi pertumbuhan bisnis yang berkelanjutan. Melalui aplikasi CRM kami, LoyalCust membantu Anda memahami kebutuhan pelanggan lebih dalam, merancang strategi hubungan pelanggan yang tepat, dan meningkatkan efisiensi dalam pengelolaan hubungan pelanggan. Dengan pendekatan ini, LoyalCust bertujuan untuk memperkuat ikatan antara bisnis dan pelanggannya, sehingga Anda dapat mencapai pertumbuhan yang lebih cepat dan lebih efisien.'
          image="/images/login.png"
        />
        <CardLeft
          title="Pendiri"
          description="Randy Rahman Hussen, merupakan seorang financial planner sekaligus direktur operasional di Campus Data Media dan trainer Campus Digital Indonesia. Beliau juga seorang pengusaha yang menyediakan jasa laporan keuangan bagi para pelaku bisnis dengan brand akuntansionline.net, dan seorang pembicara UMKM di berbagai kegiatan workshop dan seminar di seluruh Indonesia."
          image="/images/pendiri.png"
        />
      </div>
    </div>
  );
};

export default AboutUs;
