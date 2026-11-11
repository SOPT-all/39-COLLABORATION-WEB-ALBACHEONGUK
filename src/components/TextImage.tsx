type TextImageProps = {
  src: string;
  label: string;
  width: number;
  height: number;
};

function TextImage({ src, label, width, height }: TextImageProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-block shrink-0 bg-current"
      style={{
        width,
        height,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
      }}
    />
  );
}

export default TextImage;
