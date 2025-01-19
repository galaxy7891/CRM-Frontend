import Image from 'next/image';
import { SendStatusForgotPasswordProps } from '@/types/profileTypes';
import FormHeader from '@/components/layout/auth-form-header';
import BackButton from '@/components/button/back-button';

const sendStatus: React.FC<SendStatusForgotPasswordProps> = ({
  step,
  onBack,
}) => {
  return (
    <div>
      <FormHeader
        title="Atur Ulang kata Sandi"
        subtitle="Verifikasi"
        description="Periksa email anda, jika tidak menerima dalam 15 menit, pastikan email yang dimasukkan benar"
        step={step}
        page_name="forget-password"
      />
      <div className="flex justify-center">
        <Image
          src="/images/icons/Clock.svg"
          alt="Gambar di Kolom Kiri"
          width={150}
          height={150}
        />
      </div>
      <BackButton onClick={onBack}>Kembali</BackButton>
    </div>
  );
};

export default sendStatus;
