import React from "react";
import MenuProps from "./menu-props";

const Menu = () => {
  return (
    <div className="flex flex-col gap-y-6 md:flex-row md:flex-wrap md:gap-x-6">
      <MenuProps href="/home" title="Beranda" />
      <MenuProps href="/services" title="Layanan" />
      <MenuProps href="/about-us" title="Tentang Kami" />
      <MenuProps href="/tutorials" title="Tutorial" />
      <MenuProps href="/article" title="Blog Artikel" />
    </div>
  );
};

export default Menu;
