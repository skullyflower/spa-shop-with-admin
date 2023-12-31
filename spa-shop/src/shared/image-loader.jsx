import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function ImageLoader({ src, alt, ...rest }) {
  const placeholderImg = `/images/stamped_wax.jpg`;

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
          src={placeholderImg}
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
ImageLoader.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
