interface SidebarModalProps {
  children: React.ReactNode;
  onClose: () => void;
  SidebarModalTitle: string;
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  children,
  onClose,
  SidebarModalTitle,
}) => {
  return (
    <>
      <div
        onClick={onClose} // <-- Klik pada overlay akan menutup sidebar
        className="fixed inset-0 bg-black bg-opacity-50 z-50 " // <-- Overlay dengan warna hitam transparan
      />

      <div className="fixed rounded-lg md:rounded-none top-0 right-0 md:w-1/2 w-full h-full bg-light-white dark:bg-dark-darkGray shadow-lg z-[99] flex flex-col overflow-hidden ">
        <div className="top-0 py-4 px-4">
          <div className="flex">
            <button onClick={onClose}>
              <svg
                width="17"
                height="29"
                viewBox="0 0 17 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-font-black dark:fill-font-white"
              >
                <path d="M12.4583 1.51765L1.50389 12.5722C0.673316 13.4104 0.673316 14.7693 1.50389 15.6075L1.53391 15.6378C2.36449 16.4759 3.71112 16.4759 4.5417 15.6378L15.4961 4.58323C16.3267 3.74505 16.3267 2.38611 15.4961 1.54794L15.4661 1.51765C14.6355 0.679481 13.2889 0.679481 12.4583 1.51765Z" />
                <path d="M1.53391 12.4999L1.50389 12.5302C0.673316 13.3684 0.673316 14.7273 1.50389 15.5655L12.4583 26.62C13.2889 27.4582 14.6355 27.4582 15.4661 26.62L15.4961 26.5898C16.3267 25.7516 16.3267 24.3926 15.4961 23.5545L4.5417 12.4999C3.71112 11.6617 2.36449 11.6617 1.53391 12.4999Z" />
              </svg>
            </button>
            <h2 className="md:text-2xl text-base font-medium text-font-black dark:text-font-white ps-2">
              {SidebarModalTitle}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default SidebarModal;
