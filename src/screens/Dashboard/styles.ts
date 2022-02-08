import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { BorderlessButton } from 'react-native-gesture-handler';

import { DataListProps } from '.';

interface ImageEmptyProps {
  source: string;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(31)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const UserWrapper = styled.View`

background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(-10)}px; 

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;

  border-radius: 50px;
`;

export const User = styled.View`
  margin-left: 10px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

// Pode trocar pelo BorderlessButton do GestureHandler
export const LogoutButton = styled.TouchableOpacity``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary}
  font-size: ${RFValue(30)}px;
`;

export const HighlightCards = styled.ScrollView.attrs(
  {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
  }
)`
  width: 100%;

  position: absolute;
  margin-top: ${RFPercentage(13)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  
  margin-top: ${RFPercentage(9)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-top: -5px;
  margin-bottom: 5px;
`;

export const TransactionList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs(
  {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace()
    }
  }
)``;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ImageEmpty = styled.Image<ImageEmptyProps>`
  width: 300px;
  height: 236px;
`;