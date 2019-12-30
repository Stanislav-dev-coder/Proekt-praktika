import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

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
  const durationInSeconds = duration / 1000;
  const stagerDurationInSeconds = staggerDuration / 1000;

  /** Открытие слайда.
   * @type {(node: Node) => void}
   */
  const onEnter = useCallback(
    node => {
      const slideItems = node.querySelectorAll(`.${staggerClass}`);
      const reverseItems = Array.prototype.map.call(slideItems, item => item).reverse();

      gsap.killTweensOf(node);
      gsap.fromTo(
        node,
        durationInSeconds,
        { height: 0, opacity: 0 },
        { height: node.scrollHeight, opacity: 1, ease: 'power1.easeOut' },
      );

      if (slideItems.length) {
        gsap.killTweensOf(slideItems);
        gsap.fromTo(
          reverseItems,
          durationInSeconds,
          {
            y: -15,
            opacity: 0,
            stagger: stagerDurationInSeconds,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power1.easeOut',
            stagger: stagerDurationInSeconds,
          },
        );
      }
    },
    [durationInSeconds, stagerDurationInSeconds, staggerClass],
  );

  /** Закрытие слайда.
   * @type {(node: Node) => void}
   */
  const onExit = useCallback(
    node => {
      gsap.killTweensOf(node);
      gsap.to(node, durationInSeconds, { height: 0, opacity: 0, ease: 'power1.easeOut' });
    },
    [durationInSeconds],
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
