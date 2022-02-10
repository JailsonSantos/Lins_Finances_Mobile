/* import React, { useEffect } from 'react';
import { Container, LoadingIcon, ContainerLoading } from './styles';
import Logo from '../../assets/splash.svg';

// Hook useAuth e useNavigation
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

// Tipagem
type NavigationProps = {
  navigate: (screen: string) => void;
}

export function Splash() {
  const { token } = useAuth();
  const navigation = useNavigation<NavigationProps>()

  useEffect(() => {
    async function LoadingToken() {
      if (!token) {
        navigation.navigate('SignIn');
      }
    }

    setTimeout(() => {
      LoadingToken();
    }, 1000);

  }, []);

  return (
    <Container>
      <Logo width="100%" height="100%" />
      <ContainerLoading>
        <LoadingIcon size="large" color="#ffffff" />
      </ContainerLoading>
    </Container>
  );
} */