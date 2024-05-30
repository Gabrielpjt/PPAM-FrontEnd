import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { UsersContext } from "../contexts/UserContext";
import { login } from '../util/auth';

function LoginScreen({navigation}) {
  const { users, setUsers } = useContext(UsersContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  async function loginHandler({ akun }) {
    setIsAuthenticating(true);
    //await login(akun);
    
    try {
      const user = await login(akun);
      console.log(user);
      setUsers(user);
      navigation.replace('App',{screen: 'Home'});
    }catch(error){
      'Authentication failed!'
    }
    // if (users.id != undefined) {
    //   navigation.replace('App',{screen: 'Home'});
    // } else {
    //   Alert.alert('Error', 'Login failed');
    // }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;