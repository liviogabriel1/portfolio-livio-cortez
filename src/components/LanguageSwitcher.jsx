import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}20;
  }
`;

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "pt" ? "en" : "pt";
        i18n.changeLanguage(newLang);
        localStorage.setItem("lang", newLang); // salva escolha do usuário
    };

    return (
        <Button onClick={toggleLanguage}>
            {i18n.language === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
        </Button>
    );
}

export default LanguageSwitcher;