import Image from "next/image"

interface Props {
  src: string,
  alt: string,
  className?: string
}

const ImageComponent = ({ src, alt, className = "" }: Props) => {
  // Generate a simple blur data URL
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="20%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f3f4f6" />
      <rect width="${w}" height="${h}" fill="url(#g)" />
    </svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return (
    <div className={`relative ${className}`}>
      <Image 
        src={src} 
        alt={alt || 'Image'} 
        fill={true}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  )
}

export default ImageComponent
