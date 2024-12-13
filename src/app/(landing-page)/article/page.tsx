import React from "react";
import CardArticle from "./partials/card-article";
// import ArticleDetail from './[id]/page'

const Article = () => {
  return (
    <div className="bg-light-white p-8">
      <h1 className="font-custom text-font-black text-2xl lg:text-5xl font-bold text-center mb-4">Blog Artikel</h1>
      <CardArticle
        articles={[
          {
            title: "Article 1",
            description:
              " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium risus eget justo bibendum, a suscipit risus vehicula. Ut mollis suscipit porttitor. Fusce tempor iaculis ipsum, sed mollis ipsum ornare ut. In vestibulum suscipit ipsum, vel ornare nibh auctor at",
            image: "/images/article.png",
          },
          {
            title: "Article 2",
            description:
              " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium risus eget justo bibendum, a suscipit risus vehicula. Ut mollis suscipit porttitor. Fusce tempor iaculis ipsum, sed mollis ipsum ornare ut. In vestibulum suscipit ipsum, vel ornare nibh auctor at",
            image: "/images/article.png",
          },
          {
            title: "Article 3",
            description:
              " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium risus eget justo bibendum, a suscipit risus vehicula. Ut mollis suscipit porttitor. Fusce tempor iaculis ipsum, sed mollis ipsum ornare ut. In vestibulum suscipit ipsum, vel ornare nibh auctor at",
            image: "/images/article.png",
          },
        ]}
      />
    </div>
  );
};

export default Article;
