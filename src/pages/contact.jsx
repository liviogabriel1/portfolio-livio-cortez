import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub, faLinkedin, faReact, faJs, faNode, faDocker, faPython, faAws, faGitAlt
} from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase, faCodeBranch, faUserFriends,
  faStar, faDownload, faCertificate, faQrcode, faPaperPlane, faUser, faEnvelope, faComment, faEye, faDatabase, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import { SkillBubble, SkillsGrid } from '../components/skills';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { QRCodeSVG } from 'qrcode.react';
import emailjs from 'emailjs-com';

const Container = styled(motion.div)`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Social Area
const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr; // Força linhas com mesma altura
  gap: 2rem;
  margin-top: 2rem;
  align-items: stretch; // Estica os itens verticalmente
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SocialCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 20px;
  padding: 2rem;
  color: inherit;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 320px; // Altura mínima fixa
  border: 1px solid ${({ theme }) => theme.primary}20;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.primary};
  }
  
  .stats-grid {
    display: flex;
    flex-direction: column;
    gap: 1.2rem; // Aumentado de 0.8rem
    margin: 1.5rem 0; // Aumentado de 1rem
    width: 100%;
  }

  @media (max-width: 1200px) and (min-width: 1025px) {
    min-height: 350px; // Ajuste para telas médias
  }
  `;
// End Social Area

const LinkEstilizado = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-top: auto;
  display: inline-flex; // Mudar de block para inline-flex
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap; // Impede a quebra de linha
  text-align: right; // Alinha o texto à direita
  position: relative;
  align-self: flex-end; // Mantém alinhado à direita
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }

  span {
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    min-height: auto;
    padding: 1.5rem;
    
    h2 {
      font-size: 1.2rem;
    }
  }
`;

const Section = styled(motion.div)`
background: ${({ theme }) => theme.cardBg};
border-radius: 15px;
padding: 2rem;
margin: 2rem 0;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Contact Area
const ContactFormContainer = styled(Section)`
background: linear-gradient(
  145deg,
    ${({ theme }) => theme.cardBg} 0%,
    ${({ theme }) => theme.body} 100%
  );
  overflow: hidden;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 500px; // Reduzido de 800px
  margin: 1.5rem auto; // Reduzido de 2rem
  padding: 1.5rem; // Reduzido de 2rem
  transform: perspective(800px) rotateX(4deg); // Efeito mais sutil
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 1rem;
    transform: none;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.2rem;
`;

const ContactForm = styled.form`
    display: grid;
    box-sizing: border-box;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  
    input, textarea {
      box-sizing: border-box;
      padding: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      background: ${({ theme }) => theme.inputBg};
      color: ${({ theme }) => theme.text};
      font-size: 1rem;
      transition: all 0.3s;
  
      &:focus {
        border-color: var(--primary);
        outline: none;
        box-shadow: 0 0 8px rgba(46, 204, 113, 0.3);
      }
    }
  
    button {
      padding: 1.2rem;
      background: linear-gradient(45deg, #2ecc71, #27ae60);
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      transition: transform 0.2s, opacity 0.2s;
  
      &:hover {
        transform: scale(1.02);
        opacity: 0.9;
      }
    }
`;
// End Contact Area

const FloatingLabel = styled.label`
  position: absolute;
  left: 2.2rem; // Ajuste de posição
  top: ${({ hasValue }) => (hasValue ? '-0.7rem' : '1rem')}; // Ajustado
  font-size: ${({ hasValue }) => (hasValue ? '0.75rem' : '0.9rem')}; // Ajustado
  color: #888;
  background: ${({ theme }) => theme.cardBg};
  padding: 0 0.5rem;
  transition: all 0.3s ease;
  pointer-events: none;
`;

