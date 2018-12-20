import React, { Component } from 'react';
import { TweenMax } from 'gsap';

import Transition from 'react-transition-group/Transition';

const DUR = 300;

class Slide extends Component {
	onEnter = node => {
		const duration = (this.props.duration || DUR) / 1000;
		TweenMax.killTweensOf(node);
		TweenMax.fromTo(node, duration, { opacity: 0 }, { opacity: 1 });
	};
	onExit = node => {
		const duration = (this.props.duration || DUR) / 1000;
		TweenMax.killTweensOf(node);
		TweenMax.to(node, duration, { opacity: 0 });
	};
	onEntered = node => {
		TweenMax.set(node, { clearProps: 'opacity' });
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
				mountOnEnter>
				{children}
			</Transition>
		);
	}
}

export default Slide;
