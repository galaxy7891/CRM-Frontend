import Asterisk from "../status/required-asterisk";

interface BirthdateProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<BirthdateProps> = ({
  label,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="flex-1">
      <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
        {label}
        {required && <Asterisk />}
      </label>
      <input
        type="date"
        className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:ring-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
        placeholder="Tanggal Lahir"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateInput;
