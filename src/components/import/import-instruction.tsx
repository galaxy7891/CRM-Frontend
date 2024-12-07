import Link from 'next/link';

const ImportInstruction = ({ href }: { href: string }) => {
  return (
    <>
      <p className="font-custom text-xs md:text-base text-center text-font-black">
        Unggah dokumen dengan format <span className="font-bold">xlsx</span>{' '}
        atau
        <span className="block">
          unduh template sesuai format yang telah ditentukan.
        </span>
        <Link
          href={href}
          download="template-export-leads.xlsx"
          className="font-bold text-dark-gold hover:underline cursor-pointer"
        >
          Unduh Template
        </Link>
      </p>
    </>
  );
};

export default ImportInstruction;
