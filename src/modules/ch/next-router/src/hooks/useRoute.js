import { useContext, useMemo } from 'react';
import RouterContext from '../context/RouterContext';

/** Возвращает роут соответствующий href.
 * @param {string} href
 * @return {import("../Route")}
 */
export default function useRoute(href) {
  const wrappedRouter = useContext(RouterContext);

  return useMemo(() => {
    return wrappedRouter.findRouteByURL(href);
  }, [href, wrappedRouter]);
}
