'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MENU } from '@/constants/page';
import Image from 'next/image';
import useTheme from '../dark-mode';
import SidebarModal from '@/components/layout/sidebar-modal';
import NewLeads from '../../app/(dashboard)/(customer)/leads/partials/new-leads';

// import NewContact from '../../app/(dashboard)/(customer)/contact/partials/new-contact';
// import NewCompany from '../../app/(dashboard)/(customer)/company/partials/new-company';

const HeaderCustomer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    { title: string; description?: string } | undefined
  >(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
  const { isDarkMode } = useTheme();
  const [emailLocal, setEmailLocal] = useState<string>('');

  const toggleTooltip = () => setIsTooltipVisible(!isTooltipVisible);

  const handleAddDataClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setEmailLocal(localStorage.getItem('email') || '');

    let matchedPage: { title: string; description?: string } | undefined =
      undefined;

    MENU.forEach((menuItem) => {
      if (menuItem.link === pathName) {
        matchedPage = {
          title: menuItem.title,
          description: menuItem.description,
        };
      }
      if (menuItem.subItems) {
        const matchedSubItem = menuItem.subItems.find(
          (subItem) => subItem.link === pathName
        );
        if (matchedSubItem) {
          matchedPage = {
            title: matchedSubItem.title,
            description: matchedSubItem.description,
          };
        }
      }
    });

    setCurrentPage(matchedPage);
  }, [pathName]);

  return (
    <div className="relative">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base lg:text-3xl font-custom text-font-black dark:text-font-white">
            {currentPage ? currentPage.title : 'Page'}
          </p>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center lg:hidden"
              onClick={toggleTooltip}
            >
              <Image
                key={isDarkMode ? 'dark-mode-icon' : 'light-mode-icon'}
                src={
                  isDarkMode
                    ? '/icons/header/info-off.svg'
                    : '/icons/table/tooltip-off.svg'
                }
                alt="info-off"
                width={24}
                height={24}
                className="h-3 w-3 lg:h-6 lg:w-6"
              />
            </button>

            <button
              type="button"
              className="hidden lg:flex items-center justify-center"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <Image
                key={isTooltipVisible ? 'tooltip-visible' : 'tooltip-hidden'}
                src={
                  isTooltipVisible
                    ? isDarkMode
                      ? '/icons/header/info-on.svg'
                      : '/icons/table/tooltip-on.svg'
                    : isDarkMode
                    ? '/icons/header/info-off.svg'
                    : '/icons/table/tooltip-off.svg'
                }
                alt="info-icon"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </button>

            {currentPage?.description && isTooltipVisible && (
              <div
                id="tooltip-bottom"
                role="tooltip"
                className="mx-auto absolute left-1/2 transform -translate-x-1/2 mt-2 w-60 max-w-xs p-2 border bg-light-white border-font-grayLight text-dark-navy text-xs text-start rounded-md shadow-lg transition-opacity duration-300 z-10"
              >
                {currentPage.description}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-light-white"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold">
            Impor Data
          </button>
          <button
            onClick={handleAddDataClick}
            className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
          >
            Tambah Data
          </button>
        </div>
      </header>

      {isModalOpen && (
        <SidebarModal
          onClose={handleCloseModal}
          SidebarModalTitle={currentPage?.title ?? 'Tambah Data'}
        >
          {pathName === '/leads' && (
            <NewLeads onClose={handleCloseModal} emailLocal={emailLocal} />
          )}
          {/* {pathName === '/contact' && <NewContact onClose={handleCloseModal} />} */}
          {/* {pathName === '/company' && <NewCompany onClose={handleCloseModal} />} */}
        </SidebarModal>
      )}
    </div>
  );
};

export default HeaderCustomer;
