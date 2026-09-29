import React, { useState, useRef, useEffect } from 'react';

interface GlowLetterProps {
  char: string;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'white';
}

const IndividualLetter: React.FC<GlowLetterProps> = ({ char, className = '', glowColor = 'purple' }) => {
  const [isLit, setIsLit] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    setIsLit(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsLit(false);
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const glowShadows = {
    purple: '0 0 14px rgba(192, 132, 252, 0.95), 0 0 28px rgba(147, 51, 234, 0.75)',
    cyan: '0 0 14px rgba(56, 189, 248, 0.95), 0 0 28px rgba(14, 165, 233, 0.75)',
    white: '0 0 14px rgba(255, 255, 255, 0.95), 0 0 28px rgba(192, 132, 252, 0.6)',
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      style={{
        textShadow: isLit ? glowShadows[glowColor] : undefined,
        transform: isLit ? 'translateY(-4px)' : 'translateY(0)',
        willChange: 'transform, color, text-shadow',
      }}
      className={`inline-block transition-all duration-200 ease-out cursor-default select-none ${
        isLit ? 'text-[#E9D5FF] z-10 relative' : ''
      } ${className}`}
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
  glowColor?: 'purple' | 'cyan' | 'white';
}

export const GlowLetters: React.FC<GlowLettersProps> = ({
  text,
  className = '',
  wordClassName = '',
  letterClassName = '',
  glowColor = 'purple',
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline ${className}`}>
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
    </span>
  );
};

