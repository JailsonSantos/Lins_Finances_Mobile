import React from 'react';
// import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler'


import {
  Main,
  Container,
  Icon,
  Title,
  Button,
} from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

//interface Props extends TouchableOpacityProps {
interface Props extends RectButtonProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({ type, title, isActive, ...rest }: Props) {
  return (
    <Main
      isActive={isActive}
      type={type}
    >
      <Container>
        <Button
          {...rest}
        >
          <Icon
            name={icons[type]}
            type={type}
          />
          <Title>{title}</Title>
        </Button>
      </Container>
    </Main>
  );
}