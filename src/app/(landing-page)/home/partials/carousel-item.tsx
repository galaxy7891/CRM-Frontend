import Carousel from "./carousel";

const CarouselItem = () => {
  const carouselItems = [
    {
      description: "“Fiturnya sangat membantu mengelola bisnis”",
      name: "Faris Fanani",
    },
    {
      description: "“LoyalCust terbaik sangat meningkatkan bisnis kita”",
      name: "Randy Rahman",
    },
    {
      description: "“Harganya sangat terjangkau dengan fitur yang ditawarkan”",
      name: "Satria Aji",
    },
  ];

  return (
    <div>
      <Carousel items={carouselItems} />
    </div>
  );
};

export default CarouselItem;
