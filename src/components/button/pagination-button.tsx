interface paginationButtonPropsTypes {
  last_page: number;
  current_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  perPage: number;
}
const PaginationButton: React.FC<paginationButtonPropsTypes> = ({
  last_page,
  current_page,
  prev_page_url,
  next_page_url,
  handlePrevPage,
  handleNextPage,
  perPage,
}) => {
  return (
    <div className="flex justify-center items-center">
      <button onClick={handlePrevPage} disabled={!prev_page_url}>
        <svg
          width="10"
          height="20"
          viewBox="0 0 16 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7255 1.8484L1.41543 11.6702C0.633709 12.4149 0.633709 13.6223 1.41543 14.367L1.44368 14.3939C2.2254 15.1386 3.49282 15.1386 4.27454 14.3939L14.5846 4.57211C15.3663 3.82741 15.3663 2.62001 14.5846 1.87532L14.5563 1.8484C13.7746 1.1037 12.5072 1.1037 11.7255 1.8484Z"
            fill="#A1A1A1"
          />
          <path
            d="M1.44368 11.6061L1.41543 11.633C0.633709 12.3777 0.633709 13.5851 1.41543 14.3298L11.7255 24.1516C12.5072 24.8963 13.7746 24.8963 14.5563 24.1516L14.5846 24.1247C15.3663 23.38 15.3663 22.1726 14.5846 21.4279L4.27454 11.6061C3.49282 10.8614 2.2254 10.8614 1.44368 11.6061Z"
            fill="#A1A1A1"
          />
        </svg>
      </button>
      <p className="dark:text-font-white text-xs md:text-base px-3">
        {current_page}
        {' / '} {last_page}
      </p>
      <button onClick={handleNextPage} disabled={!next_page_url}>
        <svg
          width="10"
          height="20"
          viewBox="0 0 16 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.27454 1.8484L14.5846 11.6702C15.3663 12.4149 15.3663 13.6223 14.5846 14.367L14.5563 14.3939C13.7746 15.1386 12.5072 15.1386 11.7255 14.3939L1.41543 4.57211C0.63371 3.82741 0.633711 2.62001 1.41543 1.87532L1.44368 1.8484C2.2254 1.1037 3.49282 1.1037 4.27454 1.8484Z"
            fill="#A1A1A1"
          />
          <path
            d="M14.5563 11.6061L14.5846 11.633C15.3663 12.3777 15.3663 13.5851 14.5846 14.3298L4.27454 24.1516C3.49282 24.8963 2.2254 24.8963 1.44368 24.1516L1.41543 24.1247C0.633712 23.38 0.633711 22.1726 1.41543 21.4279L11.7255 11.6061C12.5072 10.8614 13.7746 10.8614 14.5563 11.6061Z"
            fill="#A1A1A1"
          />
        </svg>
      </button>
      <p className="ps-3 font-custom text-font-black dark:text-font-white">
        {' '}
        {perPage} per halaman
      </p>
    </div>
  );
};

export default PaginationButton;
