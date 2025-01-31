import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';

const AvatarContainer = styled(motion.div)`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  margin: 2rem auto;
  position: relative;
  perspective: 1000px;
  cursor: pointer;

  .inner {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.3s ease-out;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
`;

const Avatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [-15, 15], { clamp: true });
  const rotateY = useTransform(x, [0, 1], [15, -15], { clamp: true });

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const xValue = (e.clientX - bounds.left) / bounds.width;
    const yValue = (e.clientY - bounds.top) / bounds.height;
    
    x.set(xValue);
    y.set(yValue);
  };

  return (
    <AvatarContainer
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
    >
      <motion.div
        className="inner"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.05 : 1,
        }}
      >
        <picture>
          <source srcSet="/livio-avatar.webp" type="image/webp" />
          <img 
            src="/livio-avatar.jpg" 
            alt="Lívio Santos"
            loading="eager"
            aria-describedby="avatar-description"
            role="img"
          />
        </picture>
      </motion.div>
      
      <span id="avatar-description" className="sr-only">
        Foto profissional de Lívio Santos, Desenvolvedor Full Stack
      </span>
    </AvatarContainer>
  );
};

export default Avatar;