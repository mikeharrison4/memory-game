import React from 'react';
import { setModeConfig } from '../../redux/reducers/modeConfigReducer';
import { Spring } from 'react-spring/renderprops-universal';
import { useDispatch } from 'react-redux';
import { setShowCountdown } from '../../redux/reducers/countdownReducer';
import { duration, endingNumber, startingNumber, delay } from '../../constants/countdownConfigConstants';
import { delay as syncDelay } from '../../utils';


const Countdown = ({ modePicked }) => {
  const dispatch = useDispatch();

  const handleOnRest = async () => {
    await syncDelay(500);
    dispatch(setModeConfig(modePicked));
    dispatch(setShowCountdown(false));
  };

  return (
    <Spring
      from={{ number: startingNumber }}
      to={{ number: endingNumber }}
      config={{ duration }}
      delay={delay}
      onRest={handleOnRest}
    >
      { ({ number }) => (
        <div className='absolute z-10 text-9xl left-2/4 transform -translate-x-1/2'>
          {number.toFixed()}
        </div>
      )}
    </Spring>
  );
};

export default Countdown;
