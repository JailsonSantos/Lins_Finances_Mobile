import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

// Switch de testes por Categoria ou grupos de testes
describe('Profile Screen', () => {

  it('should have placeholder correctly in input user name', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome')

    expect(inputName).toBeTruthy();
  });

  it('should be loaded user data', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Jailson');
    expect(inputSurname.props.value).toEqual('Santos');
  });

  it('should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});