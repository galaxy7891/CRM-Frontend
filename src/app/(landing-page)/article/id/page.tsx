import RouterBackButton from "@/components/button/route-back-button";
import Image from "next/image";

const ArticleDetail = () => {
  return (
    <div className="bg-light-white p-8">
      <RouterBackButton />
      <p className="font-custom text-font-black text-2xl md:text-5xl font-bold">
        Teknologi yang Semakin Maju Membantu Atau Menghambat Hubungan Pelanggan?
      </p>
      <p className="font-custom text-font-black text-xs md:text-xl font-normal">
        Diposting pada:18 November 2024
      </p>
      <Image
        src="/images/article.png"
        alt="articlephoto"
        width={866}
        height={433}
        className="h-auto w-auto"
      />
      <p className="font-custom text-font-black text-xs md:text-2xl">
        Teknologi dewasa ini yang semakin maju dan dunia yang kian berkembang
        dalam segala aspek termasuk teknollogi. Pernahkah kalian berfikir sejauh
        apa saat ini teknologi sudah jauh lebih canggih? Yang sebelumnya
        berkabar dengan sanak saudara yang jauh harus menggunakan telegram yang
        baru sampai 4 sampai 5 hari sekarang kita bisa berbincang kapanpun dan
        dimanapun bahkan sejauh apapu. Namun benarkah kemajuan teknologi ini
        membantu pagi para pelaku bisnis dalam berhubungan dengan pelanggan?
        Atau malah menghambat hubungan dengan pelanggan? Mari simak ulasan
        selangkapnya. <br/>
        Pada era saat ini penguasaan teknologi semakin menjadi
        sorotan dan menjadi salah satu alasan kemajuan suatu negara. Teknologi
        sangat dibutuhkan pada setiap negara. Perkembangan teknologi ini sangat
        mengubah kebiasaan manusia. Yang sebelumnya mengetahui pengetahuan umum
        atau informasi melalui surat kabar sekarang dengan gawai kita bisa
        selalu up to date. Bayangkan yang sebelumnya kita apabila ingin
        berpergian secara jarak jauh harus antri berlama lama di depan loket,
        namun dengan adanya teknologi yang semakin canggih sekarang kita bisa
        memesan dimanapun bahkan dari jauh jauh hari, begitupun dalam memesan
        makanan kita saat ini bisa memesan melalui scan barcode tanpa perlu
        kekasir. Saat ini Perkembangan dunia industri serta peran teknologi
        informasi saling berkaitan dalam suatu organisasi bisnis.
      </p>
    </div>
  );
};

export default ArticleDetail;
