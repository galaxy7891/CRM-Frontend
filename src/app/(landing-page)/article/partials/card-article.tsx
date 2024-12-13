import Link from "next/link";
import React from "react";
import Image from "next/image";

const CardArticle = ({
  articles,
}: {
  articles: { title: string; description: string; image: string }[];
}) => {
  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`w-full bg-font-white rounded-[10px] p-5 flex flex-col lg:flex-row ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-start gap-4`}
        >
          {/* Image Section */}
          <div className="flex-none w-full lg:w-1/3">
            <Image
              src={article.image}
              alt={`image-article-${index}`}
              height={211}
              width={285}
              className="h-auto w-full lg:w-auto"
            />
          </div>
          {/* Text Section */}
          <div className="flex-1 space-y-4">
            <p className="font-custom text-font-black text-sm lg:text-xl font-bold">
              {article.title}
            </p>
            <p className="font-custom text-font-black text-xs lg:text-lg">
              {article.description}
            </p>
            <Link
              href="/article/id"
              className="font-custom text-font-black  font-medium text-xs lg:text-lg flex items-center gap-2"
            >
              Selengkapnya
              <svg
                width="13"
                height="22"
                viewBox="0 0 13 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.47306 20.8141L11.85 12.171C12.4851 11.5156 12.4851 10.4531 11.85 9.79779L11.827 9.7741C11.1919 9.11877 10.1621 9.11877 9.52694 9.7741L1.15004 18.4173C0.514889 19.0726 0.514889 20.1351 1.15004 20.7904L1.17299 20.8141C1.80814 21.4694 2.83791 21.4694 3.47306 20.8141Z"
                  fill="#1A1A1A"
                />
                <path
                  d="M11.827 12.2278L11.85 12.2042C12.4851 11.5488 12.4851 10.4863 11.85 9.83099L3.47306 1.18784C2.83791 0.532509 1.80814 0.532509 1.17299 1.18784L1.15004 1.21153C0.514889 1.86686 0.514889 2.92937 1.15004 3.5847L9.52694 12.2278C10.1621 12.8832 11.1919 12.8832 11.827 12.2278Z"
                  fill="#1A1A1A"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardArticle;
