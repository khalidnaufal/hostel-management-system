import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * SplitText Component
 * Animates text character by character using GSAP.
 * This version is built to work with the standard gsap package.
 */
const SplitText = ({
  text = '',
  className = '',
  delay = 50, // stagger delay in ms
  duration = 0.8,
  ease = 'power3.out',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef(null);
  const [chars, setChars] = useState([]);
  const animationCompletedRef = useRef(false);

  useEffect(() => {
    if (text) {
      // Split text into characters, preserving spaces
      setChars(text.split(''));
      animationCompletedRef.current = false;
    }
  }, [text]);

  useGSAP(() => {
    if (chars.length > 0 && containerRef.current) {
      const charElements = containerRef.current.querySelectorAll('.split-char');
      
      gsap.fromTo(charElements, 
        { ...from }, 
        { 
          ...to, 
          duration, 
          ease, 
          stagger: delay / 1000,
          onComplete: () => {
            animationCompletedRef.current = true;
            if (onLetterAnimationComplete) onLetterAnimationComplete();
          },
          overwrite: 'auto'
        }
      );
    }
  }, { dependencies: [chars], scope: containerRef });

  return (
    <span 
      ref={containerRef} 
      className={`split-text-container ${className}`} 
      style={{ 
        textAlign, 
        display: 'inline-block',
        lineHeight: 'normal',
        verticalAlign: 'middle'
      }}
    >
      {chars.map((char, i) => (
        <span 
          key={`${char}-${i}`} 
          className="split-char" 
          style={{ 
            display: 'inline-block', 
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'transform, opacity'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
