import objectToQuery from '../lib/objectToQuery';

describe('@helpers', () => {
  it('objectToQuery - объект к строке', () => {
    expect(objectToQuery('/')).toEqual('');

    expect(objectToQuery(undefined)).toEqual('');

    expect(objectToQuery({})).toEqual('?');

    expect(objectToQuery({
      a: 1,
      b: 2,
    })).toEqual('?a=1&b=2');

    expect(objectToQuery({
      a: 'hello world!',
      'js - is good': 2,
    })).toEqual('?a=hello%20world!&js%20-%20is%20good=2');

    expect(objectToQuery({
      a: 1,
      b: 2,
    }, {
      prefix: ''
    })).toEqual('a=1&b=2');
  })
});