import { useEffect, useState } from "react";

interface ImageLoaderProps {
  src: string;
  alt: string;
  rest?: {
    [x: string]: string | object | number | boolean;
  };
}
export default function ImageLoader({ src, alt, ...rest }: ImageLoaderProps) {
  const placeholderImg = /*site_theme === "halloween" ? "candycorn.svg" : */ "rain.svg";

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoading(false);
    };
  }, [src]);

  return (
    <>
      {loading ? (
        <img
          src={`/images/${placeholderImg}`}
          alt="loading"
          {...rest}
          className="imageloader"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          {...rest}
        />
      )}
    </>
  );
}
