import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorPage from './index';

configure({ adapter: new Adapter() });

describe('Component: ErrorPage', () => {
    it('renders ErrorPage with statusCode 418', () => {
        const wrapper = mount(
            <ErrorPage statusCode={418} />
        );

        expect(wrapper.prop('statusCode')).toEqual(418);
        // expect(wrapper.prop('children')).toEqual('Internal Server Error');
    });

})