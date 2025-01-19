import Image from 'next/image';

const SearchBar = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div className="col-span-12 md:col-span-4 relative">
        {' '}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image
            src="/images/icons/table/search.svg"
            alt="search icon"
            width={20}
            height={20}
            className="w-[12px] h-[12px] lg:w-[20px] lg:h-[20px]"
          />
        </div>
        <input
          type="text"
          placeholder="Cari Leads"
          className="pl-10 p-2 border-2 font-custom text-xs 
                    lg:text-base border-font-gray bg-light-white rounded-[10px] 
                    focus:outline-none  dark:bg-dark-darkGray w-full text-black dark:text-font-white"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
