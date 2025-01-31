export const lightTheme = {
    body: '#f9f9f9',
    text: '#2A2D3E',
    primary: '#6C63FF',
    secondary: '#FF6584',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    particleColor: 'rgba(108, 99, 255, 0.1)',
    navActive: '#6C63FF',
    navInactive: '#2A2D3E',
    inputBg: 'rgba(255, 255, 255, 0.9)',        // Adicionei
    toggleBg: '#e9ecef',                  // Adicionei
    cardBorder: 'rgba(0, 0, 0, 0.1)',     // Caso precise
    buttonHover: '#5a52e6'                // Exemplo adicional
};

export const darkTheme = {
    body: '#0a0a0a',
    text: '#EEEEEE',
    primary: '#817BFF',
    secondary: '#FF7B95',
    cardBg: 'rgba(25, 25, 35, 0.95)',
    particleColor: 'rgba(255, 255, 255, 0.05)',
    navActive: '#817BFF',
    navInactive: '#CCCCCC',
    inputBg: 'rgba(0, 0, 0, 0.25)',  // Adicionei
    toggleBg: '#2c3e50',                 // Adicionei
    cardBorder: 'rgba(255, 255, 255, 0.1)', // Caso precise
    buttonHover: '#6d65ff'                // Exemplo adicional
};

const GlobalStyle = createGlobalStyle`
  :root {
    --card-bg: ${({ theme }) => theme.cardBg};
    --card-border: ${({ theme }) => theme.cardBorder};
    --input-bg: ${({ theme }) => theme.inputBg};
    --card-blur: blur(12px);
  }
`;