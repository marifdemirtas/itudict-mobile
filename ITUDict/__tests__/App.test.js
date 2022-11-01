import React from 'react';
import renderer from 'react-test-renderer';

import App from '../src/App';

describe('<App />', () => {
  it('has 2 child', () => {                     // unit test example
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('renders correctly', () => {               // snapshot test example
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
