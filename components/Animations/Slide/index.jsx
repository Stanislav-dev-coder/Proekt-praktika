import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

// Components
import Transition from 'react-transition-group/Transition';

/** @type {(props: Slide.propTypes) => React.Component}
 * @example
 * <Slide in={isOpenSlide} duration={350} stagger={30}>
 *      <ul>
 *        <li className="anim-slideItem">Item 1</li>
 *        <li className="anim-slideItem">Item 2</li>
 *        ...
 * </Slide>
 */
const Slide = ({ in: inProp, duration, stagger, children }) => {
  const durationInSeconds = duration / 1000;
  const stagerInSeconds = stagger / 1000;

  /** Открытие слайда.
   * @type {(node: Node) => void}
   */
  const onEnter = useCallback(
    node => {
      const slideItems = node.querySelectorAll('.anim-slideItem');
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
            stagger: stagerInSeconds,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power1.easeOut',
            stagger: stagerInSeconds,
          },
        );
      }
    },
    [durationInSeconds, stagerInSeconds],
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

  /** Обработчик выполняющийся после открытиея слайда.
   * @type {(node: Node) => void}
   */
  const onEntered = useCallback(node => {
    const slideItems = node.querySelectorAll('.anim-slideItem');

    gsap.set(node, { clearProps: 'height, opacity' });

    if (slideItems.length) {
      gsap.set(slideItems, { clearProps: 'transform, opacity' });
    }
  }, []);

  return (
    <Transition
      in={inProp}
      timeout={duration}
      unmountOnExit
      mountOnEnter
      onEnter={onEnter}
      onExit={onExit}
      onEntered={onEntered}
    >
      {children}
    </Transition>
  );
};

Slide.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  stagger: PropTypes.number,
  children: PropTypes.any.isRequired,
};

Slide.defaultProps = {
  in: false,
  duration: 300,
  stagger: 30,
};

export default Slide;
