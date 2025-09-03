import { motion } from 'framer-motion';
import styled from 'styled-components';

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
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Sobre Mim</h1>
      <p>Meu nome é Lívio Gabriel Cortez Marinho Santos, sou Desenvolvedor Full Stack com experiência em diversas tecnologias modernas.</p>

      <ExperienceItem
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3>Formação Acadêmica</h3>
        <p>🎓 Análise e Desenvolvimento de Sistemas - Estácio (Fev/2024 - Jun/2026)</p>
        <p>🚀 Desenvolvimento Web Full-Stack - Kenzie Academy Brasil (Mar/2023 - Mai/2024)</p>
      </ExperienceItem>

      <ExperienceItem
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3>Experiência Profissional</h3>
        <p>💼 RSCI - Freelancer (Mar/2023-Mai/2023)<br />
          Desenvolvimento Front End com AngularJS, TypeScript e CSS</p>

        <p>📺 TV Sergipe - Estágio Full-Stack (Dez/2024-Jun/2025)<br />
          Atuação com Tailwind, Docker, MySQL e Postgres em ambiente ágil</p>

        <p>📺 TV Sergipe - Analista de Desenvolvimento de Sistemas Jr. (Ago/2025 - Atualmente)<br />
          Atuação como desenvolvedor full-stack, dando continuidade à evolução de sistemas e novas demandas internas.</p>
      </ExperienceItem>
    </Container>
  );
};

export default About;