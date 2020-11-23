import React, {useCallback, useRef} from 'react';
import {Alert} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  Label,
  ForgotPassword,
  ForgotPasswordText,
  Footer,
  FooterText,
} from './style';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleRecover = function () {
    navigation.navigate('RecoverSenha');
  };

  const handleLogin = useCallback(
    async (dataForm) => {
      try {
        const payload = new FormData();

        payload.append('Email', dataForm.email);
        payload.append('Password', dataForm.password);

        const response = await api.post('Login/Authenticate', payload);

        const user = response.data[0];
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        console.log(user);
        navigation.navigate('Laudo');
      } catch (err) {
        Alert.alert('Atenção', 'Login ou senha invalidos');
      }
    },
    [navigation],
  );

  return (
    <Container>
      <Title>SisVistorias2.0</Title>
      <Label>Faça seu Login</Label>
      <Form ref={formRef} onSubmit={handleLogin}>
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <Input
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>
      <Button
        onPress={() => {
          formRef.current?.submitForm();
        }}>
        Entrar
      </Button>

      <ForgotPassword
        onPress={() => {
          handleRecover;
        }}>
        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
      </ForgotPassword>
      <Footer>
        <FooterText>Desenvolvido com ♥</FooterText>
      </Footer>
    </Container>
  );
};

export default Login;
