import React from "react";
import HeaderChangePassword from "./header-change-pass";

const NewPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>stepper</div>
      <HeaderChangePassword
        imageSrc="/icons/change-pass.svg"
        title="Ubah Kata Sandi"
        description="Masukkan kata sandi yang baru"
      />
      {/* Form password yang mirip di auth => label 1 : Masukkan kata Sandi baru; label 2 : Konfirmasi kata Sandi (pake yang ada minimal 8 huruf)*/}
    </div>
  );
};

export default NewPassword;
