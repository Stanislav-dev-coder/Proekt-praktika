import React, { Component } from 'react';
import { gsap } from 'gsap';

import Transition from 'react-transition-group/Transition';

const DUR = 300;

class Slide extends Component {
  onEnter = node => {
    const slideItems = node.querySelectorAll('.anim-slideItem');
    const reverseItems = Array.prototype.map.call(slideItems, item => item).reverse();

    const duration = (this.props.duration || DUR) / 1000;
    gsap.killTweensOf(node);
    gsap.fromTo(
      node,
      duration,
      { height: 0, opacity: 0 },
      { height: node.scrollHeight, opacity: 1, ease: 'power1.easeOut' },
    );
    if (slideItems) {
      gsap.killTweensOf(slideItems);
      gsap.staggerFromTo(
        reverseItems,
        duration,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power1.easeOut' },
        0.03,
      );
    }
  };
  onExit = node => {
    const duration = (this.props.duration || DUR) / 1000;
    gsap.killTweensOf(node);
    gsap.to(node, duration, { height: 0, opacity: 0, ease: 'power1.easeOut' });
  };
  onEntered = node => {
    const slideItems = node.querySelectorAll('.anim-slideItem');
    gsap.set(node, { clearProps: 'height, opacity' });
    gsap.set(slideItems, { clearProps: 'transform, opacity' });
  };
  render() {
    const { in: inProp, duration, children } = this.props;

    return (
      <Transition
        in={inProp}
        timeout={duration || DUR}
        onEnter={this.onEnter}
        onExit={this.onExit}
        onEntered={this.onEntered}
        unmountOnExit
        mountOnEnter
      >
        {children}
      </Transition>
    );
  }
}

export default Slide;
