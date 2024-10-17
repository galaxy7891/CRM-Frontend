"use client";

import { FC } from "react";
import Card from "../../../components/homepage/card-activity";
import CurrentDate from "@/components/homepage/current-date";
import Greeting from "@/components/homepage/greetings";
import CardDeals from "@/components/homepage/card-pipeline";

const Dashboard: FC = () => {
  return (
    <div className="grid grid-rows-2 min-h-screen">
      {/* Card Atas */}
      <div className="p-4">
        <div className="bg-font-white shadow-lg rounded-lg p-6 h-full">
          <div className="grid grid-rows-1 w-full h-full">
            {/* Aktivitas Section */}
            <section className="row-span-1 space-y-6 h-full">
              <CurrentDate />
              <Greeting username="user" />
              <p className="text-sm lg:text-2xl font-custom text-font-black font-medium">
                Aktivitas
              </p>
              <p className="text-[10px] lg:text-base font-custom text-font-black">
                Aktivitas kamu selama seminggu
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card title="Leads" count={0} link="/leads" />
                <Card title="Kontak" count={0} link="/contact" />
                <Card title="Perusahaan" count={0} link="/company" />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Card Bawah */}
      <div className="p-4">
        <div className="bg-font-white shadow-lg rounded-lg p-6 h-full">
          <div className="grid grid-rows-1 w-full h-full">
            <section className="row-span-1 space-y-4 h-full">
              {/* Flex container untuk teks dan button */}
              <div className="flex justify-between items-center">
                <p className="font-custom text-font-black font-medium lg:text-2xl text-sm">
                  Deals Pipeline
                </p>
                {/* Tombol di pojok kanan */}
                <button className="bg-light-gold hover:opacity-80 transition-opacity duration-200 hover:shadow-md text-font-brown text-base font-medium py-1 px-4 lg:text-sm lg:py-3 lg:px-6 rounded-xl">
                  Detail
                </button>
              </div>

              <p className="font-custom text-font-black lg:text-base text-[10px]">
                Aktivitas kamu selama seminggu
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardDeals title="Kualifikasi" count={1000} total="40" />
                <CardDeals title="Proposal" count={100} total="40" />
                <CardDeals title="Negosiasi" count={100} total="40" />
                <CardDeals title="Tercapai" count={1000} total="40" />
                <CardDeals title="Gagal" count={1000} total="40" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
