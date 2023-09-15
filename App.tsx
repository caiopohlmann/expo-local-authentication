import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { styles } from './styles';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkBiometricEnrollment();
  }, []);

  const checkBiometricEnrollment = async () => {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isBiometricEnrolled) {
      Alert.alert('Login', 'Nenhuma biometria encontrada.');
    }
  };

  const handleAuthentication = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Nenhuma biometria encontrada',
    });

    setIsAuthenticated(auth.success);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo ao seu Aplicativo
      </Text>
      <Text style={styles.subtitle}>
        Usuário conectado: {isAuthenticated ? 'Sim' : 'Não'}
      </Text>
      <Button
        title="Entrar com Biometria"
        onPress={handleAuthentication}
      />
    </View>
  );
}