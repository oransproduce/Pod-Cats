import React from 'react';
import { mount } from 'enzyme';
import Signup from '../components/Signup';
import TestWrapper from '../components/TestWrapper';

const mockSignup = jest.fn();

jest.mock('../hooks/useAuth.js', () => {
  return jest.fn(() => ({
     signup: mockSignup,
  }));
})


describe('<Signup />', () => {
  it('Renders Signup title', () => {
    const wrapper = mount(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );
    expect(wrapper.text()).toMatch('Signup');
  });
  it('submits username and password', () => {
    const username = 'remy';
    const password = 'password';
    const wrapper = mount(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    wrapper
      .find({ 'data-testid': 'username-field' })
      .find('.MuiInputBase-input')
      .simulate('change', {
        target: {
          value: username,
          name: 'username',
        },
      });

    wrapper
      .find({ 'data-testid': 'password-field' })
      .find('.MuiInputBase-input')
      .simulate('change', {
        target: {
          value: password,
          name: 'password',
        },
      });

    wrapper.update();
    wrapper.find({ 'data-testid': 'auth-form' }).simulate('submit', {
      preventDefault: () => {}
    });

    expect(mockSignup).toHaveBeenCalledTimes(1);
    expect(mockSignup.mock.calls[0][0]).toBe(username);
    expect(mockSignup.mock.calls[0][1]).toBe(password);
  });
});