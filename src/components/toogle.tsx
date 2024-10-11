import Image from 'next/image';
import { useState } from 'react';

export default function PasswordToggle({ onClick }: { onClick: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    onClick();
  };

  return (
    <button type="button" onClick={togglePasswordVisibility} className="ml-2">
      {showPassword ? (
        <Image
          src="/icons/open-eye.svg"
          alt="Show password"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src="/icons/closed-eye.svg"
          alt="Hide password"
          width={20}
          height={20}
        />
      )}
    </button>
  );
}
