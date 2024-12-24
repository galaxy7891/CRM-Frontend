'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TempFilter, FilterTableButtonProps } from '@/types/otherTypes';
import Filter from './filter-button';

const FilterTableButton: React.FC<FilterTableButtonProps> = ({
  setSortBy,
  setBuyerTypeBy,
  setTypeBy,
  setStatusBy,
  setArticleStatusBy,
  setPerPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilter, setTempFilter] = useState<TempFilter>({
    sortBy: 'terbaru',
    setBuyerTypeBy: setBuyerTypeBy ? 'semua' : undefined,
    setTypeBy: setTypeBy ? 'semua' : undefined, // Set to undefined if no type
    statusBy: setStatusBy ? 'semua' : undefined,
    articleStatusBy: setArticleStatusBy ? 'semua' : undefined,
    perPage: '10',
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleConfirmFilter = () => {
    setSortBy(tempFilter.sortBy);
    if (setTypeBy && tempFilter.setTypeBy) setTypeBy(tempFilter.setTypeBy);
    if (setBuyerTypeBy && tempFilter.setBuyerTypeBy)
      setBuyerTypeBy(tempFilter.setBuyerTypeBy);
    if (setStatusBy && tempFilter.statusBy) setStatusBy(tempFilter.statusBy);
    if (setArticleStatusBy && tempFilter.articleStatusBy)
      setArticleStatusBy(tempFilter.articleStatusBy);
    setPerPage(tempFilter.perPage);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative " ref={dropdownRef}>
      {/* Button Filter */}
      <button
        onClick={toggleDropdown}
        className={`lg:p-[10px] p-[9px] rounded-[10px] hover:shadow-md hover:shadow-dropdown-darkGray font-medium text-xs lg:text-base flex items-center duration-200 
        ${
          isOpen
            ? 'text-dropdown-darkGray border-dropdown-darkGray border bg-font-white dark:border-light-white dark:text-light-white dark:bg-dark-navy'
            : 'text-dropdown-darkGray border-dropdown-darkGray border bg-font-white dark:border-light-white dark:text-light-white dark:bg-dark-navy'
        }`}
      >
        <svg
          viewBox="0 0 21 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-dropdown-darkGray dark:fill-light-white w-5 h-5 "
        >
          <path d="M13.1246 11.9984V22.5036C13.1771 22.9036 13.0459 23.3302 12.7441 23.6101C12.6227 23.7337 12.4784 23.8318 12.3197 23.8987C12.1609 23.9656 11.9908 24 11.8189 24C11.647 24 11.4768 23.9656 11.3181 23.8987C11.1593 23.8318 11.0151 23.7337 10.8937 23.6101L8.25593 20.9305C8.11289 20.7883 8.00412 20.6144 7.9381 20.4225C7.87209 20.2306 7.85062 20.0257 7.87536 19.824V11.9984H7.83599L0.27704 2.15971C0.0639307 1.88178 -0.0322287 1.52947 0.00957409 1.17975C0.0513768 0.830023 0.227743 0.511326 0.500135 0.293294C0.749475 0.106652 1.02506 0 1.31377 0H19.6862C19.9749 0 20.2505 0.106652 20.4999 0.293294C20.7723 0.511326 20.9486 0.830023 20.9904 1.17975C21.0322 1.52947 20.9361 1.88178 20.723 2.15971L13.164 11.9984H13.1246Z" />
        </svg>

        <span>Filter</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="z-50 absolute right-0 mt-2 px-5 py-6  bg-font-white dark:bg-dark-navy border border-font-gray rounded-lg shadow-lg">
          {/* Date */}
          <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
            Tanggal Dibuat
          </p>
          <div className="flex flex-row gap-2 mb-4">
            <Filter
              isActive={tempFilter.sortBy == 'terbaru'}
              onClick={() =>
                setTempFilter({ ...tempFilter, sortBy: 'terbaru' })
              }
            >
              Terbaru
            </Filter>
            <Filter
              isActive={tempFilter.sortBy == 'terlama'}
              onClick={() =>
                setTempFilter({ ...tempFilter, sortBy: 'terlama' })
              }
            >
              Terlama
            </Filter>
          </div>

          {/* Buyer Type */}
          {setBuyerTypeBy && (
            <>
              <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
                Kategori Pembeli
              </p>
              <div className="flex flex-row gap-2 mb-2">
                <Filter
                  isActive={tempFilter.setBuyerTypeBy == 'semua'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setBuyerTypeBy: 'semua' })
                  }
                >
                  Semua
                </Filter>
                <Filter
                  isActive={tempFilter.setBuyerTypeBy == 'pelanggan'}
                  onClick={() =>
                    setTempFilter({
                      ...tempFilter,
                      setBuyerTypeBy: 'pelanggan',
                    })
                  }
                >
                  Pelanggan
                </Filter>
                <Filter
                  isActive={tempFilter.setBuyerTypeBy == 'perusahaan'}
                  onClick={() =>
                    setTempFilter({
                      ...tempFilter,
                      setBuyerTypeBy: 'perusahaan',
                    })
                  }
                >
                  Perusahaan
                </Filter>
              </div>
            </>
          )}

          {/* Tipe */}
          {setTypeBy && (
            <>
              <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
                Tipe
              </p>
              <div className="flex flex-row gap-2 mb-2">
                <Filter
                  isActive={tempFilter.setTypeBy == 'semua'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setTypeBy: 'semua' })
                  }
                >
                  Semua
                </Filter>
                <Filter
                  isActive={tempFilter.setTypeBy == 'percobaan'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setTypeBy: 'percobaan' })
                  }
                >
                  Percobaan
                </Filter>
                <Filter
                  isActive={tempFilter.setTypeBy == 'reguler'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setTypeBy: 'reguler' })
                  }
                >
                  Reguler
                </Filter>
              </div>
              <div className="flex flex-row gap-2 mb-4">
                <Filter
                  isActive={tempFilter.setTypeBy == 'profesional'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setTypeBy: 'profesional' })
                  }
                >
                  Profesional
                </Filter>
                <Filter
                  isActive={tempFilter.setTypeBy == 'bisnis'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setTypeBy: 'bisnis' })
                  }
                >
                  Bisnis
                </Filter>
                <Filter
                  isActive={tempFilter.setTypeBy == 'tidak aktif'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, setTypeBy: 'tidak aktif' })
                  }
                >
                  Tidak Aktif
                </Filter>
              </div>
            </>
          )}

          {/* Status */}
          {setStatusBy && (
            <>
              <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
                Status
              </p>
              <div className="flex flex-row gap-2 mb-4">
                <Filter
                  isActive={tempFilter.statusBy == 'semua'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, statusBy: 'semua' })
                  }
                >
                  Semua
                </Filter>
                <Filter
                  isActive={tempFilter.statusBy == 'rendah'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, statusBy: 'rendah' })
                  }
                >
                  Rendah
                </Filter>
                <Filter
                  isActive={tempFilter.statusBy == 'sedang'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, statusBy: 'sedang' })
                  }
                >
                  Sedang
                </Filter>
              </div>
              <div className="flex flex-row gap-2 mb-4">
                <Filter
                  isActive={tempFilter.statusBy == 'tinggi'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, statusBy: 'tinggi' })
                  }
                >
                  Tinggi
                </Filter>
              </div>
            </>
          )}

          {/* Article Status */}
          {setArticleStatusBy && (
            <>
              <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
                Status
              </p>
              <div className="flex flex-row gap-2 mb-4">
                <Filter
                  isActive={tempFilter.articleStatusBy == 'semua'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, articleStatusBy: 'semua' })
                  }
                >
                  Semua
                </Filter>
                <Filter
                  isActive={tempFilter.articleStatusBy == 'Terbit'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, articleStatusBy: 'Terbit' })
                  }
                >
                  Terbit
                </Filter>
                <Filter
                  isActive={tempFilter.articleStatusBy == 'Draf'}
                  onClick={() =>
                    setTempFilter({ ...tempFilter, articleStatusBy: 'Draf' })
                  }
                >
                  Draf
                </Filter>
              </div>
            </>
          )}

          {/* Jumlah Halaman */}
          <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
            Jumlah Halaman
          </p>
          <div className="flex flex-row gap-2">
            <Filter
              isActive={tempFilter.perPage == '10'}
              onClick={() => setTempFilter({ ...tempFilter, perPage: '10' })}
            >
              10
            </Filter>
            <Filter
              isActive={tempFilter.perPage == '25'}
              onClick={() => setTempFilter({ ...tempFilter, perPage: '25' })}
            >
              25
            </Filter>
            <Filter
              isActive={tempFilter.perPage == '50'}
              onClick={() => setTempFilter({ ...tempFilter, perPage: '50' })}
            >
              50
            </Filter>
          </div>
          <button
            type="submit"
            onClick={handleConfirmFilter}
            className="mt-4 px-4 py-2 rounded-[4px] bg-light-gold w-full text-font-brown font-custom font-bold text-xs md:text-base"
          >
            Konfirmasi
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterTableButton;
