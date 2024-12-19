'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { articleTypes } from '@/types/CMSTypes';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleById } from '@/redux/actions/CMSActions';
import { AppDispatch } from '@/redux/store';
import ImageArticle from '../partials/image-article';
import TitleArticle from '../partials/title-article';
import SelectArticleStatus from '../partials/select-article-status';
import DashboardCard from '@/components/layout/dashboard-card';
import EditUserButton from '@/components/button/edit-user-button';
import DeleteButton from '@/components/button/delete-button';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import Editor from '@/components/novel-rich-text/editor/editor';
export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '...',
        },
      ],
    },
  ],
};

const EditArticle = () => {
  const { article } = useSelector((state: RootState) => state.CMS);

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [isEditArticle, setIsEditArticle] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  console.log(content);
  const [articleState, setArticleState] = useState<articleTypes>({
    title: '',
    status: '',
  });

  const handleIsEditArticle = () => {
    setIsEditArticle(!isEditArticle);
  };
  // Fetch data artikel berdasarkan ID
  useEffect(() => {
    if (id) {
      dispatch(getArticleById(id));
    }
  }, [dispatch, id]);

  // Update state lokal ketika `article` berubah
  useEffect(() => {
    if (article) {
      setContent(article.description || '');
      setArticleState({
        title: article.title || '',
        status: article.status || '',
      });
    }
  }, [article]);

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
            <div className="flex items-center justify-end gap-2">
              <DeleteButton />
              <EditUserButton onClick={handleIsEditArticle} />
            </div>
            <TitleArticle
              disabled={!isEditArticle}
              label="Judul Artikel"
              required
              placeholder="Judul Artikel"
              value={articleState.title}
              onChange={(e) =>
                setArticleState({ ...articleState, title: e.target.value })
              }
            />
            <SelectArticleStatus
              disabled={!isEditArticle}
              label="Status Artikel"
              value={articleState.status}
              options={[
                { label: 'Pilih Status Artikel', value: '', hidden: true },
                { label: 'Terbit', value: 'Terbit' },
                { label: 'Draf', value: 'Draf' },
              ]}
              onChange={(e) =>
                setArticleState({ ...articleState, status: e.target.value })
              }
              required
            />

            <p className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Artikel
            </p>

            {!isEditArticle ? (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            ) : (
              <Editor initialValue={content} onChange={setContent} />
            )}
            {isEditArticle && (
              <div className="flex justify-end">
                <button
                  disabled={!isEditArticle}
                  onClick={() => {}}
                  className="md:py-2 md:px-14 px-8 py-3 bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
                >
                  Ubah
                </button>
              </div>
            )}
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default EditArticle;
