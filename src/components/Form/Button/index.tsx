import React from "react";
//import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from 'react-native-gesture-handler';

import { MainContainer, Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <MainContainer>
      <Container onPress={onPress} {...rest}>
        <Title>{title}</Title>
      </Container>
    </MainContainer>
  );
}