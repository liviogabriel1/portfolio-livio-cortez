import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { useState, useEffect } from 'react';
import { GlobalStyles } from './styles/globalStyles';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import Contact from './pages/contact';
import Navbar from './components/navbar';
import ParticlesBackground from './components/particlesBackground';
import './i18n'; // se ainda não estiver usando i18n, pode remover esta linha

function getInitialDarkMode() {
  const saved = localStorage.getItem('theme');

  // compatibilidade com valores antigos:
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  if (saved === 'true') return true;   // se já salvou boolean como string
  if (saved === 'false') return false;

  // fallback: preferência do sistema
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return !!prefersDark;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    // guarde sempre como 'dark' ou 'light' (sem JSON)
    const value = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', value);

    // opcional: refletir no <html> para CSS global/particles/etc.
    document.documentElement.setAttribute('data-theme', value);
    // ou: document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <ParticlesBackground theme={isDarkMode ? 'dark' : 'light'} />
        <Navbar toggleTheme={() => setIsDarkMode((v) => !v)} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;