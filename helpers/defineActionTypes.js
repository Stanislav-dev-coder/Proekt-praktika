const prefix = '@';
const divider = '/';

export default (namespace, actionTypesNames) => {
	const actionTypes = {};

	actionTypesNames.forEach(name => {
		actionTypes[name] = prefix + namespace + divider + name;
	});

	return actionTypes;
};
