import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hooks
import Router from 'next/router';
import useRoute from '../hooks/useRoute';

// Utils
import isModifiedEvent from '@ch/helpers/lib/isModifiedEvent';
import isExternalUrl from '@ch/helpers/lib/isExternalUrl';
import objectToQuery from '@ch/helpers/lib/objectToQuery';

/** @type {(props: Link.propTypes) => React.ForwardRefExoticComponent} */
const Link = React.forwardRef(
  ({ children, href, targetBlank, download, disabled, options, className, onClick }, ref) => {
    const isChangingRoute = useRef();
    const route = useRoute(href);

    const isExternal = useMemo(() => targetBlank || isExternalUrl(href), [href, targetBlank]);
    const target = useMemo(() => ((isExternal ? '_blank' : null)), [isExternal]);
    const rel = useMemo(() => ((isExternal ? 'nofollow noopener' : null)), [isExternal]);

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
          isExternal ||
          disabled ||
          download ||
          e.defaultPrevented ||
          e.button !== 0 ||
          !route ||
          isModifiedEvent(e)
        ) {
          return;
        } else {
          e.preventDefault();

          // TODO: Поведение отличается от нативного
          // Отмена перехода если роут меняется
          if (!isChangingRoute.current) {
            const routePathToPage = `${route.page}${objectToQuery(route.getParams(href))}`;

            Router.push(routePathToPage, href, options);
          }
        }
      },
      [disabled, download, href, isExternal, onClick, options, route],
    );

    useEffect(() => {
      function routeChangeStart() {
        isChangingRoute.current = true;
      }

      function routeChangeComplete() {
        isChangingRoute.current = false;
      }

      Router.router.events.on('routeChangeStart', routeChangeStart);
      Router.router.events.on('routeChangeComplete', routeChangeComplete);

      return () => {
        Router.router.events.off('routeChangeStart', routeChangeStart);
        Router.router.events.off('routeChangeComplete', routeChangeComplete);
      };
    }, []);

    return (
      <a
        ref={ref}
        href={href}
        rel={rel}
        target={target}
        disabled={disabled}
        download={download}
        className={className}
        onClick={onClickHandler}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';

Link.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  targetBlank: PropTypes.bool,
  download: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  children: null,
  href: null,
  targetBlank: false,
  download: false,
  disabled: false,
  options: {},
  className: null,
  onClick: () => true,
};

export default Link;
