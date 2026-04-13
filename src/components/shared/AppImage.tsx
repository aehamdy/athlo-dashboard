import type { ImgHTMLAttributes } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import fallbackimage from '@/assets/images/no_image_placeholder.webp';

type AppImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  isLoading?: boolean;
};

function AppImage({
  src,
  alt,
  className,
  fallbackSrc = fallbackimage,
  ...props
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    // Handle empty or invalid src on initial render
    if (!src || src.trim() === '') {
      return fallbackSrc;
    }
    return src;
  });
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setHasError(false);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      decoding="async"
      className={clsx('w-full h-full object-cover', className)}
      {...props}
    />
  );
}

export default AppImage;
