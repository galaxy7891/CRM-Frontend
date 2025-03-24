import React, { ReactNode } from 'react';

interface TutorialTextProps {
  title: string;
  content: ReactNode;
}

const TutorialText = ({ title, content }: TutorialTextProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="font-custom text-font-black text-[28px] font-bold">
        {title}
      </h1>
      <h3 className="font-custom text-font-black text-xs md:text-base font-medium text-justify">
        {content}
      </h3>
    </div>
  );
};

export default TutorialText;
