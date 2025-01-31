import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const rgbaHex = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const SocialCard = styled(motion.a)`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 15px;
  width: 300px;
  min-height: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.primary}20;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: float 4s infinite ease-in-out;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const GitHubStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: auto;
`;

const StatItem = styled.div`
  background: ${({ theme }) => rgbaHex(theme.primary, 0.1)};
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
`;

const SocialLinks = () => {
    const [githubData, setGithubData] = useState(null);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const response = await axios.get('https://api.github.com/users/liviogabriel1');
                setGithubData(response.data);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            }
        };
        fetchGithubData();
    }, []);

    return (
        <Container>
            <SocialCard
                href="https://github.com/liviogabriel1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <h3>GitHub Profile</h3>
                {githubData && (
                    <>
                        <p>@{githubData.login}</p>
                        <GitHubStats>
                            <StatItem>Repositórios: {githubData.public_repos}</StatItem>
                            <StatItem>Seguidores: {githubData.followers}</StatItem>
                            <StatItem>Seguindo: {githubData.following}</StatItem>
                            <StatItem>⭐ Total: {githubData.public_gists}</StatItem>
                        </GitHubStats>
                    </>
                )}
            </SocialCard>

            <SocialCard
                href="https://www.linkedin.com/in/l%C3%ADvio-santos-a1965b264/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <h3>LinkedIn Profile</h3>
                <p>Lívio Santos</p>
                <div style={{ marginTop: 'auto' }}>
                    <StatItem>🚀 Desenvolvedor Full Stack</StatItem>
                    <StatItem style={{ marginTop: '0.5rem' }}>📍 Aracaju/SE</StatItem>
                </div>
            </SocialCard>
        </Container>
    );
};

export default SocialLinks;