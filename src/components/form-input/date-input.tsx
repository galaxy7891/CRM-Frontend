interface BirthdateProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Birthdate: React.FC<BirthdateProps> = ({ label, value, onChange }) => {
  return (
    <>
      <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
        {label}
      </label>
      <input
        type="date"
        className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:ring-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
        placeholder="Tanggal Lahir"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Birthdate;
