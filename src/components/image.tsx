import { useState } from "react";

interface ImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
}

export default function Image({
  src,
  alt = "image",
  className = "",
  fallbackSrc = "/placeholder.svg",
}: ImageProps) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error || !src ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
