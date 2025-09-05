import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
    
    h1 {
      font-size: 1.8rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const ExperienceItem = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1rem 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: 4px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px ${({ theme }) => theme.primary}20;
    transform: translateY(-3px);
  }

  h3 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
  }

  small {
    display: block;
    margin-top: 0.5rem;
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    
    h3 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`;

const About = () => {
  const { t } = useTranslation();

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>{t('about.heading')}</h1>
      <p style={{ opacity: 0.85 }}>
        {t('about.intro', { fullName: 'Lívio Gabriel Cortez Marinho Santos' })}
      </p>

      <ExperienceItem
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h3>{t('about.edu.title')}</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{t('about.edu.estacio')}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{t('about.edu.kenzie')}</p>
      </ExperienceItem>

      <ExperienceItem
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h3>{t('about.exp.title')}</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{t('about.exp.rSCI')}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{t('about.exp.tv.estagio')}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{t('about.exp.tv.analista')}</p>
      </ExperienceItem>
    </Container>
  );
};

export default About;