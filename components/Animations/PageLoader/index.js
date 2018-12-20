import React, { Component } from 'react';
import { TweenMax, TimelineMax } from 'gsap';

import Transition from 'react-transition-group/Transition';

import './styles.styl';

const DUR = 300;

class PageLoader extends Component {
	onEnter = node => {
		if (this.tl) this.tl.pause().remove();
		TweenMax.killTweensOf(node);
		TweenMax.killTweensOf(this.line);

		const duration = (this.props.duration || DUR) / 1000;
		TweenMax.killTweensOf(node);
		TweenMax.fromTo(node, duration, { autoAlpha: 0 }, { autoAlpha: 1 });

		this.tl = new TimelineMax();
		this.tl
			.fromTo(this.line, 0.2, { x: '-100%' }, { x: '-40%', ease: Power2.easeInOut })
			.to(this.line, 2, { x: '-10%', ease: Power0.easeNone });
	};
	onExit = node => {
		if (this.tl) this.tl.pause().remove();
		TweenMax.killTweensOf(node);
		TweenMax.killTweensOf(this.line);

		this.tl = new TimelineMax();
		const duration = (this.props.duration || DUR) / 1000;
		this.tl
			.to(this.line, duration, { x: '0%', ease: Power2.easeInOut })
			.to(node, duration, { autoAlpha: 0 }, '-=0.1');
	};

	getLineRef = node => {
		if (node) this.line = node;
	};

	render() {
		const { in: inProp, duration, children } = this.props;

		return (
			<Transition in={inProp} timeout={duration || DUR} onEnter={this.onEnter} onExit={this.onExit}>
				<div className="PageLoader">
					<div className="PageLoader__line" ref={this.getLineRef} />
				</div>
			</Transition>
		);
	}
}

export default PageLoader;
