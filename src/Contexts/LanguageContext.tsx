import { createContext, useState } from 'react';
import Francais from '../lang/fr.json';
import Anglais from '../lang/en.json';

interface ILanguageContext {
  locale: string;
  messages: Record<string, string>;
  changerLangue: (langue: 'fr' | 'en') => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  locale: 'fr',
  messages: Francais,
  changerLangue: () => {},
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<string>('fr');
  const [messages, setMessages] = useState<Record<string, string>>(Francais);

  const changerLangue = (langue: 'fr' | 'en') => {
    console.log('Changement de langue vers:', langue);
    setLocale(langue);
    setMessages(langue === 'fr' ? Francais : Anglais);
  };

  return (
    <LanguageContext.Provider value={{ locale, messages, changerLangue }}>
      {children}
    </LanguageContext.Provider>
  );
}
