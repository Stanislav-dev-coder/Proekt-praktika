import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hooks
import { useRouter } from 'next/router';
import useRoute from '../hooks/useRoute';

// Utils
import isModifiedEvent from '@utils/helpers/lib/isModifiedEvent';
import isExternalUrl from '@utils/helpers/lib/isExternalUrl';
import objectToQuery from '@utils/helpers/lib/objectToQuery';

/** @type {(props: Link.propTypes) => React.ForwardRefExoticComponent} */
const Link = React.forwardRef(
  ({ children, href, targetBlank, download, disabled, options, className, onClick }, ref) => {
    const route = useRoute(href);
    const nextRouter = useRouter();
    const isExternal = useMemo(() => targetBlank || isExternalUrl(href), [href, targetBlank]);
    const linkMetaInfo = useMemo(() => {
      return {
        target: isExternal ? '_blank' : null,
        rel: isExternal ? 'nofollow noopener' : null,
      };
    }, [isExternal]);

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
          !route ||
          disabled ||
          download ||
          e.defaultPrevented ||
          e.button !== 0 ||
          isModifiedEvent(e)
        ) {
          return;
        } else {
          e.preventDefault();

          const routePathToPage = `${route.page}${objectToQuery(route.getParams(href))}`;

          nextRouter.push(routePathToPage, href, options);
        }
      },
      [disabled, download, href, nextRouter, onClick, options, route],
    );

    return (
      <a
        ref={ref}
        href={href}
        rel={linkMetaInfo.rel}
        target={linkMetaInfo.target}
        disabled={disabled}
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
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
