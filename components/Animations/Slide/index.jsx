import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import anim from '@utils/animation';

// Components
import Transition from 'react-transition-group/Transition';

const DEFAULT_STYLE = {
  opacity: 0,
};

/** Анимация появления списка.
 *
 * Для stagger эффекта у дочерних элементов должен
 * быть класс `.anim-slideItem`, который можно переназначить
 * пропсом - staggerClass
 *
 * @type {(props: Slide.propTypes) => React.Component}
 * @example
 * <Slide in={isOpenSlide} duration={350} stagger={30}>
 *      <ul>
 *        <li className="anim-slideItem">Item 1</li>
 *        <li className="anim-slideItem">Item 2</li>
 *        ...
 * </Slide>
 */
const Slide = ({ in: inProp, duration, staggerDuration, staggerClass, children, className }) => {
  /** Открытие слайда.
   * @type {(node: Node) => void}
   */
  const onEnter = useCallback(
    node => {
      const slideItems = node.querySelectorAll(`.${staggerClass}`);
      const reverseItems = Array.prototype.map.call(slideItems, item => item).reverse();

      anim.remove(node);
      anim(node, {
        duration,
        height: [0, node.scrollHeight],
        opacity: [0, 1],
        easing: 'easeOutSine',
      });

      if (slideItems.length) {
        anim.remove(slideItems);
        anim(reverseItems, {
          duration,
          translateY: [-15, 0],
          opacity: [0, 1],
          ease: 'easeOutQuint',
          delay: anim.stagger(staggerDuration),
        });
      }
    },
    [duration, staggerClass, staggerDuration],
  );

  /** Закрытие слайда.
   * @type {(node: Node) => void}
   */
  const onExit = useCallback(
    node => {
      anim.remove(node);
      anim(node, {
        duration,
        height: 0,
        opacity: 0,
        ease: 'easeInSine',
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

Slide.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  staggerDuration: PropTypes.number,
  children: PropTypes.any.isRequired,
  staggerClass: PropTypes.string,
  className: PropTypes.string,
};

Slide.defaultProps = {
  in: false,
  duration: 300,
  staggerDuration: 30,
  staggerClass: 'anim-slideItem',
  className: null,
};

export default Slide;
