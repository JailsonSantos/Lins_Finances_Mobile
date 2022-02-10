import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Variáveis de ambiente
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

// Acessos Google e Apple
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from "react-native";

interface AuthProviderProps {
  children: ReactNode; // Tipagem para um children
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  token: string;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  singOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

// Criando e exportando o contexto de autenticação
export const AuthContext = createContext({} as IAuthContextData);

// Função do AuthProvider
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState('');
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@linsfinances:user';
  const tokenStoragekey = '@linsfinances:token';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLoggedIn = {
          id: String(userInfo.id),
          email: userInfo.email!,
          name: userInfo.given_name!,
          photo: userInfo.picture!
        }

        console.log('Aqui', userLoggedIn);

        setToken(params.access_token);
        setUser(userLoggedIn);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
        await AsyncStorage.setItem(tokenStoragekey, params.access_token);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível fazer login');
      // throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {

        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLoggedIn = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLoggedIn);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível fazer login');
      // throw new Error(error);
    }
  }

  async function singOut() {
    try {
      await AuthSession.revokeAsync({ token }, { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' });
      setUser({} as User);
      setToken('');

      AsyncStorage.removeItem(userStorageKey);
      AsyncStorage.removeItem(tokenStoragekey);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);
      const tokenStoraged = await AsyncStorage.getItem(tokenStoragekey);

      if (userStoraged) {
        const userLoggedIn = JSON.parse(userStoraged) as User;
        setUser(userLoggedIn);
      }
      if (tokenStoraged) {
        setToken(tokenStoraged);
      }
      setUserStorageLoading(false);
    }
    loadUserStorageDate();

  }, []);

  return (
    <AuthContext.Provider value={
      {
        user,
        token,
        signInWithGoogle,
        signInWithApple,
        singOut,
        userStorageLoading
      }
    } >
      {children}
    </AuthContext.Provider >
  );
}

// Hook personalizado
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }