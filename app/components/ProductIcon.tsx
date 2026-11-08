export default function ProductIcon({
  src,
  className = "h-8 w-8",
}: {
  src: string;
  className?: string;
}) {
  const isUrl = /^(https?:)?\/\//.test(src) || src.startsWith("/") || src.startsWith("data:");

  if (isUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className={`${className} object-contain`} />
    );
  }
  return <span>{src}</span>;
}