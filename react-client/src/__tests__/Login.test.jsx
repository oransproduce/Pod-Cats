import React from 'react';
import { mount } from 'enzyme';
import Login from '../components/Login';
import TestWrapper from '../components/TestWrapper';

const mockLogin = jest.fn();

jest.mock('../hooks/useAuth.js', () => {
  return jest.fn(() => ({
     login: mockLogin,
  }));
})

describe('<Login />', () => {
  it('Renders Login title', () => {
    const wrapper = mount(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );
    expect(wrapper.text()).toMatch('Login');
  });
  it('submits username and password', () => {
    const username = 'remy';
    const password = 'password';
    const wrapper = mount(
      <TestWrapper>
        <Login />
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

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin.mock.calls[0][0]).toBe(username);
    expect(mockLogin.mock.calls[0][1]).toBe(password);
  });
});
