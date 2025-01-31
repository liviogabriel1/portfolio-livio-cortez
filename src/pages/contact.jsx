import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub, faLinkedin, faReact, faJs, faNode
} from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase, faCodeBranch, faUserFriends,
  faStar, faDownload, faCertificate, faQrcode, faPaperPlane,
  faUser, faEnvelope, faComment, faEye, faDatabase
} from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import { SkillBubble, SkillsGrid } from '../components/skills';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/contact.css';

const Contact = () => {
  const [githubStats, setGithubStats] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const showConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#2ecc71', '#27ae60', '#1abc9c']
    };

    confetti({ ...defaults, particleCount: count, spread: 100 });
    confetti({ ...defaults, particleCount: count, spread: 100, angle: 60 });
    confetti({ ...defaults, particleCount: count, spread: 100, angle: 120 });
  };

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
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV-LIVIO-GABRIEL.pdf';
    link.download = 'CV-Livio-Santos.pdf';
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showConfetti();
    console.log('Formulário enviado:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const cardStyle = {
    background: 'var(--card-bg)',
    backdropFilter: 'var(--card-blur)',
    WebkitBackdropFilter: 'var(--card-blur)',
  };

  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>📬 Contato</h1>

      <div className="social-grid">
        {/* Card GitHub */}
        <motion.div className="social-card" style={cardStyle} whileHover={{ y: -5 }}>
          <h2><FontAwesomeIcon icon={faGithub} /> GitHub</h2>
          <div className="stats-grid">
            <StatItem icon={faCodeBranch} value={githubStats.public_repos} label="Repositórios" />
            <StatItem icon={faUserFriends} value={githubStats.followers} label="Seguidores" />
            <StatItem icon={faStar} value={githubStats.stars} label="Stars" />
          </div>
          <a
            className="styled-link"
            href="https://github.com/liviogabriel1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clique para visitar →
          </a>
        </motion.div>

        {/* Card LinkedIn */}
        <motion.div className="social-card" style={cardStyle} whileHover={{ y: -5 }}>
          <h2><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</h2>
          <StatItem icon={faBriefcase} value="Full Stack Developer" />
          <StatItem icon={faUserFriends} value="500+ Conexões" />
          <StatItem icon={faCertificate} value="15 Certificados" />
          <a
            className="styled-link"
            href="https://www.linkedin.com/in/l%C3%ADvio-santos-a1965b264/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clique para ver perfil →
          </a>
        </motion.div>

        {/* QR Code Card */}
        <motion.div className="social-card" style={cardStyle} whileHover={{ y: -5 }}>
          <h2><FontAwesomeIcon icon={faQrcode} /> Contato Rápido</h2>
          <div className="qr-code-container">
            <QRCodeSVG
              value={`MECARD:N:Livio Santos;TEL:+5579996757937;EMAIL:iiviogabriel6@gmail.com;;`}
              size={128}
            />
          </div>
          <p className="qr-description">Digitalize para salvar contatos</p>
        </motion.div>
      </div>

      <motion.div className="section">
        <h2>🛠️ Arsenal Tecnológico</h2>
        <SkillsGrid>
          <SkillBubble $color="#61DAFB" $proficiency="90">
            <FontAwesomeIcon icon={faReact} size="2x" />
            <span>React</span>
          </SkillBubble>

          <SkillBubble $color="#3178C6" $proficiency="85">
            <FontAwesomeIcon icon={faJs} size="2x" />
            <span>TypeScript</span>
          </SkillBubble>

          <SkillBubble $color="#4479A1" $proficiency="88">
            <FontAwesomeIcon icon={faDatabase} size="2x" />
            <span>PostgreSQL</span>
          </SkillBubble>

          <div className="mastery-chart">
            <CircularProgressbar
              value={75}
              text={`${75}%`}
              styles={{
                path: { stroke: 'var(--primary)' },
                text: { fill: 'var(--text)', fontSize: '24px' }
              }}
            />
            <h3>Full Stack Mastery</h3>
            <p>Integração perfeita entre front-end e back-end</p>
          </div>
        </SkillsGrid>
      </motion.div>

      <motion.button
        className="download-button"
        onClick={handleDownloadCV}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={faDownload} bounce />
        Baixar Currículo
      </motion.button>

      <div className="contact-form-container">
        <h2><FontAwesomeIcon icon={faPaperPlane} /> Envie uma Mensagem</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              className="styled-input"
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <label
              className={`floating-label ${formData.name.length > 0 ? 'has-value' : ''}`}
              htmlFor="name"
            >
              Seu Nome
            </label>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              className="styled-input"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <label
              className={`floating-label ${formData.email.length > 0 ? 'has-value' : ''}`}
              htmlFor="email"
            >
              Seu Email
            </label>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faComment} className="input-icon" />
            <textarea
              className="styled-textarea"
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <label
              className={`floating-label ${formData.message.length > 0 ? 'has-value' : ''}`}
              htmlFor="message"
            >
              Sua Mensagem
            </label>
          </div>

          <motion.button
            className="submit-button"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Enviar Mensagem
          </motion.button>
        </form>

        <div className="preview-section">
          <h3><FontAwesomeIcon icon={faEye} /> Pré-visualização</h3>
          <p><strong>De:</strong> {formData.name || '[Seu Nome]'}</p>
          <p><strong>Email:</strong> {formData.email || '[seu@email.com]'}</p>
          <p><strong>Mensagem:</strong></p>
          <div className="message-preview">
            {formData.message || <span className="typewriter-text">|</span> || (
              <span className="placeholder">Sua mensagem aparecerá aqui...</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente auxiliar para estatísticas
const StatItem = ({ icon, value, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
    <FontAwesomeIcon icon={icon} size="lg" />
    <div>
      <h3>{value}</h3>
      {label && <p style={{ margin: 0, fontSize: '0.9rem' }}>{label}</p>}
    </div>
  </div>
);

export default Contact;