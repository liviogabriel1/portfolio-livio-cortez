import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import styled from 'styled-components';

const ParticlesContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
`;

const ParticlesBackground = ({ theme }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesContainer>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: theme === 'dark'
                ? ["#817BFF", "#FF7B95"] // Cores do darkTheme
                : ["#6C63FF", "#FF6584"] // Cores do lightTheme
            },
            opacity: {
              value: theme === 'dark' ? 0.3 : 0.5
            },
            size: {
              value: 3
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false
            },
            links: {
              enable: true,
              distance: 150,
              color: theme === 'dark' ? "#817BFF" : "#6C63FF",
              opacity: theme === 'dark' ? 0.2 : 0.4,
              width: 1
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              }
            }
          },
          retina_detect: true
        }}
      />
    </ParticlesContainer>
  );
};

export default ParticlesBackground;