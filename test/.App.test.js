import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { App } from '../src/client/components/App';

describe('<App />', () => {
  it('should have the name: Layout', () => {
    const TestComponent = () => <App />;
    const wrapper = shallow(<TestComponent />);
    expect(wrapper.name()).to.equal('App');
  });
});
