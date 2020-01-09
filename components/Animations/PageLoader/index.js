import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';
import anim from '@utils/animation';

import Transition from 'react-transition-group/Transition';

// Styles
import styles from './styles.styl';

const cx = cn.bind(styles);

const FADE_DURATION = 300;
const STEP_1_DURATION = 600;
const STEP_2_DURATION = 1500;
const STEP_3_DURATION = 5000;

/** @type {(props: PageLoader.propTypes) => React.Component}*/
const PageLoader = ({ in: inProp }) => {
  const loaderRef = useRef();
  const lineRef = useRef();

  /** @type {(node: Node) => void} */
  const killAnimations = useCallback(() => {
    anim.remove(loaderRef.current);
    anim.remove(lineRef.current);
  }, []);

  /** Движение лоадера до 90%
   * @type {(node: Node) => void}
   */
  const onEnter = useCallback(() => {
    killAnimations();

    anim
      .timeline({
        targets: lineRef.current,
      })
      .add({
        opacity: [0, 1],
        duration: FADE_DURATION,
        easing: 'linear',
      })
      .add({
        translateX: ['-100%', '-40%'],
        duration: STEP_1_DURATION,
        easing: 'easeInCubic',
      })
      .add({
        translateX: '-20%',
        duration: STEP_2_DURATION,
        easing: 'easeOutCubic',
      })
      .add({
        translateX: '-10%',
        duration: STEP_3_DURATION,
        easing: 'easeInSine',
      });
  }, [killAnimations]);

  /**
   * Быстрое движение лоадера в конец.
   * @type {(node: Node) => void}
   */
  const onExit = useCallback(() => {
    killAnimations();

    anim(lineRef.current, {
      opacity: [1, 0],
      translateX: 0,
      duration: FADE_DURATION,
      easing: 'linear',
    });
  }, [killAnimations]);

  useEffect(() => {
    return () => {
      killAnimations();
    };
  }, [killAnimations]);

  return (
    <Transition in={inProp} timeout={FADE_DURATION} onEnter={onEnter} onExit={onExit}>
      <div ref={loaderRef} className={cx('PageLoader')}>
        <div className={cx('PageLoader__line')} ref={lineRef} />
      </div>
    </Transition>
  );
};

PageLoader.propTypes = {
  in: PropTypes.bool,
};

PageLoader.defaultProps = {
  in: false,
};

export default PageLoader;
