import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import anim from '@ch/animation';

import Transition from 'react-transition-group/Transition';

const DEFAULT_STYLE = {
  opacity: 0,
};

/** Анимация появления элемента по флагу in.
 * @type {(props: Fade.propTypes) => React.Component}
 */
const Fade = ({ in: inProp, duration, children, className }) => {
  /** Обработчик для появления элемента.
   * @type {(node: Node) => void}
   */
  const onEnter = useCallback(
    node => {
      anim.remove(node);
      anim(node, {
        duration,
        opacity: 1,
        ease: 'easeOut',
      });
    },
    [duration],
  );

  /** Обработчик для скрытия элемента.
   * @type {(node: Node) => void}
   */
  const onExit = useCallback(
    node => {
      anim.remove(node);
      anim(node, {
        duration,
        opacity: 0,
        ease: 'easeIn',
      });
    },
    [duration],
  );

  return (
    <Transition in={inProp} timeout={duration} mountOnEnter onEnter={onEnter} onExit={onExit}>
      <div className={className} style={DEFAULT_STYLE}>
        {children}
      </div>
    </Transition>
  );
};

Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

Fade.defaultProps = {
  in: false,
  duration: 300,
  className: null,
};

export default Fade;
