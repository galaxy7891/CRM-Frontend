import FormHeader from '@/components/form/form-header';
import FailText from '@/components/status/fail-text';

interface SendEmailProps {
  email: string;
  step: number;
  setEmail: (email: string) => void;
  onNext: () => void;
  isLoading: boolean;
  isOnClick: boolean;
}

const SendEmail: React.FC<SendEmailProps> = ({
  step,
  email,
  setEmail,
  onNext,
  isLoading,
  isOnClick,
}) => {
  return (
    <div>
      <FormHeader
        title="Atur Ulang kata Sandi"
        subtitle="Masukkan Email"
        description="Silakan masukkan email anda untuk reset kata sandi"
        step={step}
        page_name="forget-password"
      />

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
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none  rounded-lg bg-light-white focus:border-dark-navy ${
          isOnClick && email == '' ? `error-fields` : 'border-font-gray'
        }`}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isOnClick && !email && <FailText message="Email tidak valid" />}

      <button
        onClick={onNext}
        disabled={isLoading}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md disabled:opacity-60 disabled:hover:shadow-none"
      >
        {isLoading ? 'Mengirim...' : 'Kirim'}
      </button>
    </div>
  );
};

export default SendEmail;
