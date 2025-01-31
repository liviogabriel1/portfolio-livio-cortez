import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const rgbaHex = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${({ theme }) => rgbaHex(theme.text, 0.1)};
`;

const NavLink = motion(styled(Link)`
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  color: ${({ $isActive, theme }) => $isActive ? theme.primary : theme.text};
  font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: ${({ $isActive }) => $isActive ? '70%' : '0%'};
    height: 2px;
    background: ${({ theme }) => theme.primary};
    margin: 0 auto;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  &:hover::after {
    width: ${({ $isActive }) => $isActive ? '70%' : '50%'};
  }

  &:hover {
    background: ${({ $isActive, theme }) =>
    !$isActive && `linear-gradient(45deg, ${theme.primary}20, ${theme.secondary}20)`};
    color: ${({ theme, $isActive }) => $isActive ? theme.primary : theme.text};
  }
`);

const ToggleButton = styled(motion.button)`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageSwitcher = styled(motion.div)`
  position: relative;
  margin-left: 1rem;
  
  select {
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.primary};
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  return (
    <Nav>
      <NavLink
        to="/"
        $isActive={location.pathname === '/'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Início
      </NavLink>

      <NavLink
        to="/about"
        $isActive={location.pathname === '/about'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Sobre
      </NavLink>

      <NavLink
        to="/projects"
        $isActive={location.pathname === '/projects'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Projetos
      </NavLink>

      <NavLink
        to="/contact"
        $isActive={location.pathname === '/contact'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Contato
      </NavLink>

      <ToggleButton
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </ToggleButton>
    </Nav>
  );
};

export default Navbar;