'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import RouterBackButton from '@/components/button/route-back-button';
import { getPublicArticle } from '@/redux/actions/CMSActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { publicArticle } = useSelector((state: RootState) => state.CMS);
  console.log(publicArticle);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPublicArticle(slug));
  }, [dispatch, slug]);

  return (
    <div className="bg-light-white p-8 px-6 md:px-16">
      <RouterBackButton />
      <h1 className="font-custom text-font-black text-2xl md:text-5xl font-bold pt-4">
        {publicArticle?.title}
      </h1>

      <p className="font-custom text-font-black text-xs md:text-xl font-normal pt-2 md:pt-4">
        Diposting pada :{' '}
        {moment(publicArticle?.updated_at).format('DD MMMM YYYY')}
      </p>

      <article>
        <div className="flex items-center justify-center">
          <Image
            src={publicArticle?.image_url || ''}
            alt="articlephoto"
            width={866}
            height={433}
            className=" p-4 md:p-10"
          />
        </div>

        <p
          className="leading-relaxed text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: publicArticle?.description ?? '' }}
        ></p>
      </article>
    </div>
  );
};

export default ArticleDetail;
