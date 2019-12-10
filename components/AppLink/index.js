import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'server/routes';
import { useRouter } from 'next/router';
import isModifiedEvent from 'utils/isModifiedEvent';
import isExternalUrl from 'utils/isExternalUrl';

/** @type {(props: AppLink.propTypes) => React.ForwardRefExoticComponent} */
const AppLink = React.forwardRef(
  ({ children, href, targetBlank, download, disabled, routerParams, className, onClick }, ref) => {
    const nextRouter = useRouter();
    const isExternal = useMemo(() => targetBlank || isExternalUrl(href), [href, targetBlank]);
    const link = useMemo(() => {
      /** @type {string} */
      let linkHref = href;

      // Обработка хэшей в ссылке
      if (linkHref && linkHref[0] === '#') {
        linkHref = nextRouter.asPath.replace(/#.*/g, '') + href.match(/#.*$/g)[0];
      }

      return {
        href: linkHref,
        target: isExternal ? '_blank' : null,
        rel: isExternal ? 'nofollow noopener' : null,
      };
    }, [href, isExternal, nextRouter.asPath]);

    /** Слушатель события клика.
     * @constant
     * @type {(e: MouseEvent) => void}
     */
    const onClickHandler = useCallback(
      e => {
        // отмена перехода по ссылке
        // onClick всегда должен быть первым
        if (
          onClick(e) === false ||
          !link.href ||
          disabled ||
          download ||
          isExternal ||
          e.defaultPrevented ||
          e.button !== 0 ||
          isModifiedEvent(e)
        ) {
          return;
        } else {
          e.preventDefault();
          Router.pushRoute(link.href, routerParams);
        }
      },
      [disabled, download, link.href, isExternal, onClick, routerParams],
    );

    return (
      <a
        ref={ref}
        href={link.href}
        rel={link.rel}
        target={link.target}
        disabled={disabled}
        className={className}
        onClick={onClickHandler}
      >
        {children}
      </a>
    );
  },
);

AppLink.displayName = 'AppLink';

AppLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  targetBlank: PropTypes.bool,
  download: PropTypes.bool,
  disabled: PropTypes.bool,
  routerParams: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

AppLink.defaultProps = {
  children: null,
  href: null,
  targetBlank: false,
  download: false,
  disabled: false,
  routerParams: {},
  className: null,
  onClick: () => true,
};

export default AppLink;
