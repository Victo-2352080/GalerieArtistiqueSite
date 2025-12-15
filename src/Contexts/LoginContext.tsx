import axios from 'axios';
import { createContext, useState } from 'react';

export type LoginContextType = {
  isLoggedIn: boolean;
  token: string;
  login: (courriel: string, motDePasse: string) => Promise<boolean>;
  logout: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  token: '',
  login: () => new Promise<boolean>(() => false),
  logout: () => {},
});

export default function LoginProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const login = async (
    courriel: string,
    motDePasse: string,
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        'https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/generatetoken',
        {
          utilisateurLogin: {
            courriel,
            motDePasse,
          },
        },
      );

      setToken(response.data.token);
      setIsLoggedIn(true);
      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return false;
      }
      throw error;
    }
  };

  function logout() {
    setToken('');
    setIsLoggedIn(false);
  }

  const values = { isLoggedIn, token, login, logout };

  return (
    <LoginContext.Provider value={values}>
      {props.children}
    </LoginContext.Provider>
  );
}
