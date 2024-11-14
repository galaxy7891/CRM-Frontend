'use client';

import Image from 'next/image';
import StatusBadge from '../table/status-badge';
import Link from 'next/link';

interface CardCustomerProps {
  data: DataCustomer;
  emailHref: string;
  waHref: string;
  imageSrc: string;
}

interface DataCustomer {
  name: string;
  email: string;
  website?: string;
  status?: string;
}

const CardCustomer: React.FC<CardCustomerProps> = ({
  data,
  emailHref,
  waHref,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Profile Picture */}
      <div className="relative cursor-pointer">
        <Image
          src={imageSrc}
          alt="image"
          width={160}
          height={160}
          className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="mt-3 text-black dark:text-font-white text-lg  text-centerfont-medium font-custom md:text-2xl text-center truncate">
          {data?.name}
        </p>
        <p className="mt-1 mb-3 text-black dark:text-font-white text-xs font-custom md:text-base  text-center truncate">
          {data?.email}
        </p>
        {data?.website && (
          <p className="mt-1 text-black dark:text-font-white text-xs font-custom md:text-base truncate">
            {data?.website}
          </p>
        )}
      </div>

      <StatusBadge status={data.status ?? ''} />
      {/* Icons */}
      <div className="flex flex-row gap-2 mt-4">
        <Link href={emailHref}>
          <Image
            src="/icons/profile/email.svg"
            alt="email"
            width={24}
            height={24}
          />
        </Link>
        <Link href={waHref}>
          <Image
            src="/icons/profile/wa-gray.svg"
            alt="wa"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default CardCustomer;
