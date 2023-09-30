import Image from "next/image";

const ImageDisplay = ({ imageSrc, imageAlt }) => {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      sizes="(max-width: 480px) 50vw, (max-width: 728px) 33vw (max-width: 976px) 25vw, 100vw"
      priority
      quality={89}
      className="aspect-square rounded-lg object-cover transition-all duration-300 hover:scale-105"
    />
  );
};

export default ImageDisplay;
