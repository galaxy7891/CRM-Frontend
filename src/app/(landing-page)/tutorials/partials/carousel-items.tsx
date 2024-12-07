import CarouselTutorials from "./carousel-tutorials";

const CarouselItem = () => {
  const carouselItems = [
    {
      image: "/images/article.png",
    },
    {
      image: "/images/article.png",
    },
    {
      image: "/images/article.png",
    },
  ];

  return (
    <div>
      <CarouselTutorials items={carouselItems} />
    </div>
  );
};

export default CarouselItem;
