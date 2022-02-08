import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Hooks
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

// Components
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadingContainer,
  ImageContainer,
  ImageEmpty
} from './styles';


//import emptyListImage from '../../assets/opps.png';

import emptyListImage from '../../assets/ops.png';


export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
  typeTotalTransaction?: 'positive' | 'negative' | 'zero';
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const { singOut, user } = useAuth();

  const dataKey = `@linsfinances:transactions_user:${user.id}`;

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const [refresh, setRefresh] = useState(false);

  // Calcula a ultima transação realizada
  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {

    const dataArray = collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime());

    console.log('data do array: ', collection);

    const lastTransaction = new Date(
      Math.max.apply(Math, dataArray));


    return dataArray.length === 0
      ? '' : `${type === 'positive' ? 'Última entrada dia ' : 'Última saída dia '} ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  function getTotalIntervalTransactionDate(
    collection: DataListProps[],
  ) {

    const dateArray = collection.map(transaction => new Date(transaction.date).getTime());
    const lastTransaction = new Date(Math.max.apply(Math, dateArray));

    const lastTransactionFormmated = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(lastTransaction);

    const firstTransaction = new Date(Math.min.apply(Math, dateArray));

    const firstTransactionFormmated = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(firstTransaction);

    const firstTransactionYear = firstTransaction.getFullYear();
    const lastTransactionYear = lastTransaction.getFullYear();

    return firstTransactionYear === lastTransactionYear
      ? `${firstTransactionFormmated} ~ ${lastTransactionFormmated}`
      : `${firstTransactionFormmated}. ${firstTransactionYear} ~ ${lastTransactionFormmated}. ${lastTransactionYear}`;
  }

  function convertToReal(value: number) {
    const string = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return string.replace('R$', 'R$ ');
  }

  function totalTransactionsType(value: number) {
    if (value < 0) {
      return 'negative';
    } else if (value === 0) {
      return 'zero';
    } else {
      return 'positive';
    }
  }

  // List all transactions
  async function loadTransactions() {
    //AsyncStorage.removeItem(dataKey);

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        return {
          id: item.id,
          name: item.name,
          amount: item.amount,
          type: item.type,
          category: item.category,
          date: item.date
        }
      });

    setTransactions(transactionsFormatted);

    const lengthArray = transactions.length;

    const lastTransactionEntries = lengthArray === 0 ? '' : getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = lengthArray === 0 ? '' : getLastTransactionDate(transactions, 'negative');
    const totalInterval = lengthArray === 0 ? '' : getTotalIntervalTransactionDate(transactions);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: convertToReal(entriesTotal),
        lastTransaction: lastTransactionEntries,
      },
      expensives: {
        amount: convertToReal(expensiveTotal),
        lastTransaction: lastTransactionExpensives,
      },
      total: {
        amount: convertToReal(total),
        lastTransaction: totalInterval,
        typeTotalTransaction: totalTransactionsType(total),
      }
    });
    setIsLoading(false);
  }

  async function handlerDeleteTransaction(idTransaction: String) {
    setRefresh(false);
    Alert.alert('Revomer transação', 'Term certeza que você deseja remover essa transação?', [
      {
        style: 'cancel',
        text: 'Não',
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          setTransactions(oldTransactions => oldTransactions.filter(transaction => transaction.id !== idTransaction));
          setRefresh(true);
        }
      }
    ]);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  // Monitira a pagina que está em foco e executa
  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []));

  useEffect(() => {
    AsyncStorage.setItem(dataKey, JSON.stringify(transactions));
  }, [transactions])

  useEffect(() => {
    if (refresh === true) {
      loadTransactions();
    }
  }, [refresh]);

  return (
    <Container>

      {
        isLoading ?
          <LoadingContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large" />
          </LoadingContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{ uri: user.photo }}
                  />
                  <User>
                    <UserGreeting>Olá, </UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={singOut}>
                  <Icon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
              />
              <HighlightCard
                type="down"
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
                typeTotalTransaction={highlightData.total.typeTotalTransaction}
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} onPress={() => handlerDeleteTransaction(item.id)} />}
                ListEmptyComponent={
                  <ImageContainer>
                    <ImageEmpty source={emptyListImage} />
                  </ImageContainer>}
              />
            </Transactions>
          </>
      }
    </Container>
  )
}