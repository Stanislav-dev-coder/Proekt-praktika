import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

import Transition from 'react-transition-group/Transition';

import './styles.styl';

/** @type {(props: PageLoader.propTypes) => React.Component}*/
const PageLoader = ({ in: inProp, duration }) => {
  const loaderRef = useRef();
  const lineRef = useRef();
  const durationInSeconds = duration / 1000;

  /** @type {(node: Node) => void} */
  const killTweens = useCallback(() => {
    gsap.killTweensOf(loaderRef.current);
    gsap.killTweensOf(lineRef.current);
  }, []);

  /** Движение лоадера до 90%
   * @type {(node: Node) => void}
   */
  const onEnter = useCallback(() => {
    killTweens();

    gsap.fromTo(loaderRef.current, durationInSeconds, { autoAlpha: 0 }, { autoAlpha: 1 });

    gsap
      .timeline()
      .fromTo(lineRef.current, 0.2, { x: '-100%' }, { x: '-40%', ease: 'power2.inOut' })
      .to(lineRef.current, 2, { x: '-10%', ease: 'none' });
  }, [durationInSeconds, killTweens]);

  /**
   * Быстрое движение лоадера в конец.
   * @type {(node: Node) => void}
   */
  const onExit = useCallback(() => {
    killTweens();

    gsap
      .timeline()
      .to(lineRef.current, durationInSeconds, { x: '0%', ease: 'power2.inOut' })
      .to(loaderRef.current, durationInSeconds, { autoAlpha: 0 }, '-=0.1');
  }, [durationInSeconds, killTweens]);

  useEffect(() => {
    return () => {
      killTweens();
    };
  }, [killTweens]);

  return (
    <Transition in={inProp} timeout={duration} onEnter={onEnter} onExit={onExit}>
      <div ref={loaderRef} className="PageLoader">
        <div className="PageLoader__line" ref={lineRef} />
      </div>
    </Transition>
  );
};

PageLoader.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
};

PageLoader.defaultProps = {
  in: false,
  duration: 300,
};

export default PageLoader;
