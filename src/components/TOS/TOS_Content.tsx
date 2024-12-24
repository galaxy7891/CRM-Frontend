import React, { useState } from 'react';
import AuthPositiveButton from '../button/auth-positive-button';
import BackButton from '../button/back-button';
import Section from '@/components/TOS/TOS_Items';

const TermCondition = ({
  handleRegister,
  handleBackButton,
}: {
  handleRegister: () => void;
  handleBackButton: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
      <div className="pb-2">
        <p className="font-custom text-font-black font-medium text-xs md:text-base ">
          Syarat dan Ketentuan Penggunaan Website LoyalCust
        </p>
        <p className="text-xs md:text-base ">
          Selamat datang di website CRM LoyalCust! Dengan mengakses atau
          menggunakan layanan website ini, Anda setuju untuk terikat dengan
          syarat dan ketentuan berikut:
        </p>
      </div>
      <div className="h-screen overflow-y-auto border rounded-lg px-2 md:px-4">
        <Section
          title="1. Definisi"
          items={[
            'Website: Platform CRM online yang diakses melalui alamat yang kami sediakan, termasuk seluruh konten, fungsionalitas, layanan, dan perangkat lunak terkait.',
            'Pengguna: Individu, organisasi, atau entitas lain yang mendaftar dan/atau menggunakan layanan di website CRM ini.',
            'Layanan: Sistem manajemen hubungan pelanggan (CRM) yang menyediakan berbagai fitur untuk mengelola, memonitor, dan mengoptimalkan hubungan pelanggan.',
            'Akun: Informasi pengguna yang terdiri dari identitas unik dan kata sandi yang dibutuhkan untuk mengakses layanan di website.',
          ]}
        />
        <Section
          title="2. Kelayakan Penggunaan"
          items={[
            'Pengguna harus berusia minimal 18 tahun atau memiliki izin dari wali untuk menggunakan layanan CRM kami.',
            'Pengguna setuju untuk memberikan informasi yang benar, akurat, dan terbaru selama proses pendaftaran, serta memperbarui informasi tersebut sesuai kebutuhan.',
            'Kami berhak menolak pendaftaran atau menghentikan akun jika informasi yang diberikan terbukti tidak akurat atau melanggar hukum.',
          ]}
        />
        <Section
          title="3. Hak dan Kewajiban Pengguna"
          items={[
            'Pengguna diperbolehkan untuk mengakses dan menggunakan layanan CRM sesuai dengan fungsionalitas yang ditawarkan.',
            'Pengguna bertanggung jawab untuk menjaga keamanan akun mereka, termasuk kerahasiaan kata sandi dan informasi akses lainnya. Kami tidak bertanggung jawab atas kerugian yang diakibatkan oleh penggunaan akun Anda oleh pihak yang tidak berwenang',
            'Pengguna dilarang melakukan aktivitas yang bertujuan merusak, mengganggu, atau menyalahgunakan layanan kami, termasuk namun tidak terbatas pada peretasan, penyebaran virus, spam, atau aktivitas ilegal lainnya.',
            'Pengguna bertanggung jawab penuh atas segala konten yang diunggah atau dipublikasikan melalui akun mereka di layanan kami, termasuk memastikan bahwa konten tersebut tidak melanggar hak kekayaan intelektual, privasi, atau hukum yang berlaku.',
          ]}
        />
        <Section
          title="4. Pembatasan Penggunaan"
          description="Pengguna setuju untuk tidak menggunakan layanan kami untuk tujuan berikut:"
          items={[
            'Mengirim atau menyebarkan konten yang mengandung materi yang menyinggung, memfitnah, melanggar hukum, atau merusak reputasi orang lain.',
            'Meniru identitas orang lain atau memberikan informasi palsu yang dapat menyesatkan pengguna lain.',
            'Menggunakan layanan untuk tujuan komersial atau promosi tanpa izin tertulis dari kami.',
            'Mengakses atau mencoba mengakses sistem atau server kami yang tidak diperuntukkan bagi publik, termasuk menggunakan alat otomatisasi untuk mengumpulkan data dari website.',
          ]}
        />
        <Section
          title="5. Perubahan dan Pemutakhiran Layanan"
          items={[
            'Kami berhak untuk menambah, mengubah, menangguhkan, atau menghentikan layanan atau fitur apapun tanpa pemberitahuan terlebih dahulu. Perubahan ini dapat mencakup, namun tidak terbatas pada, pembaruan perangkat lunak, peningkatan fungsionalitas, atau penghapusan fitur tertentu.',
            'Pengguna diharapkan untuk memantau pembaruan tersebut secara berkala, dan melanjutkan penggunaan layanan setelah perubahan dianggap sebagai penerimaan terhadap syarat dan ketentuan yang telah diperbarui.',
          ]}
        />
        <Section
          title="6. Kebijakan Pembayaran"
          items={[
            'Layanan CRM ini dapat ditawarkan dalam beberapa paket berlangganan dengan biaya yang bervariasi tergantung pada fitur yang digunakan.',
            'Pembayaran berlangganan wajib dilakukan tepat waktu sesuai dengan jadwal pembayaran yang disepakati. Kegagalan melakukan pembayaran dapat menyebabkan penghentian atau pembatasan akses ke layanan.',
            'Kami tidak memberikan pengembalian dana (refund) kecuali jika diwajibkan oleh hukum yang berlaku atau berdasarkan kebijakan kami yang diatur secara khusus dalam situasi tertentu.',
          ]}
        />
        <Section
          title="7. Kebijakan Privasi"
          items={[
            'Pengumpulan dan penggunaan informasi pribadi pengguna diatur oleh Kebijakan Privasi kami, yang dapat diakses melalui halaman [Kebijakan Privasi]. Kami memastikan bahwa informasi pribadi pengguna akan dijaga kerahasiaannya dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan kecuali diwajibkan oleh hukum.',
            'Kami menggunakan data pengguna untuk meningkatkan kualitas layanan, mempersonalisasi pengalaman pengguna, dan memberikan pembaruan atau informasi terkait layanan CRM kami.',
            'Pengguna memiliki hak untuk mengakses, memperbarui, atau menghapus data pribadi mereka sesuai dengan ketentuan hukum yang berlaku.',
          ]}
        />
        <Section
          title="8. Kepemilikan dan Hak Kekayaan Intelektual"
          items={[
            'Semua hak cipta, merek dagang, dan hak kekayaan intelektual lainnya dalam layanan CRM, termasuk perangkat lunak, desain, teks, grafik, logo, dan kode sumber, adalah milik kami atau pemberi lisensi kami. Pengguna tidak diperbolehkan menyalin, mendistribusikan, atau memodifikasi konten tersebut tanpa izin tertulis dari kami.',
            'Setiap pelanggaran terhadap hak kekayaan intelektual kami akan ditindaklanjuti sesuai dengan hukum yang berlaku.',
          ]}
        />
        <Section
          title="9. Penafian dan Batasan Tanggung Jawab"
          items={[
            'Layanan CRM disediakan "sebagaimana adanya" tanpa jaminan dalam bentuk apapun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa layanan kami akan bebas dari gangguan, bebas dari kesalahan, atau sesuai dengan kebutuhan spesifik pengguna',
            'Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan pengguna untuk mengakses layanan.',
            'Kami tidak bertanggung jawab atas kerusakan data, kehilangan keuntungan, atau gangguan bisnis yang disebabkan oleh penggunaan layanan kami.',
          ]}
        />
        <Section
          title="10. Penyelesaian Sengketa"
          items={[
            'Setiap perselisihan yang timbul dari atau sehubungan dengan syarat dan ketentuan ini akan diselesaikan melalui proses musyawarah dan mufakat. Jika penyelesaian tidak tercapai, perselisihan akan diselesaikan melalui pengadilan di wilayah hukum kami.',
            'Kami berhak untuk mengambil tindakan hukum terhadap setiap penggunaan layanan yang melanggar hukum.',
          ]}
        />
        <Section
          title="11. Perubahan Syarat dan Ketentuan"
          items={[
            'Kami berhak untuk memperbarui atau mengubah syarat dan ketentuan ini kapan saja. Perubahan tersebut akan berlaku efektif segera setelah dipublikasikan di website. Pengguna diharapkan untuk secara rutin memeriksa pembaruan pada halaman ini.',
            'Dengan terus menggunakan layanan setelah perubahan diberlakukan, pengguna dianggap menyetujui syarat dan ketentuan yang telah diperbarui.',
          ]}
        />
        <Section
          title="12. Penghentian Akses"
          items={[
            'Kami berhak untuk menangguhkan atau mengakhiri akses pengguna ke layanan kami tanpa pemberitahuan sebelumnya jika ditemukan pelanggaran terhadap syarat dan ketentuan ini, tindakan yang melanggar hukum, atau atas dasar kepentingan keamanan.',
          ]}
        />
        <Section
          title="13. Kontak"
          description="Jika Anda memiliki pertanyaan atau keluhan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui email [alamat email] atau nomor telepon [nomor telepon]."
        />
      </div>
      <div className="flex items-center  pt-2">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:yellow-500 dark:focus:ring-yellow-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-xs md:text-base font-medium text-gray-900 dark:text-gray-300"
        >
          Saya Setuju
        </label>
      </div>
      <AuthPositiveButton onClick={handleRegister} disabled={!isChecked}>
        Kirim
      </AuthPositiveButton>
      <BackButton onClick={handleBackButton}>Kembali</BackButton>
    </>
  );
};

export default TermCondition;
