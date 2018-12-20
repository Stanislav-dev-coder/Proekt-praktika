import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'server/routes';

export class AppLink extends Component {
	linkRef = React.createRef();

	isModifiedEvent = event => {
		return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	};

	onClick = e => {
		// для открытия ссылки в новом окне
		const { external, targetBlank, href, params, disabled } = this.props;

		if (disabled) return;

		const isExternal = external || href.indexOf('://') >= 0;

		if (this.props.onClick(e) === false) {
			// отмена перехода по ссылке
			return;
		}

		if (!isExternal) {
			if (
				!e.defaultPrevented && // onClick prevented default
				e.button === 0 && // ignore everything but left clicks
				!targetBlank && // let browser handle "target=_blank" etc.
				!this.isModifiedEvent(e) // ignore clicks with modifier keys
			) {
				e.preventDefault();
				Router.pushRoute(href, params);
			}
		}
	};

	getUrl = (href = {}) => (typeof href === 'string' ? href : getBackLink(href));

	render() {
		const {
			className,
			children,
			href,
			onClick,
			external,
			targetBlank,
			download,
			params,
			targetLink,
			disabled,
			...otherProps
		} = this.props;

		const componentProps = {
			target: targetBlank ? '_blank' : undefined,
			rel: targetBlank ? 'nofollow noopener' : undefined,
			download: download ? true : undefined,
		};
		const link = targetLink === '' ? href : targetLink;

		return (
			<a
				{...otherProps}
				{...componentProps}
				href={!disabled ? link : undefined}
				disabled={disabled}
				className={className}
				onClick={targetBlank || download ? onClick : this.onClick}
				ref={this.linkRef}>
				{children}
			</a>
		);
	}
}

AppLink.propTypes = {
	children: PropTypes.node,
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	classNane: PropTypes.string,
	onClick: PropTypes.func,
	external: PropTypes.bool,
	targetBlank: PropTypes.bool,
	params: PropTypes.object,
	targetLink: PropTypes.string,
};

AppLink.defaultProps = {
	href: '/',
	className: '',
	onClick: () => true,
	external: false,
	targetBlank: false,
	children: '',
	params: {},
	targetLink: '',
};

export default AppLink;
