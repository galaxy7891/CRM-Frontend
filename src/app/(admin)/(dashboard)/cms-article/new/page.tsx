'use client';

import { useDispatch } from 'react-redux';
import { addArticle } from '@/redux/actions/CMSActions';
import { AppDispatch } from '@/redux/store';
import DashboardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import React, { useState, useRef, useEffect } from 'react';
import ImageArticle from '../partials/image-article';
import TitleArticle from '../partials/title-article';
import SelectArticleStatus from '../partials/select-article-status';
import { articleTypes } from '@/types/CMSTypes';

const NewArticle = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [article, setArticle] = useState<articleTypes>({
    title: '',
    status: '',
  });
  const trixRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleAddArticle = () => {
    dispatch(addArticle(article, content, photo));
  };

  useEffect(() => {
    if (trixRef.current) {
      trixRef.current.addEventListener('trix-change', (event: any) => {
        const htmlContent = event.target.innerHTML;
        setContent(htmlContent);
      });
    }
  }, []);

  return (
    <>
      <HeaderWithBackButton title="Tambah Artikel" />
      <DashboardCard>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <ImageArticle onChange={handleFileChange} preview={preview} />
          </div>

          <div className="col-span-12 lg:col-span-7 gap-4 flex flex-col justify-center">
            <TitleArticle
              label="Judul Artikel"
              required
              placeholder="Judul Artikel"
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
            <SelectArticleStatus
              label="Status Artikel"
              value={article.status}
              options={[
                { label: 'Pilih Status Artikel', value: '', hidden: true },
                { label: 'Terbit', value: 'Terbit' },
                { label: 'Draf', value: 'Draf' },
              ]}
              onChange={(e) =>
                setArticle({ ...article, status: e.target.value })
              }
              required
            />
            <p className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Artikel
            </p>
            <form>
              <input type="hidden" id="body" name="body" />
              <trix-editor ref={trixRef} input="body"></trix-editor>
            </form>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddArticle}
                className="sm:py-3 sm:px-16 py-3 px-12 bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default NewArticle;
