import styled from 'styled-components';

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  padding: 2rem;
  position: relative;

  .mastery-chart {
    grid-column: span 2;
    background: ${({ theme }) => theme.cardBg};
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ theme }) => theme.primary}20;
  }

  .tech-group {
    padding: 1.5rem;
    background: ${({ theme }) => theme.cardBg}20;
    border-radius: 15px;
    margin-bottom: 2rem;
    width: 100%;
  }
`;

export const SkillBubble = styled.div`
  position: relative;
  background: ${({ $color }) => $color}15;
  border: 2px solid ${({ $color }) => $color};
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px ${({ $color }) => $color}40;

    &::after {
      content: '${({ $proficiency }) => $proficiency}%';
      position: absolute;
      bottom: -25px;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.text};
    }
  }

  span {
    margin-top: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;