import Image from 'next/image';

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 md:left-44  right-0 bottom-0 flex items-center justify-center z-50">
      <Image
        src="/images/loading.gif"
        alt="loading"
        width={100}
        height={100}
        className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
      />
    </div>
  );
}