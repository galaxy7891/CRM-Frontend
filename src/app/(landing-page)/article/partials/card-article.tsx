import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const CardArticle = ({
  articles,
}: {
  articles: {
    title: string;
    description: string;
    image_url: string;
    slug: string;
  }[];
}) => {
  return (
    <div className="space-y-6 ">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`w-full h-full bg-font-white rounded-[10px] p-5 lg:flex-row items-start gap-4 
            grid grid-cols-12 shadow-lg`}
        >
          {/* Image Section */}
          <div
            className={`col-span-12 sm:col-span-4 flex justify-center lg:h-60 w-full ${
              index % 2 === 0 ? 'md:order-1' : 'md:order-2'
            } `}
          >
            <Image
              src={article.image_url}
              alt={`image-article-${index}` || '/public/images/default'}
              height={200}
              width={300}
              className="h-full w-full object-cover  "
            />
          </div>
          {/* Text Section */}
          <div
            className={`col-span-12 sm:col-span-8 flex flex-col justify-between h-full ${
              index % 2 === 0 ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <div>
              <Link href={'/article/' + article.slug || '#'}>
                <p className="font-custom text-font-black text-sm lg:text-xl font-bold hover:underline">
                  {article.title}
                </p>
              </Link>

              <p
                className="font-custom text-font-black text-xs lg:text-lg line-clamp-6 pt-2"
                dangerouslySetInnerHTML={{ __html: article.description }}
              ></p>
            </div>

            <div className="flex mt-auto pt-2">
              <Link
                href={'/article/' + article.slug || '#'}
                className="font-custom text-font-black font-medium text-xs lg:text-lg flex items-center gap-2 hover:underline"
              >
                Selengkapnya {'>'}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardArticle;
