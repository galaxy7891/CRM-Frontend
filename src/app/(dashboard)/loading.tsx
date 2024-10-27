import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image
        src="/images/loading.gif"
        alt="loading"
        width={200}
        height={200}
        className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
      />
    </div>
  );
}
