import React, { ReactNode } from "react";

interface TutorialTextProps {
  title: string;
  content: ReactNode;
}

const TutorialText = ({ title, content }: TutorialTextProps) => {
  return (
    <div>
      <h1 className="font-custom text-font-black text-[28px] font-bold">{title}</h1>
      <h3 className="font-custom text-font-black text-base font-medium">{content}</h3>
    </div>
  );
};

export default TutorialText;
