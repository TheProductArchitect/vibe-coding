import React, { useState, useEffect, useRef } from 'react';

export const FocusSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFocused(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsFocused(true)}
      className={`transition-all duration-700 ease-out ${
        isFocused ? 'opacity-100 scale-100 filter-none' : 'opacity-30 scale-[0.98] blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
