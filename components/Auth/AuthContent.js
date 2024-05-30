import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation  } from '@react-navigation/native';

import AuthForm from './AuthForm';
import { Colors } from '../../constants/style';
import FlatButton from '../ui/FlatButton';


function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    nama: false,
    password: false,
    confirmNama: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    // TODO: Tambahkan fungsionalitas untuk switch auth mode
    if (isLogin) {
      navigation.navigate('Signup');
    }else {
      navigation.navigate('Login')
    }
  }

  function submitHandler(credentials) {
    let { nama, confirmNama, password, confirmPassword } = credentials;

    nama = nama.trim();
    password = password.trim();

    const namaIsValid = true;
    const passwordIsValid = password.length > 6;
    const namaAreEqual = nama === confirmNama;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !namaIsValid ||
      !passwordIsValid ||
      (!isLogin && (!namaAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        nama: !namaIsValid,
        confirmNama: !namaIsValid || !namaAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    onAuthenticate({ akun: credentials });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary800,
    padding: 16, // Tambahkan padding untuk spasi di sekitar konten
  },
  buttons: {
    marginTop: 8,
  },
});
