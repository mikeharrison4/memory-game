import React, { useState } from 'react';
import { startingNumber } from '../../constants/countdownConfigConstants';
import { useSpring, animated } from 'react-spring';

const Countdown = ({ setShowCountdown }) => {
  const [countdownTimer, setCountdownTimer] = useState(startingNumber);
  const [animationActive, setAnimationActive] = useState(false);

  const contentProps = useSpring({
    opacity: animationActive ? 1 : 0,
    marginLeft: animationActive ? 0 : 100,
  });

  React.useEffect(() => {
    setAnimationActive(true);
    const countdownInterval = setInterval(() => {
      setCountdownTimer(prev => prev - 1);
    }, 1000);
    if (countdownTimer === 0) setShowCountdown(false);
    return () => clearInterval(countdownInterval);
  }, [setShowCountdown, countdownTimer]);

  return (
    <div className='absolute z-10 text-9xl left-2/4 transform -translate-x-1/2'>
      <animated.span className="block" style={contentProps}>{countdownTimer}</animated.span>
    </div>
  );
};

export default Countdown;
