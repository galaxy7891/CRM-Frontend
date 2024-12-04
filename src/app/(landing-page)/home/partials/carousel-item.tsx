import Carousel from "./carousel";

const CarouselItem = () => {
  const carouselItems = [
    {
      description: "“Fiturnya sangat membantu mengelola bisnis”",
      name: "Hanni Pham",
    },
    {
      description: "“LoyalCust terbaik sangat meningkatkan bisnis kita”",
      name: "Kang Haerin",
    },
    {
      description: "“Harganya sangat terjangkau dengan fitur yang ditawarkan”",
      name: "Kim Minji",
    },
  ];

  return (
    <div>
      <Carousel items={carouselItems} />
    </div>
  );
};

export default CarouselItem;
