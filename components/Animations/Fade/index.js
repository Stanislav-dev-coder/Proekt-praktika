import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

import Transition from 'react-transition-group/Transition';

/** @type {(props: Fade.propTypes) => React.Component} */
const Fade = ({ in: inProp, duration, children }) => {
  const onEnter = useCallback(
    node => {
      const durationInSeconds = duration / 1000;

      gsap.killTweensOf(node);
      gsap.fromTo(node, durationInSeconds, { opacity: 0 }, { opacity: 1 });
    },
    [duration],
  );

  const onExit = useCallback(node => {
    const duration = duration / 1000;

    gsap.killTweensOf(node);
    gsap.to(node, duration, { opacity: 0 });
  }, []);

  const onEntered = useCallback(node => {
    gsap.set(node, { clearProps: 'opacity' });
  }, []);

  return (
    <Transition
      in={inProp}
      timeout={duration}
      onEnter={onEnter}
      onExit={onExit}
      onEntered={onEntered}
      unmountOnExit
      mountOnEnter
    >
      {children}
    </Transition>
  );
};

Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  children: PropTypes.any.isRequired,
};

Fade.defaultProps = {
  in: false,
  duration: 300,
};

export default Fade;
