import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
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

const projects = [
  {
    title: "Kenzie Hub",
    description: "Plataforma completa de autenticação e gerenciamento de usuários com validações avançadas e dashboard interativo.",
    tech: ["React", "TypeScript", "ZOD", "Context API"],
    preview: "/kenzie-hub-preview.jpg",
    github: "#", // Adicione seu link GitHub aqui
    demo: "https://kenzie-hub-liviogabriel1.vercel.app/"
  },
  {
    title: "Hamburgueria Virtual",
    description: "E-commerce dinâmico com carrinho de compras integrado e sistema de busca em tempo real.",
    tech: ["React", "Styled Components", "Framer Motion", "API"],
    preview: "/hamburgueria-preview.jpg",
    github: "#", // Adicione seu link GitHub aqui
    demo: "https://m3-hamburgueria-kenzie-liviogabriel1-liviogabriel1.vercel.app/"
  },
  {
    title: "Git Search",
    description: "Buscador de perfis GitHub com visualização detalhada de repositórios e métricas de desenvolvimento.",
    tech: ["JavaScript", "GitHub API", "Chart.js", "LocalStorage"],
    preview: "/git-search-preview.jpg",
    github: "#", // Adicione seu link GitHub aqui
    demo: "https://kenzie-academy-brasil-developers.github.io/gitSearchBase_liviogabriel1/"
  },
  {
    title: "Open Music",
    description: "Player musical moderno com equalizador visual, temas personalizáveis e controle por gestos.",
    tech: ["JavaScript", "Web Audio API", "GSAP", "Sass"],
    preview: "/open-music-preview.jpg",
    github: "#", // Adicione seu link GitHub aqui
    demo: "https://kenzie-academy-brasil-developers.github.io/open-music-base_liviogabriel1/"
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
                <motion.a 
                  href={project.github} 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  className="link"
                >
                  <FiGithub size={24} color="currentColor" />
                </motion.a>
                
                <motion.a 
                  href={project.demo} 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  className="link"
                >
                  <FiExternalLink size={24} color="currentColor" />
                </motion.a>
              </Links>
            </Content>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default Projects;