import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Tampilkan alert jika login berhasil
      alert('Login berhasil!');
      console.log('Token Response:', tokenResponse);
    },
    onError: (error) => {
      // Tampilkan alert jika login gagal
      alert('Login gagal! Coba lagi.');
      console.log('Error:', error);
    },
  });

  return (
    <button
      type="submit"
      onClick={() => login()}
      className="bg-white w-full px-1 h-12 lg:h-15 flex items-center justify-center border border-dark-blue py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
    >
      <Image
        src="/icons/google.svg"
        alt="Google"
        width={14}
        height={14}
        className="mr-2"
      />
      <span className="font-custom text-dark-blue text-xs md:text-base font-bold ">
        Masuk menggunakan Google
      </span>
    </button>
  );
};

export default GoogleLoginButton;
