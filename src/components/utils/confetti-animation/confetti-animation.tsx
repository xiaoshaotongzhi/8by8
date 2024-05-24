'use-client';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { startConfettiTimer } from './start-confetti-timer';

interface ConfettiAnimationProps {
  time: number;
}

/**
 * Component for confetti animation
 *
 * @param time - A number for delay time in milliseconds
 *
 * @returns A confetti component from 'react-confetti' library
 */
export function ConfettiAnimation({
  time,
}: ConfettiAnimationProps): JSX.Element {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [confetti, setConfetti] = useState(
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={showConfetti}
      numberOfPieces={200}
      data-testid="confetti"
    />,
  );

  useEffect(() => {
    startConfettiTimer(time, setShowConfetti);
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.body.offsetHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [time]);

  useEffect(() => {
    setConfetti(
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={showConfetti}
        numberOfPieces={200}
        data-testid="confetti"
      />,
    );
  }, [dimensions.width, dimensions.height, showConfetti]);

  return confetti;
}
