'use client';
import React, { useEffect, useState } from 'react';
import { getPublicArticles } from '@/redux/actions/CMSActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import CardArticle from './partials/card-article';
import { paginationTypes } from '@/types/otherTypes';
import PaginationButton from '@/components/button/pagination-button';
import { motion } from 'framer-motion'; // Import framer-motion

const Article = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { publicArticles } = useSelector((state: RootState) => state.CMS);
  const [pagination, setPagination] = useState<paginationTypes>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
    next_page_url: null,
    prev_page_url: null,
  });

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(getPublicArticles(pagination.current_page - 1, setPagination));
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(getPublicArticles(pagination.current_page + 1, setPagination));
    }
  };

  useEffect(() => {
    dispatch(getPublicArticles(1, setPagination));
  }, [dispatch]);

  return (
    <div className="bg-light-white px-6 lg:px-10">
      <h1 className="font-custom text-font-black text-2xl lg:text-5xl font-bold text-center py-4 lg:py-10">
        Blog Artikel
      </h1>

      <div className="grid gap-4">
        {publicArticles.map((article, index) => (
          <motion.div
            key={article.slug || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Animasi akan muncul setiap kali scroll kembali
          >
            <CardArticle
              articles={[
                {
                  title: article.title,
                  description: article?.description || '',
                  image_url: article.image_url || '',
                  slug: article.slug || '',
                },
              ]}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-4">
        <PaginationButton
          last_page={pagination.last_page}
          current_page={pagination.current_page}
          prev_page_url={pagination.prev_page_url}
          next_page_url={pagination.next_page_url}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          perPage={pagination.per_page}
        />
      </div>
    </div>
  );
};

export default Article;
