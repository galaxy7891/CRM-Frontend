import FormHeader from '@/components/form/form-header';
import FailPopUp from '@/components/pop-up/fail';

interface SendEmailProps {
  email: string;
  step: number;
  setEmail: (email: string) => void;
  onNext: () => void;
  validation: any;
}

const SendEmail: React.FC<SendEmailProps> = ({
  step,
  email,
  setEmail,
  onNext,
  validation,
}) => {
  return (
    <div>
      <FormHeader
        logoText="Logo"
        title="Atur Ulang kata Sandi"
        subtitle="Masukkan Email"
        description="Silakan masukkan email anda untuk reset kata sandi"
        step={step}
        step1_name="Email"
        step2_name="Verifikasi"
        step3_name="Ubah Sandi"
      />
      {validation && <FailPopUp message={validation} />}

      <label
        htmlFor="email"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Email
      </label>
      <input
        value={email}
        type="email"
        placeholder="user@example.com"
        required={true}
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={onNext}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        Kirim
      </button>
    </div>
  );
};

export default SendEmail;
