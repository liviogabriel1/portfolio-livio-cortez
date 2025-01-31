import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --card-bg: ${({ theme }) => theme.cardBg};
    --card-border: ${({ theme }) => theme.cardBorder};
    --input-bg: ${({ theme }) => theme.inputBg};
    --card-blur: blur(12px);
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    min-height: 100vh;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: ${({ theme }) => theme.body};
    }
  }
`;