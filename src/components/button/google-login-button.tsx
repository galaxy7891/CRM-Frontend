import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
// import { loginWithGoogle } from '@/redux/actions/authActions';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/redux/store';

const GoogleLoginButton = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // const handleLoginWithGoogle = () => {
  //   dispatch(loginWithGoogle());
  // };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      alert('Login berhasil!');
      console.log('Token Response:', tokenResponse);
    },
    onError: (error) => {
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
        src="/images/icons/google.svg"
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
