
import React, { useState } from 'react';
import { Language } from './types';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);

  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  return <Dashboard language={lang} onLogout={() => setLang(null)} />;
};

export default App;
