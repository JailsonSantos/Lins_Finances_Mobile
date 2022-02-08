import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Amount,
  Footer,
  Category,
  IconArea,
  IconButton,
  Icon,
  CategoryName,
  Date,
} from './styles';


export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
  onPress: () => void;
}

interface Props extends RectButtonProps {
  data: TransactionCardProps;
}

export function TransactionCard({ data, onPress }: Props) {

  const [category] = categories.filter(
    item => item.key === data.category
  );

  const { amount, date } = data;

  // Amount Formatted
  function convertToReal(value: number) {
    const string = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return string.replace('R$', 'R$ ');
  }

  const amountInReal = convertToReal(Number(amount));

  // Date Formatted
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>

        <IconArea>
          <IconButton onPress={onPress}>
            <Icon name="trash" />
          </IconButton>
        </IconArea>
      </Header>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {amountInReal}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{day}-{month}-{year}</Date>
      </Footer>

    </Container>
  )
}