import Image from 'next/image';
import BackButton from '@/components/button/back-button';
import DashboardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';

interface EmailSendProps {
  handleSendEmail: () => void;
  handleBackButton: () => void;
  isLoading: boolean;
}
const EmailSend: React.FC<EmailSendProps> = ({
  handleSendEmail,
  handleBackButton,
  isLoading,
}) => {
  return (
    <>
      <HeaderWithBackButton title="Lupa Kata Sandi" />
      <DashboardCard>
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
            Periksa email anda untuk melakkan verifikasi Jika tidak menerima
            pesan selama 3 menit.{' '}
            <span
              className="text-xs md:text-base font-bold text-dark-gold hover:underline cursor-pointer"
              onClick={handleSendEmail}
            >
              {isLoading ? 'Mengirim Ulang...' : 'Kirim Ulang'}
            </span>
          </p>
          <div className="w-1/3 mt-3">
            <BackButton onClick={handleBackButton}>Kembali</BackButton>
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default EmailSend;
