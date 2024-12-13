const AuthInput = ({
  label,
  placeholder,
  value,
  required,
  type,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label className="block text-black text-xs font-custom font-medium my-3 md:text-base">
        {label}
      </label>
      <input
        autoComplete={type}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
      />
    </>
  );
};

export default AuthInput;
