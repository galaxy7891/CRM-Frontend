export const MENU = [
  {
    id: 1,
    link: '/homepage',
    title: 'Beranda',
    icon: '/icons/sidebar/home.svg',
    iconClicked: '/icons/sidebar/home-brown.svg',
    iconHover: '/icons/sidebar/home-yellow.svg',
    alt: 'beranda',
    description:
      'Pantau aktivitas dan progress deals pipeline di halaman beranda. Klik detail untuk rincian deals pipeline secara lanjut.',
  },
  {
    id: 2,
    link: '/employee',
    title: 'Karyawan',
    icon: '/icons/sidebar/karyawan.svg',
    iconClicked: '/icons/sidebar/karyawan-brown.svg',
    iconHover: '/icons/sidebar/karyawan-yellow.svg',
    alt: 'karyawan',
    description:
      'Klik nama karyawan untuk melihat detail data akun dan aktivitas karyawan.',
  },
  {
    id: 3,
    link: '/#',
    title: 'Pelanggan',
    icon: '/icons/sidebar/pelanggan.svg',
    iconClicked: '/icons/sidebar/pelanggan-brown.svg',
    iconHover: '/icons/sidebar/pelanggan-yellow.svg',
    alt: 'pelanggan',
    description:
      'Kelola data pelanggan dengan mudah, meliputi leads, kontak, dan perusahaan. ',
    subItems: [
      {
        id: 4,
        link: '/leads',
        title: 'Leads',
        alt: 'leads',
        description:
          'Pantau data leads dan lakukan konversi pada data prospek.',
      },
      {
        id: 5,
        link: '/contact',
        title: 'Kontak',
        alt: 'kontak',
        description:
          'Kelola data kontak pelanggan, Klik tambah data untuk menambahkan kontak pelanggan baru secara manual.',
      },
      {
        id: 6,
        link: '/company',
        title: 'Perusahaan',
        alt: 'perusahaan',
        description:
          'Atur data perusahaan klien, klik tambah data untuk menambahkan data perusahaan klien baru.',
      },
    ],
  },
  {
    id: 7,
    link: '/deals',
    title: 'Deals',
    icon: '/icons/sidebar/deals.svg',
    iconClicked: '/icons/sidebar/deals-brown.svg',
    iconHover: '/icons/sidebar/deals-yellow.svg',
    alt: 'deals',
    description:
      'Pantau transaksi yang sedang belangsung, klik pada nama deal untuk melihat detail lengkap dan kemajuan transaksi.',
  },
  {
    id: 8,
    link: '/product',
    title: 'Produk',
    icon: '/icons/sidebar/product.svg',
    iconClicked: '/icons/sidebar/product-brown.svg',
    iconHover: '/icons/sidebar/product-yellow.svg',
    alt: 'produk',
    description:
      'Klik nama produk untuk melihat detail  harga, stok yang tersedia, dan informasi lainnya',
  },

  {
    id: 9,
    link: 'https://wa.me/',
    title: 'Hubungi Kami',
    icon: '/icons/sidebar/wa.svg',
    iconHover: '/icons/sidebar/wa-green.svg',
    alt: 'Hubungi Kami',
  },
];
