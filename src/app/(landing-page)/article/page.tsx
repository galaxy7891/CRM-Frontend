'use client';
import React, { useEffect } from 'react';
import { getPublicArticles } from '@/redux/actions/CMSActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import CardArticle from './partials/card-article';

const Article = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { publicArticles } = useSelector((state: RootState) => state.CMS);
  console.log(publicArticles);
  useEffect(() => {
    dispatch(getPublicArticles());
  }, [dispatch]);
  return (
    <div className="bg-light-white px-6 lg:px-10">
      <h1 className="font-custom text-font-black text-2xl lg:text-5xl font-bold text-center py-4 lg:py-10">
        Blog Artikel
      </h1>

      <CardArticle
        articles={publicArticles.map((article) => ({
          title: article.title,
          description: article?.description || '',
          image_url: article.image_url || '',
          slug: article.slug || '',
        }))}
      />
    </div>
  );
};

export default Article;