// Styled Area
const StyledInput = styled.input`
  width: 100%; // Ajuste de largura
  margin: 0; // Centralização
  padding: 0.8rem; // Redução do padding
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem; // Reduzido de 1rem
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary + '30'};
    outline: none;
    
    + ${FloatingLabel} {
      top: -0.8rem;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;; // Mesmo ajuste
  margin: 0;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  min-height: 120px; // Reduzido de 150px
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary + '30'};
    outline: none;
    
    + ${FloatingLabel} {
      top: -0.8rem;
      font-size: 0.8rem;
      color: #2ecc71;
    }
  }
`;
// End Styled Area

// Button Area
const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem; // Reduzido de 1.5rem
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1rem; // Reduzido de 1.1rem
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.primary}80,
      ${({ theme }) => theme.secondary}80
    );
  }
`;

const DownloadButton = styled(motion.button)`
  padding: 1.2rem 2rem; // Reduzido de 1.5rem 3rem
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.5s;
  }

  &:hover::after {
    left: 150%;
  }
`;
// End Button Area

// QRCode Area
const QRCodeContainer = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 10px;
  display: inline-block;
  margin: auto 0; // Centraliza verticalmente
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); // Sombras mais suaves
`;

const QRCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 380px;
  border: 1px solid ${({ theme }) => theme.primary}20;
  box-shadow: 0 8px 32px rgba(0,0,0,0.05);

  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.primary};
  }
`;
// End QRCode Area


const PreviewSection = styled.div`
  position: relative;
  padding-bottom: 15px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
  transition: all 0.3s ease;
  
  h3 {
    color: #2ecc71;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
  }
