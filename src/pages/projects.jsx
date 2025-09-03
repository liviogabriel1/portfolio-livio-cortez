import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
    
    h1 {
      font-size: 1.8rem;
    }
  }
`;
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    
    .preview {
      transform: scale(1.05);
      opacity: 0.9;
    }

    .content {
      background: linear-gradient(
        0deg, 
        ${({ theme }) => theme.cardBg} 60%,
        transparent 100%
      );
    }
  }
`;

const PreviewContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const PreviewImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
`;

const Content = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  min-height: 80px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-height: auto;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechBadge = styled.span`
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

// === SOMENTE DraftLab + ShortTrack ===
const projects = [
  {
    title: "LoL DraftLab",
    description:
      "Simulador de draft de LoL com multiplayer (Socket.IO), análise de composição, tutorial guiado e integração com o DDragon (PT-BR).",
    tech: ["React", "Vite", "TypeScript", "Framer Motion", "Socket.IO", "Express", "Node.js"],
    preview: "/draftlab-preview.jpg",
    github: "https://github.com/liviogabriel1/lol-draftlab",
    demo: "https://lol-draftlab.vercel.app/"
  },
  {
    title: "ShortTrack",
    description:
      "Encurtador de links com analytics (cliques, origem, dispositivo), páginas personalizadas, QR Code, autenticação JWT e painel admin. Monorepo com client (Vite+React+Tailwind) e server (Express+Prisma/SQLite).",
    tech: ["React", "Vite", "Tailwind", "TypeScript", "Express", "Prisma", "SQLite", "JWT"],
    preview: "/shorttrack-preview.jpg",
    github: "https://github.com/liviogabriel1/shorttrack",  // ajuste se seu repo estiver privado/diferente
    demo: "https://shorttrack.vercel.app/"
  }
];

const Projects = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Projetos Destacados</h1>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PreviewContainer>
              <PreviewImage
                src={project.preview}
                alt={project.title}
                className="preview"
                loading="lazy"
              />
            </PreviewContainer>

            <Content className="content">
              <Title>{project.title}</Title>
              <Description>{project.description}</Description>

              <TechStack>
                {project.tech.map((tech, i) => (
                  <TechBadge key={i}>{tech}</TechBadge>
                ))}
              </TechStack>

              <Links>
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub de ${project.title}`}
                    whileHover={{ scale: 1.1 }}
                    className="link"
                  >
                    <FiGithub size={24} />
                  </motion.a>
                )}

                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Demo de ${project.title}`}
                    whileHover={{ scale: 1.1 }}
                    className="link"
                  >
                    <FiExternalLink size={24} />
                  </motion.a>
                )}
              </Links>
            </Content>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default Projects;