import { Fragment } from 'react';

// Splits text into per-letter spans for staggered CSS entrance animations (rno1 About-style).
// Words are kept intact so lines only break between words. The full text stays readable
// to screen readers via a visually hidden copy; the letter spans are hidden from them.
export default function LetterReveal({
  as: Tag = 'p',
  text,
  className = '',
  variant = 'drop', // 'drop' = letters fall in from above, 'rise' = letters fade up
  delay = 0, // seconds before the first letter starts
  stagger = 0.05, // seconds between letters
}) {
  let index = 0;
  const words = text.split(' ');

  return (
    <Tag className={`letter-reveal letter-reveal--${variant} ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="letter-reveal__word" aria-hidden="true">
            {[...word].map((char, c) => {
              const style = { animationDelay: `${(delay + index * stagger).toFixed(3)}s` };
              index += 1;
              return (
                <span key={c} className="letter-reveal__char" style={style}>{char}</span>
              );
            })}
          </span>
          {w < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
