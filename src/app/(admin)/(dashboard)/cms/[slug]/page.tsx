'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import {
  getArticleBySlug,
  updateArticle,
  deleteArticle,
} from '@/redux/actions/CMSActions';
import { articleTypes } from '@/types/CMSTypes';
import { AppDispatch, RootState } from '@/redux/store';
import EditUserButton from '@/components/button/edit-user-button';
import DeleteButton from '@/components/button/delete-button';
import DashboardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import ImageArticle from '../partials/image-article';
import TitleArticle from '../partials/title-article';
import SelectArticleStatus from '../partials/select-article-status';
import Loading from '@/components/status/loading';
import Asterisk from '@/components/status/required-asterisk';
import FailText from '@/components/status/fail-text';
import SuccessModal from '@/components/status/success-modal';

const UpdateArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article } = useSelector((state: RootState) => state.CMS);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>(
    article?.image_public_id ? null : null
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [articleState, setArticleState] = useState<articleTypes>({
    title: article?.title || '',
    status: article?.status || '',
    description: article?.description || '',
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );

  const trixRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateArticle = () => {
    console.log(content, 'test');
    dispatch(
      updateArticle(
        article?.id || '',
        articleState,
        content,
        photo,
        setIsLoading,
        setIsSuccess,
        setErrorMessage
      )
    );
  };

  const handleDeleteArticle = () => {
    dispatch(deleteArticle(slug, () => {}));
  };

  useEffect(() => {
    if (article) {
      setContent(article.description || '');
      setArticleState({
        title: article.title || '',
        status: article.status || '',
        description: article.description || '',
      });
    }
  }, [article]);

  useEffect(() => {
    if (slug) {
      dispatch(getArticleBySlug(slug)).then(() => setIsLoadingPage(false));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    const trixElement = trixRef.current;

    const handleTrixChange = (event: TrixEditorEvent) => {
      const htmlContent = event.target.innerHTML;
      console.log(htmlContent, 'tes');
      setContent(htmlContent); // Perbarui state dengan nilai terbaru
    };

    if (trixElement) {
      trixElement.addEventListener(
        'trix-change',
        handleTrixChange as EventListener
      );

      // Sinkronisasi konten awal dengan editor
      const editorElement = trixElement.querySelector(
        'trix-editor'
      ) as HTMLElement & {
        editor?: {
          loadHTML: (content: string) => void;
        };
      };

      if (editorElement?.editor) {
        editorElement.editor.loadHTML(content || ''); // Muat konten awal
      }
    }

    return () => {
      if (trixElement) {
        trixElement.removeEventListener(
          'trix-change',
          handleTrixChange as EventListener
        );
      }
    };
  }, [content, isEdit]); // Tambahkan `isEdit` ke dependensi untuk menyegarkan konten saat mode edit aktif

  return (
    <>
      <HeaderWithBackButton title="Detail Artikel" />
      {isLoadingPage ? (
        <Loading />
      ) : (
        <DashboardCard>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <ImageArticle
                disabled={!isEdit}
                onChange={handleFileChange}
                preview={preview ? preview : article?.image_url || ''}
              />
              {errorMessage && (
                <FailText>{errorMessage.photo_article}</FailText>
              )}
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center justify-end gap-2">
                <DeleteButton onClick={handleDeleteArticle} />
                <EditUserButton onClick={handleIsEdit} />
              </div>
              <TitleArticle
                label="Judul Artikel"
                disabled={!isEdit}
                required
                placeholder="Judul Artikel"
                value={articleState.title}
                onChange={(e) =>
                  setArticleState({ ...articleState, title: e.target.value })
                }
              />
              {errorMessage && <FailText>{errorMessage.title}</FailText>}
              <SelectArticleStatus
                label="Status Artikel"
                value={articleState.status}
                disabled={!isEdit}
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
              {errorMessage && <FailText>{errorMessage.status}</FailText>}
              <div className="pt-4">
                <p className="block text-xs md:text-base font-custom text-font-black dark:text-font-white font-bold pb-2">
                  Artikel
                  <span>
                    <Asterisk />
                  </span>
                </p>

                {isEdit ? (
                  <form>
                    <input
                      type="hidden"
                      id="body"
                      name="body"
                      value={content}
                      required
                    />
                    <trix-editor ref={trixRef} input="body"></trix-editor>
                  </form>
                ) : (
                  <article
                    className={`border p-2 rounded-[4px]
                        dark:bg-gray-800 bg-gray-200 dark:border-none border-gray-300`}
                  >
                    <p
                      className="leading-relaxed text-base md:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: article?.description ?? '',
                      }}
                    ></p>
                  </article>
                )}
              </div>
              {isEdit && (
                <div className="flex justify-end mt-4">
                  <button
                    disabled={isLoading}
                    onClick={handleUpdateArticle}
                    className="sm:py-3 sm:px-16 py-3 px-12 bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
                  >
                    {isLoading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              )}
            </div>
            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Artikel berhasil diubah"
                actionButton_href="/cms"
                actionButton_name="Kembali ke Halaman Artikel"
              />
            )}
          </div>
        </DashboardCard>
      )}
    </>
  );
};

export default UpdateArticle;
