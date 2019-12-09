import React, { Component } from 'react';
import { gsap } from 'gsap';

import Transition from 'react-transition-group/Transition';

const DUR = 300;

class Slide extends Component {
  onEnter = node => {
    const duration = (this.props.duration || DUR) / 1000;
    gsap.killTweensOf(node);
    gsap.fromTo(node, duration, { opacity: 0 }, { opacity: 1 });
  };
  onExit = node => {
    const duration = (this.props.duration || DUR) / 1000;
    gsap.killTweensOf(node);
    gsap.to(node, duration, { opacity: 0 });
  };
  onEntered = node => {
    gsap.set(node, { clearProps: 'opacity' });
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
