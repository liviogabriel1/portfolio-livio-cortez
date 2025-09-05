import { motion } from 'framer-motion';
import { FiGithub, FiMail } from 'react-icons/fi';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import Avatar from '../components/avatar';

const Container = styled(motion.div)`
  position: relative;
  z-index: 1;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
    
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const HighlightText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ContactButton = styled(motion.a).attrs({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
})`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    
    svg {
      width: 16px;
    }
  }
`;

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeroSection>
        <Avatar src="/livio-avatar.jpg" />

        <div>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            {/* Título com o nome destacado, preservando o HighlightText */}
            <Trans i18nKey="home.titleRich" values={{ name: 'Lívio Cortez' }}>
              Olá, eu sou <HighlightText>Lívio Cortez</HighlightText>
            </Trans>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: '1.2rem', lineHeight: '1.6' }}
          >
            {/* Parágrafo com os trechos em destaque preservados */}
            <Trans i18nKey="home.role">
              Desenvolvedor <HighlightText /> com expertise em criar soluções escaláveis e
              performáticas. Combinando habilidades técnicas sólidas com visão estratégica para
              entregar projetos que unem <HighlightText /> e <HighlightText />.
            </Trans>
          </motion.p>

          <SkillsGrid>
            <SkillCard whileHover={{ y: -5 }}>
              <h3>{t('home.skill.front')}</h3>
              <p>{t('home.skill.front.items')}</p>
            </SkillCard>

            <SkillCard whileHover={{ y: -5 }}>
              <h3>{t('home.skill.back')}</h3>
              <p>{t('home.skill.back.items')}</p>
            </SkillCard>

            <SkillCard whileHover={{ y: -5 }}>
              <h3>{t('home.skill.cloud')}</h3>
              <p>{t('home.skill.cloud.items')}</p>
            </SkillCard>
          </SkillsGrid>

          <ContactButtons>
            <ContactButton
              href="mailto:liviogabriel6@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'mailto:liviogabriel6@gmail.com';
              }}
            >
              <FiMail size={20} />
              {t('home.btn.contact')}
            </ContactButton>

            <ContactButton
              href="https://github.com/liviogabriel1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#333' }}
            >
              <FiGithub size={20} />
              {t('home.btn.github')}
            </ContactButton>
          </ContactButtons>
        </div>
      </HeroSection>
    </Container>
  );
};

export default Home;