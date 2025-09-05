import React from "react"; // <- corrige o erro do UMD global
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  position: relative;
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.primary}22`};
  border: 1px solid ${({ theme }) => `${theme.primary}55`};
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
`;

// NOTE: use props TRANSIENTES ($active) para não irem pro DOM
const Option = styled.button<{ $active?: boolean }>`
  position: relative;
  z-index: 1;
  appearance: none;
  background: transparent;
  border: 0;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  font-size: .9rem;
  color: ${({ $active, theme }) => ($active ? theme.cardBg : theme.text)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color .2s ease, transform .06s ease;
  outline: none;

  &:hover { transform: translateY(-1px); }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.cardBg}, 0 0 0 4px ${({ theme }) => theme.primary};
    border-radius: 999px;
  }
`;

const Knob = styled(motion.div)`
  position: absolute;
  inset: 4px;
  width: calc(50% - 4px);
  border-radius: 999px;
  background: ${({ theme }) => theme.primary};
`;

export default function LangToggle() {
    const { i18n } = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "pt").startsWith("pt") ? "pt" : "en";
    const isPT = lang === "pt";

    const setLang = (lng: "pt" | "en") => {
        if (lng === lang) return;
        i18n.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
        document.documentElement.lang = lng === "pt" ? "pt-BR" : "en";
    };

    return (
        <Wrapper role="tablist" aria-label="Language" initial={false}>
            <Knob
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{ left: isPT ? 4 : "calc(50% + 0px)" }}
            />
            <Option
                role="tab"
                aria-selected={isPT}
                $active={isPT}
                onClick={() => setLang("pt")}
            >
                <span role="img" aria-label="Português">🇧🇷</span> PT
            </Option>
            <Option
                role="tab"
                aria-selected={!isPT}
                $active={!isPT}
                onClick={() => setLang("en")}
            >
                <span role="img" aria-label="English">🇺🇸</span> EN
            </Option>
        </Wrapper>
    );
}