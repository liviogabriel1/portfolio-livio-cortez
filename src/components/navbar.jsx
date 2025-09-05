import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import LangToggle from '../components/LangToggle'; // <= novo toggle estiloso

const rgbaHex = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ToggleButton = styled(motion.button)`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  cursor: pointer;
  display: none;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
    order: 2;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${({ theme }) => rgbaHex(theme.text, 0.1)};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 1rem;
    width: calc(100% + 2rem);
    margin: -15px -1rem;
    justify-content: space-between;

    a {
      flex: 1 1 auto;
      min-width: 45%;
      text-align: center;
      box-sizing: border-box;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0.8rem;
    margin: -7px -0.8rem;
    width: calc(100% + 1.6rem);

    a {
      min-width: 40%;
      font-size: 0.85rem;
      padding: 0.5rem !important;
    }
  }
`;

/* controls do lado direito (tema + idioma) */
const RightControls = styled.div`
  position: absolute;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    position: static;
    order: 1;
  }
`;

const NavLinksContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.cardBg};
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    z-index: 99;
    gap: 2rem;
    overflow-y: auto;
  }
`;

const NavLink = motion(styled(Link)`
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.text)};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: ${({ $isActive }) => ($isActive ? '70%' : '0%')};
    height: 2px;
    background: ${({ theme }) => theme.primary};
    margin: 0 auto;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  &:hover::after {
    width: ${({ $isActive }) => ($isActive ? '70%' : '50%')};
  }

  &:hover {
    background: ${({ $isActive, theme }) =>
    !$isActive && `linear-gradient(45deg, ${theme.primary}20, ${theme.secondary}20)`};
    color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.text)};
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`);

const DesktopLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: -1rem;
    right: -1rem;
    background: ${({ theme }) => theme.cardBg};
    padding: 1rem 2rem;
    gap: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') }
  ];

  return (
    <Nav>
      {/* Botão do menu hamburguer (mobile apenas) */}
      <MobileMenuButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir menu"
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </MobileMenuButton>

      {/* Links para desktop */}
      <DesktopLinks>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            $isActive={location.pathname === link.to}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.label}
          </NavLink>
        ))}
      </DesktopLinks>

      {/* Menu mobile (animado) */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                $isActive={location.pathname === link.to}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>

      {/* Tema + Idioma alinhados à direita */}
      <RightControls>
        <ToggleButton
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Alternar tema"
          title="Alternar tema"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </ToggleButton>

        <LangToggle />
      </RightControls>
    </Nav>
  );
};

export default Navbar;