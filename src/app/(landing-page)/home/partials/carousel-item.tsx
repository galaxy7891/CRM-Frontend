import Carousel from './carousel';

const CarouselItem = () => {
  const carouselItems = [
    {
      description:
        'Sistem ini sangat membantu kami dalam mengelola data pelanggan dengan lebih efisien. Semua proses jadi lebih cepat dan terstruktur, sangat direkomendasikan!',
      name: 'Faris Fanani',
    },
    {
      description:
        'Dengan CRM ini, kami bisa lebih memahami kebutuhan pelanggan. Fitur-fiturnya mudah digunakan dan sangat mendukung aktivitas tim.',
      name: 'Randy Rahman',
    },
    {
      description:
        'Menggunakan CRM ini, bisnis kami berkembang lebih cepat. Data pelanggan tersimpan rapi, dan tim penjualan jadi lebih produktif!',
      name: 'Satria Aji',
    },
  ];

  return (
    <div>
      <Carousel items={carouselItems} />
    </div>
  );
};

export default CarouselItem;
