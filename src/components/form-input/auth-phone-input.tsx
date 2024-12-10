const AuthPhoneInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label
        htmlFor="phone"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Nomor Telepon
      </label>
      <div
        className={`flex items-center border-2 border-font-gray rounded-lg bg-light-white 'border-font-gray `}
      >
        {/* Country Code */}
        <div
          className={`bg-gray-100 px-3 py-2 text-black text-opacity-50 border-r border-font-gray `}
        >
          +62
        </div>

        {/* Phone Input */}
        <input
          required
          name="phone"
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="888xxxxx"
          className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom bg-light-white text-black border-none focus:outline-none focus:border-dark-navy rounded-r-lg  
             `}
        />
      </div>
    </>
  );
};

export default AuthPhoneInput;
