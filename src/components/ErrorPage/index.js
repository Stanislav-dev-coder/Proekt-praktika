import React, { Component } from 'react';

import './styles.styl';

class ErrorPage extends Component {
	render() {
		const is404 = this.props.httpStatus === 404;

		return (
			<div className="ErrorPage" ref={this.imageWrapperRef}>
				{this.props.httpStatus}
				{is404 && (
					<p className="ErrorPage__message">К&nbsp;сожалению, такая страница не&nbsp;найдена</p>
				)}
			</div>
		);
	}
}

export default ErrorPage;
