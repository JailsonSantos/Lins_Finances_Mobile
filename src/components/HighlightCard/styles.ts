import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

interface LinearGradientProps {
  color1: string;
  color2: string;
}

interface TypeProps {

  type: 'up' | 'down' | 'total';
  //typeTotalTransaction?: 'positive' | 'negative' | 'zero';
}

export const ViewMain = styled.View``;

export const Container = styled(LinearGradient).attrs((props: LinearGradientProps) => ({
  colors: [props.color1, props.color2],
  start: { x: 1, y: .09 },
  end: { x: 1, y: 1 }
})) <LinearGradientProps>`

  width: ${RFValue(317)}px;
  

  border-radius: 5px;
  border: 0.5px solid ${({ theme }) => theme.colors.shape} ;

  padding: 15px;
  padding-bottom: ${RFValue(20)}px;

  margin-right: 16px;
`;


/* export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type, typeTotalTransaction }) =>
    type === 'total'
      ? (typeTotalTransaction === 'negative' && theme.colors.attention ||
        typeTotalTransaction === 'zero' && theme.colors.secondary ||
        typeTotalTransaction === 'positive' && theme.colors.success)
      : theme.colors.shape};

  width: ${RFValue(300)}px;
  
  border-radius: 5px;
  
  padding: 19px 23px;  
  padding-bottom: ${RFValue(42)}px;
  
  margin-right: 16px;
`; */

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `};

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;


export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  
  margin-top: 20px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;
