'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MENU } from '@/constants/page';
import SidebarModal from '@/components/layout/sidebar-modal';
import NewLeads from '../../app/(dashboard)/(customer)/leads/partials/new-leads';
import NewContact from '../../app/(dashboard)/(customer)/contacts/partials/new-contact';
import NewCompany from '../../app/(dashboard)/(customer)/companies/partials/new-company';

const HeaderCustomer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    { title: string; description?: string } | undefined
  >(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
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

  // Cek apakah path saat ini adalah halaman detail leads
  const isDetailPage = /^\/(leads|contacts|companies)\/.+$/.test(pathName);

  // Jika berada di halaman detail leads, jangan render HeaderCustomer
  if (isDetailPage) {
    return null;
  }

  return (
    <div className="relative mb-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base lg:text-3xl font-custom text-font-black dark:text-font-white">
            {currentPage ? currentPage.title : 'Page'}
          </p>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center lg:hidden "
              onClick={toggleTooltip}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-font-black dark:fill-font-white"
              >
                <path d="M11.25 18.75H13.75V11.25H11.25V18.75ZM12.5 8.74999C12.8542 8.74999 13.1512 8.62999 13.3912 8.38999C13.6312 8.14999 13.7508 7.85333 13.75 7.49999C13.7492 7.14666 13.6292 6.85 13.39 6.61C13.1508 6.37 12.8542 6.25 12.5 6.25C12.1458 6.25 11.8492 6.37 11.61 6.61C11.3708 6.85 11.2508 7.14666 11.25 7.49999C11.2492 7.85333 11.3692 8.15041 11.61 8.39124C11.8508 8.63208 12.1475 8.75166 12.5 8.74999ZM12.5 25C10.7708 25 9.14583 24.6717 7.625 24.015C6.10416 23.3583 4.78125 22.4679 3.65625 21.3437C2.53125 20.2196 1.64083 18.8967 0.985001 17.375C0.329168 15.8533 0.000834915 14.2283 1.58228e-06 12.5C-0.00083175 10.7717 0.327501 9.14666 0.985001 7.625C1.6425 6.10333 2.53292 4.78041 3.65625 3.65625C4.77958 2.53208 6.1025 1.64167 7.625 0.984999C9.1475 0.328333 10.7725 0 12.5 0C14.2275 0 15.8525 0.328333 17.375 0.984999C18.8975 1.64167 20.2204 2.53208 21.3437 3.65625C22.4671 4.78041 23.3579 6.10333 24.0162 7.625C24.6746 9.14666 25.0025 10.7717 25 12.5C24.9975 14.2283 24.6692 15.8533 24.015 17.375C23.3608 18.8967 22.4704 20.2196 21.3437 21.3437C20.2171 22.4679 18.8942 23.3587 17.375 24.0162C15.8558 24.6737 14.2308 25.0016 12.5 25Z" />
              </svg>
            </button>
            <button
              type="button"
              className="hidden lg:flex items-center justify-center"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <svg
                key={isTooltipVisible ? 'tooltip-visible' : 'tooltip-hidden'}
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-font-black dark:fill-font-white"
              >
                <path d="M11.25 18.75H13.75V11.25H11.25V18.75ZM12.5 8.74999C12.8542 8.74999 13.1512 8.62999 13.3912 8.38999C13.6312 8.14999 13.7508 7.85333 13.75 7.49999C13.7492 7.14666 13.6292 6.85 13.39 6.61C13.1508 6.37 12.8542 6.25 12.5 6.25C12.1458 6.25 11.8492 6.37 11.61 6.61C11.3708 6.85 11.2508 7.14666 11.25 7.49999C11.2492 7.85333 11.3692 8.15041 11.61 8.39124C11.8508 8.63208 12.1475 8.75166 12.5 8.74999ZM12.5 25C10.7708 25 9.14583 24.6717 7.625 24.015C6.10416 23.3583 4.78125 22.4679 3.65625 21.3437C2.53125 20.2196 1.64083 18.8967 0.985001 17.375C0.329168 15.8533 0.000834915 14.2283 1.58228e-06 12.5C-0.00083175 10.7717 0.327501 9.14666 0.985001 7.625C1.6425 6.10333 2.53292 4.78041 3.65625 3.65625C4.77958 2.53208 6.1025 1.64167 7.625 0.984999C9.1475 0.328333 10.7725 0 12.5 0C14.2275 0 15.8525 0.328333 17.375 0.984999C18.8975 1.64167 20.2204 2.53208 21.3437 3.65625C22.4671 4.78041 23.3579 6.10333 24.0162 7.625C24.6746 9.14666 25.0025 10.7717 25 12.5C24.9975 14.2283 24.6692 15.8533 24.015 17.375C23.3608 18.8967 22.4704 20.2196 21.3437 21.3437C20.2171 22.4679 18.8942 23.3587 17.375 24.0162C15.8558 24.6737 14.2308 25.0016 12.5 25Z" />
              </svg>
            </button>
            {currentPage?.description && isTooltipVisible && (
              <div
                id="tooltip-bottom"
                role="tooltip"
                className="mx-auto absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 border bg-light-white border-font-grayLight text-dark-navy text-xs text-start rounded-md shadow-lg transition-opacity duration-300 z-10 w-[150px] md:w-60"
              >
                {currentPage.description}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-light-white"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items- center gap-2">
          {pathName === '/leads' && (
            <a
              href="/leads/import"
              className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
            >
              Impor Data
            </a>
          )}
          {pathName === '/contacts' && (
            <a
              href="/contacts/import"
              className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
            >
              Impor Data
            </a>
          )}
          {pathName === '/companies' && (
            <a
              href="/companies/import"
              className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
            >
              Impor Data
            </a>
          )}

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
          {pathName === '/contacts' && (
            <NewContact onClose={handleCloseModal} emailLocal={emailLocal} />
          )}
          {pathName === '/companies' && (
            <NewCompany onClose={handleCloseModal} emailLocal={emailLocal} />
          )}
        </SidebarModal>
      )}
    </div>
  );
};

export default HeaderCustomer;
