const PREFIX = '@';
const DIVIDER = '/';

export default (namespace, actionTypesNames) => {
  const actionTypes = {};

  actionTypesNames.forEach(name => {
    actionTypes[name] = PREFIX + namespace + DIVIDER + name;
  });

  return actionTypes;
};
