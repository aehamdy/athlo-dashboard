import type { ImgHTMLAttributes } from "react";
import { useState } from "react";
import clsx from "clsx";

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
  fallbackSrc = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  ...props
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    // Handle empty or invalid src on initial render
    if (!src || src.trim() === "") {
      return fallbackSrc;
    }
    return src;
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
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
      className={clsx("w-full h-full object-cover", className)}
      {...props}
    />
  );
}

export default AppImage;
