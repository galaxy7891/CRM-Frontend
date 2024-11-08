import FormHeader from '@/components/layout/auth-form-header';
import Image from 'next/image';
interface SendStatusProps {
  step: number;
  onBack: () => void;
}

const sendStatus: React.FC<SendStatusProps> = ({ step, onBack }) => {
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
          src="/icons/Clock.svg"
          alt="Gambar di Kolom Kiri"
          width={150}
          height={150}
        />
      </div>
      <button
        className=" mt-2 bg-white w-full px-1 h-12 lg:h-15  flex items-center font-bold justify-center border-2 text-light-gold border-dark-gold py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
        onClick={onBack}
      >
        Kembali
      </button>
    </div>
  );
};

export default sendStatus;
