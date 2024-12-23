import React from 'react';

interface ArticleBadgeProps {
  Article: 'Terbit' | 'Draf' | string;
}

const ArticleBadge: React.FC<ArticleBadgeProps> = ({ Article }) => {
  const ArticleStyles: Record<string, string> = {
    Terbit:
      'border border-font-green bg-light-greenLight font-custom text-font-green text-xs',
    Draf:
      'border border-dark-navy bg-light-white font-custom text-dark-navy text-xs',
  };

  const badgeStyle = ArticleStyles[Article] || 'border-gray-500 text-gray-500';

  return (
    <div
      className={`flex justify-center items-center  md:w-[79px] md:h-[32px] w-[69px] h-[22px] rounded-[5px] p-2 ${badgeStyle}`}
    >
      <p>{Article}</p>
    </div>
  );
};

export default ArticleBadge;
