import React from "react";
import Image from "next/image";
import TitleFooter from "./title-footer";
import ListFooter from "./list-footer";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-dark-navy p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-y-6 md:gap-x-8 ">
        {/* Logo & Slogan */}
        <div className="flex flex-col gap-y-5">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={188}
            height={40}
            priority
            className="height:auto width:auto"
          />
          <TitleFooter>
            Membangun Loyalitas, <br />
            Meningkatkan Hubungan
          </TitleFooter>
        </div>

        {/* Jelajah */}
        <div className="flex flex-col gap-y-3">
          <TitleFooter>Jelajah</TitleFooter>
          <ListFooter>
            <Link href="/home">Beranda</Link>
          </ListFooter>
          <ListFooter>
            <Link href="/services">Layanan</Link>
          </ListFooter>
          <ListFooter>
            <Link href="/about-us">Tentang Kami</Link>
          </ListFooter>
          <ListFooter>
            <Link href="/tutorials">Tutorial</Link>
          </ListFooter>
          <ListFooter>
            <Link href="/article">Blog Artikel</Link>
          </ListFooter>
        </div>

        {/* Lokasi */}
        <div className="flex flex-col gap-y-3">
          <TitleFooter>Lokasi</TitleFooter>
          <ListFooter>
            <Link
              href="https://maps.app.goo.gl/ZsA5A393DnPP5GFC7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>
                Tamansari Hills Residence <br />
                Blok B01 No.10, RT.02/RW.10, <br />
                Mangunharjo, <br />
                Kec. Banyumanik, <br />
                Kota Semarang, <br />
                Jawa Tengah 50272
              </p>
            </Link>
          </ListFooter>
        </div>
        {/* Ikuti */}
        <div className="flex flex-col gap-y-3">
          <TitleFooter>Ikuti</TitleFooter>
          <ListFooter>
            <Link
              href="https://www.instagram.com/campusdigital.id?igsh=bG03dWM0YmEyYzRn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
          </ListFooter>
          <ListFooter>
            <Link
              href="https://www.linkedin.com/company/campus-digital-indonesia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </Link>
          </ListFooter>
        </div>

        {/* Hubungi */}
        <div className="flex flex-col gap-y-3">
          <TitleFooter>Hubungi</TitleFooter>
          <ListFooter>loyalcust@gmail.com</ListFooter>
          <ListFooter>+62820202220</ListFooter>
        </div>
      </div>
      <hr className="h-px mt-11 w-full bg-font-white border-0 mx-auto"></hr>
      <p className="font-custom text-xs mt-5 text-font-white md:text-base font-normal ">
        Copyright ©2024 loyalcust. All right reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
