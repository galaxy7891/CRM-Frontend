import Image from 'next/image';
import BackButton from '@/components/button/back-button';

interface EmailSendProps {
  handleSendEmail: () => void;
  handleBackButton: () => void;
}
const EmailSend: React.FC<EmailSendProps> = ({
  handleSendEmail,
  handleBackButton,
}) => {
  const email = localStorage.getItem('email');

  return (
    <div className="flex flex-col justify-center items-center  ">
      <Image
        src={'icons/Clock.svg'}
        width={130}
        height={130}
        alt="clock"
      ></Image>

      <h2 className="text-black dark:text-white font-bold text-lg md:text-2xl ">
        Verifikasi Email
      </h2>

      <p className="text-black dark:text-white text-xs md:text-base w-1/2 mt-5 text-center ">
        Periksa email {email} untuk melakkan verifikasi Jika tidak menerima
        pesan selama 3 menit.{' '}
        <span
          className="text-xs md:text-base font-bold text-dark-gold hover:underline"
          onClick={handleSendEmail}
        >
          Kirim Ulang
        </span>
      </p>
      <div className="w-1/3 mt-3">
        <BackButton onClick={handleBackButton}>Kembali</BackButton>
      </div>
    </div>
  );
};

export default EmailSend;
