type MixedTextProps = {
  text: string;
  accent: string;
  accentClassName?: string;
};

export default function MixedText({ text, accent, accentClassName = "" }: MixedTextProps) {
  const accentIndex = text.indexOf(accent);

  if (accentIndex === -1) return <>{text}</>;

  const before = text.slice(0, accentIndex);
  const after = text.slice(accentIndex + accent.length);

  return (
    <>
      {before}
      <span
        className={`font-normal italic tracking-normal text-flame ${accentClassName}`}
        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
      >
        {accent}
      </span>
      {after}
    </>
  );
}
