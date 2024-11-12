import Image from 'next/image';

interface paginationButtonPropsTypes {
  last_page: number;
  current_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}
const PaginationButton: React.FC<paginationButtonPropsTypes> = ({
  last_page,
  current_page,
  prev_page_url,
  next_page_url,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="flex justify-center ">
      <button onClick={handlePrevPage} disabled={!prev_page_url}>
        <Image
          src="/icons/pagination/prev-icon.svg"
          alt="prev"
          width={10}
          height={10}
        />
      </button>
      <p className="dark:text-white text-xs md:text-base px-4">
        {current_page}
        {' / '} {last_page}
      </p>
      <button onClick={handleNextPage} disabled={!next_page_url}>
        <Image
          src="/icons/pagination/next-icon.svg"
          alt="next"
          width={10}
          height={10}
        />
      </button>
      <p className="dark:text-white text-xs md:text-base ps-4">
        10 per halaman
      </p>
    </div>
  );
};

export default PaginationButton;
