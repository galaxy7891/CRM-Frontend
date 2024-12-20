'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { paginationTypes } from '@/types/otherTypes';
import { getArticles, deleteArticle } from '@/redux/actions/CMSActions';
import { useRouter } from 'next/navigation';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import SuccessModal from '@/components/status/success-modal';
import ErrorModal from '@/components/status/error-modal';
import FilterTableButton from '@/components/button/filter-table-button';
import DashboardCard from '@/components/layout/dashboard-card';
import Loading from '@/components/status/loading';
import EmptyTable from '@/components/table/empty-table';
import TableDataLong from '@/components/table/table-data-long';
import TableHeader from '@/components/table/table-head';
import TableRow from '@/components/table/table-row';
import TableDataAction from '@/components/table/table-data-actions';
import TableDataShort from '@/components/table/table-data-short';
import Checkbox from '@/components/button/checkbox';
import EditTableButton from '@/components/button/edit-table-button';
import DeleteTableButton from '@/components/button/delete-table-button';
import DeleteButton from '@/components/button/delete-button';
import PaginationButton from '@/components/button/pagination-button';
import moment from 'moment';
import 'moment/locale/id';
import { articleTypes } from '@/types/CMSTypes';
import TableDataLink from '@/components/table/table-data-link';
moment.locale('id');

const Article = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [articleStatusBy, setArticleStatusBy] = useState<string>('semua');
  const [perPage, setPerPage] = useState<string>('10');
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isDeleteArticle, setIsDeleteArticle] = useState<boolean>(false);
  const [isTriggerFetch, setIsTriggerFetch] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState<paginationTypes>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 25,
    next_page_url: null,
    prev_page_url: null,
  });
  const headers = ['', 'Judul', 'Status', 'Deskripsi', 'Tanggal Terbit'];
  const router = useRouter();
  const { articles } = useSelector((state: RootState) => state.CMS);
  console.log(articles);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteArticle = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteArticle(selectedIds, setIsSuccess));
    } else if (selectedId) {
      dispatch(deleteArticle(selectedId, setIsSuccess));
    }
    setIsDeleteArticle(false);
  };

  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteArticle(true);
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(
        getArticles(
          sortBy,
          articleStatusBy,
          perPage,
          pagination.current_page - 1,
          setPagination
        )
      );
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(
        getArticles(
          sortBy,
          articleStatusBy,
          perPage,
          pagination.current_page + 1,
          setPagination
        )
      );
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  useEffect(() => {
    if (isTriggerFetch) {
      setPagination((prev) => ({
        ...prev,
        current_page: 1,
      }));

      dispatch(
        getArticles(sortBy, articleStatusBy, perPage, 1, setPagination)
      ).then(() => {
        setIsLoadingPage(false);
        setIsTriggerFetch(false);
      });
    }
  }, [dispatch, sortBy, articleStatusBy, perPage, isTriggerFetch, isSuccess]);

  useEffect(() => {
    if (sortBy || articleStatusBy || perPage) {
      setIsTriggerFetch(true);
    }
  }, [, sortBy, articleStatusBy, perPage, isSuccess]);

  return (
    <>
      {isLoadingPage ? (
        <Loading />
      ) : (
        <DashboardCard>
          <div className="col-span-12 md:col-span-8 flex justify-end gap-2 mb-4 pt-2 md:pt-0">
            <DeleteButton
              onClick={() => {
                if (selectedIds.length > 0) {
                  handleDeleteConfirmation(selectedIds);
                } else {
                  setIsDeleteError(true);
                }
              }}
            />
            <FilterTableButton
              setSortBy={setSortBy}
              setArticleStatusBy={setArticleStatusBy}
              setPerPage={setPerPage}
            />
          </div>
          <>
            {articles.length === 0 ? (
              <EmptyTable />
            ) : (
              <>
                {/* Table */}
                <div className="relative  overflow-auto lg:w-full ">
                  <TableHeader headers={headers}>
                    {articles.map((article: articleTypes, index: number) => (
                      <TableRow key={article.id} index={index}>
                        <TableDataAction>
                          <Checkbox
                            id={`checkbox-${article.id}`}
                            checked={selectedIds.includes(article.id!)}
                            onChange={() => handleCheckboxChange(article.id!)}
                          />
                          <EditTableButton
                            onClick={() =>
                              router.push(`/cms-article/${article.id}`)
                            }
                          />
                          <DeleteTableButton
                            onClick={() =>
                              handleDeleteConfirmation(article.id!)
                            }
                          />
                        </TableDataAction>
                        <TableDataLink href={`/cms-article/${article.slug}`}>
                          {article.title}
                        </TableDataLink>
                        <TableDataShort>{article.status}</TableDataShort>
                        <TableDataLong>
                          <p
                            className="leading-relaxed text-base md:text-lg ine-clamp-1"
                            dangerouslySetInnerHTML={{
                              __html:
                                article
                                  .description!.split(' ') // Memisahkan teks menjadi array berdasarkan spasi
                                  .slice(0, 5) // Mengambil 5 kata pertama
                                  .join(' ') + '...', // Menggabungkan kembali menjadi string dengan tambahan "..."
                            }}
                          ></p>
                        </TableDataLong>
                        <TableDataLong>
                          {moment(article.updated_at).format('DD MMMM YYYY')}
                        </TableDataLong>
                      </TableRow>
                    ))}
                  </TableHeader>
                </div>
                <PaginationButton
                  last_page={pagination.last_page}
                  current_page={pagination.current_page}
                  prev_page_url={pagination.prev_page_url}
                  next_page_url={pagination.next_page_url}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  perPage={pagination.per_page}
                />
              </>
            )}
            {isDeleteArticle && (
              <ActionConfirmModal
                header="Apakah ingin menghapus Artikel?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={() => setIsDeleteArticle(false)}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteArticle}
              />
            )}
            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data Artikel berhasil dihapus"
                actionButton={true}
                actionButton_name="Kembali"
                actionButton_action={() => setIsSuccess(false)}
              />
            )}
            {isDeleteError && (
              <ErrorModal
                header="Pilih data sebelum menghapus!"
                description="Silahkan pilih minimal satu data untuk bisa dihapus"
                actionButton={true}
                actionButton_name="Kembali"
                actionButton_action={() => setIsDeleteError(false)}
              />
            )}
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default Article;
