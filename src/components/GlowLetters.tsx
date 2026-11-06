import React, { useState } from 'react';

export type GlowColor = 'purple' | 'cyan' | 'rose' | 'emerald' | 'white' | 'amber';

interface GlowLetterProps {
  char: string;
  className?: string;
  glowColor?: GlowColor;
}

export const IndividualLetter: React.FC<GlowLetterProps> = ({
  char,
  className = '',
  glowColor = 'purple',
}) => {
  const [touchLit, setTouchLit] = useState(false);

  return (
    <span
      onTouchStart={() => setTouchLit(true)}
      onTouchEnd={() => setTimeout(() => setTouchLit(false), 350)}
      className={`glow-letter glow-letter-${glowColor} ${touchLit ? 'scale-110 -translate-y-1' : ''} ${className}`}
    >
      {char}
    </span>
  );
};

interface GlowLettersProps {
  text: string;
  className?: string;
  wordClassName?: string;
  letterClassName?: string;
  glowColor?: GlowColor;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
}

export const GlowLetters: React.FC<GlowLettersProps> = ({
  text,
  className = '',
  wordClassName = '',
  letterClassName = '',
  glowColor = 'purple',
  as: Component = 'span',
}) => {
  if (!text) return null;
  const words = text.split(' ');

  return (
    <Component className={`inline ${className}`}>
      {words.map((word, wordIdx) => (
        <React.Fragment key={wordIdx}>
          <span className={`inline-block whitespace-nowrap align-baseline ${wordClassName}`}>
            {word.split('').map((char, charIdx) => (
              <IndividualLetter
                key={`${wordIdx}-${charIdx}`}
                char={char}
                className={letterClassName}
                glowColor={glowColor}
              />
            ))}
          </span>
          {wordIdx < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Component>
  );
};
