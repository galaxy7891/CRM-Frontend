const FileInput = ({ value }: { value: string }) => {
  return (
    <input
      type="text"
      value={value}
      disabled
      className=" p-2  mt-4 flex-1 rounded-lg  border-font-gray text-start text-xs md:text-base  bg-light-white w-full border-2"
    />
  );
};

export default FileInput;
