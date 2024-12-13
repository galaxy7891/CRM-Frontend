import React from "react";
import TutorialText from "./tutorial-text";
import CarouselTutorials from "./carousel-tutorials";
import { TutorialsItems } from "./content"; // Pastikan path sesuai

// type TutorialItems = {
//   id: number;
//   title: string;
//   content: string[];
//   images: string[];
// };

const Tutorials: React.FC = () => {
  return (
    <div className="space-y-10">
      {TutorialsItems.map((tutorial, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={tutorial.id}
            className={`flex flex-col md:flex-row ${
              isEven ? "md:flex-row-reverse" : ""
            } items-center gap-6`}
          >
            {/* Text Section */}
            <div className="flex-1">
              <TutorialText
                title={tutorial.title}
                content={
                  <ul className="list-decimal list-inside space-y-2">
                    {tutorial.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                }
              />
            </div>

            {/* Image Section */}
            <div className="flex-1">
              <CarouselTutorials
                items={tutorial.images.map((image) => ({ image }))}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tutorials;
