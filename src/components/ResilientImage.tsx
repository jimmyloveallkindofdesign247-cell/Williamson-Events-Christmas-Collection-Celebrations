import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#064E3B] via-[#171717] to-[#8B0000]/80 p-6 text-center text-[#FFFDF5] ${className}`}
      >
        <Sparkles className="mb-2 h-7 w-7 text-[#D4AF37]" aria-hidden="true" />
        <span className="font-display text-lg font-semibold tracking-wide text-[#FFFDF5]">
          Williamson Events
        </span>
        <span className="mt-1 max-w-[22ch] text-xs text-[#FFFDF5]/75">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
