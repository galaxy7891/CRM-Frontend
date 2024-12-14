'use client';

import { useDispatch } from 'react-redux';
import { addArticle } from '@/redux/actions/CMSActions';
import { AppDispatch } from '@/redux/store';
import DashboardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import React, { useState } from 'react';
import ImageArticle from '../partials/image-article';
import TitleArticle from '../partials/title-article';
import SelectArticleStatus from '../partials/select-article-status';
import Editor from '@/components/novel-rich-text/editor/editor';
import { articleTypes } from '@/types/CMSTypes';

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Ketik "/" untuk memilih perintah atau tulis  ',
        },
      ],
    },
  ],
};

const NewArticle = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [content, setContent] = useState<string>('');
  console.log(content);
  const [article, setArticle] = useState<articleTypes>({
    title: '',
    status: '',
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleAdddArticle = () => {
    dispatch(addArticle(article, content, photo));
  };
  return (
    <>
      <HeaderWithBackButton title="Tambah Artikel" />
      <DashboardCard>
        <div className="grid grid-cols-12 gap-6">
          {/* Bagian Upload Foto */}
          <div className="col-span-12 lg:col-span-5">
            <ImageArticle />
          </div>

          {/* Bagian Input Judul Artikel */}
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
                { label: 'Terbit', value: 'terbit' },
                { label: 'Draf', value: 'draf' },
              ]}
              onChange={(e) =>
                setArticle({ ...article, status: e.target.value })
              }
              required
            />
            <p className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Artikel
            </p>
            <Editor initialValue={defaultValue} onChange={setContent} />
            <div className="flex justify-end">
              <button
                onClick={handleAdddArticle}
                className="sm:py-3 sm:px-16 py-3 px-12  bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
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