`;

const TypewriterText = styled.span`
  border-right: 2px solid;
  animation: typing 1s steps(40) infinite;
  display: inline-block; /* Adicionado */
  max-width: 100%; /* Adicionado */
  
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
`;

const Contact = () => {
  const theme = useTheme();
  const [githubStats, setGithubStats] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Efeito de confete
  const showConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#2ecc71', '#27ae60', '#1abc9c']
    };

    confetti({
      ...defaults,
      particleCount: count,
      spread: 100
    });

    confetti({
      ...defaults,
      particleCount: count,
      spread: 100,
      angle: 60
    });

    confetti({
      ...defaults,
      particleCount: count,
      spread: 100,
      angle: 120
    });
  };

  // Buscar dados do GitHub
  useEffect(() => {
    fetch('https://api.github.com/users/liviogabriel1')
      .then(res => res.json())
      .then(data => {
        setGithubStats({
          public_repos: data.public_repos,
          followers: data.followers,
          stars: data.stargazers_count
        });
      });
  }, []);;

  // Download do CV
  const handleDownloadCV = () => {
    // Simulação - coloque seu CV na pasta public
    const link = document.createElement('a');
    link.href = '/CV-LIVIO-GABRIEL.pdf';
    link.download = 'CV-Livio-Santos.pdf';
    link.click();
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        'service_a6x3irk', // Service ID
        'template_5sk97s6', // Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        '5FQDSyT8YPY282Ypm' // User ID
      )
      .then((response) => {
        console.log('Email enviado!', response.status, response.text);
        showConfetti();
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('Falha no envio:', err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Seção Social */}
      <h1>📬 Contato</h1>
      <SocialGrid>
        {/* Card GitHub */}
        <SocialCard whileHover={{ y: -5 }}>
          <h2><FontAwesomeIcon icon={faGithub} /> GitHub</h2>
          <div className="stats-grid">
            <StatItem icon={faCodeBranch} value={githubStats.public_repos} label="Repositórios" />
            <StatItem icon={faUserFriends} value={githubStats.followers} label="Seguidores" />
            <StatItem icon={faStar} value={githubStats.stars} label="Stars" />
          </div>
          <LinkEstilizado
            href="https://github.com/liviogabriel1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clique para visitar →
          </LinkEstilizado>
        </SocialCard>

        {/* Card LinkedIn */}
        <SocialCard whileHover={{ y: -5 }}>
          <h2><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</h2>
          <div className="stats-grid">
            <StatItem icon={faBriefcase} value="Full Stack" label="Área de atuação" />
            <StatItem icon={faUserFriends} value="20+" label="Conexões" />
            <StatItem icon={faCertificate} value="5" label="Certificados" />
          </div>
          <LinkEstilizado
            href="https://www.linkedin.com/in/l%C3%ADvio-santos-a1965b264/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clique para ver perfil →
          </LinkEstilizado>
        </SocialCard>

        {/* QR Code Integrado */}
        <QRCard>
          <h2><FontAwesomeIcon icon={faQrcode} /> Contato Rápido</h2>
          <QRCodeContainer>
            <QRCodeSVG
              value={`MECARD:N:Livio Cortez;TEL:+5579996757937;EMAIL:liviogabriel6@gmail.com;;`}
              size={128}
            />
          </QRCodeContainer>
          <p className="qr-description">Digitalize para salvar contatos</p>
        </QRCard>
      </SocialGrid>

      {/* Botão Download CV */}
      <DownloadButton
        onClick={handleDownloadCV}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={faDownload} bounce />
        Baixar Currículo
      </DownloadButton>

      {/* Formulário de Contato */}
      <ContactFormContainer>
        <h2><FontAwesomeIcon icon={faPaperPlane} /> Envie uma Mensagem</h2>
        <ContactForm onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <FormGroup>
            <FontAwesomeIcon
              icon={faUser}
              className="input-icon"
            />
            <StyledInput
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FloatingLabel
              htmlFor="name"
              hasValue={formData.name.length > 0}
            >
              Seu Nome
            </FloatingLabel>
          </FormGroup>

          {/* Campo Email */}
          <FormGroup>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="input-icon"
            />
            <StyledInput
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <FloatingLabel
              htmlFor="email"
              hasValue={formData.email.length > 0}
            >
              Seu Email
            </FloatingLabel>
          </FormGroup>

          {/* Campo Mensagem */}
          <FormGroup>
            <FontAwesomeIcon
              icon={faComment}
              className="input-icon textarea-icon"
            />
            <StyledTextarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <FloatingLabel
              htmlFor="message"
              hasValue={formData.message.length > 0}
            >
              Sua Mensagem
            </FloatingLabel>
          </FormGroup>

          {/* Botão Submit */}
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Enviando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} />
                Enviar Mensagem
              </>
            )}
          </SubmitButton>
        </ContactForm>

        {/* Pré-visualização */}
        <PreviewSection>
          <h3><FontAwesomeIcon icon={faEye} /> Pré-visualização</h3>
          <p><strong>De:</strong> {formData.name || '[Seu Nome]'}</p>
          <p><strong>Email:</strong> {formData.email || '[seu@email.com]'}</p>
          <p><strong>Mensagem:</strong></p>
          <div className="message-preview">
            {formData.message ? (
              <div style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                {formData.message}
              </div>
            ) : (
              <span className="placeholder">
                Sua mensagem aparecerá aqui...
              </span>
            )}
          </div>
        </PreviewSection>
      </ContactFormContainer>
    </Container>
  );
}

// Componente auxiliar para estatísticas
const StatItem = ({ icon, value, label }) => (
  <div style={{ 
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '0.5rem 0',
    width: '100%'
  }}>
    <FontAwesomeIcon 
      icon={icon} 
      size="lg" 
      style={{ 
        width: '24px',
        textAlign: 'center',
        color: '#2ecc71' // Cor igual ao GitHub
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ 
        fontSize: '1.4rem',
        fontWeight: '600',
        lineHeight: '1.2',
        color: '#fff' // Texto branco igual ao GitHub
      }}>
        {value}
      </div>
      {label && <div style={{ 
        fontSize: '0.85rem',
        opacity: 0.8,
        color: '#888' // Cor da label igual ao GitHub
      }}>{label}</div>}
    </div>
  </div>
);

export default Contact;