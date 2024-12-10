const AuthDropDownInput = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string; hidden?: boolean }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <label
        htmlFor="job_position"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        {label}
      </label>
      <select
        required
        name="job_position"
        value={value}
        onChange={onChange}
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy ${
          value === '' ? 'text-gray-500' : 'text-black'
        }`}
      >
        {options.map((option) => (
          <option
            className="max-h-12 bg-white"
            key={option.value}
            value={option.value}
            hidden={option.hidden}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default AuthDropDownInput;
