import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AboutPage = () => {
  return (
    <AboutContainer>
      <div className="container">
        <AboutHeader>
          <h1>О нашей команде</h1>
          <p>Узнайте больше о нас и наших проектах</p>
        </AboutHeader>

        <AboutSection>
          <SectionTitle>Кто мы</SectionTitle>
          <SectionContent>
            <p>
              Мы - независимая команда разработчиков игр, объединенных общей целью: 
              создавать уникальные игровые миры и незабываемые впечатления для игроков.
            </p>
            <p>
              Наша команда состоит из талантливых программистов, художников, дизайнеров и 
              музыкантов, каждый из которых вносит свой уникальный вклад в наши проекты.
            </p>
          </SectionContent>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Наша миссия</SectionTitle>
          <SectionContent>
            <p>
              Мы стремимся создавать игры, которые не только развлекают, но и заставляют
              задуматься, предлагают новый игровой опыт и остаются в памяти надолго.
            </p>
            <p>
              Мы верим в важность инноваций, качества и творческой свободы в разработке игр.
            </p>
          </SectionContent>
        </AboutSection>

        <AboutSection>
          <SectionTitle>Наш подход</SectionTitle>
          <SectionContent>
            <p>
              Мы придерживаемся итеративного подхода к разработке, постоянно тестируя и
              улучшая наши игры на основе отзывов и данных аналитики.
            </p>
            <p>
              Мы ценим открытое общение с нашим сообществом и стремимся создавать игры,
              которые нравятся как нам, так и нашим игрокам.
            </p>
          </SectionContent>
        </AboutSection>

        <JoinSection>
          <h2>Присоединяйтесь к нам</h2>
          <p>
            Мы всегда ищем талантливых и увлеченных людей для работы над нашими проектами.
            Если вы хотите стать частью нашей команды, оставьте заявку прямо сейчас!
          </p>
          <JoinButton to="/apply">Подать заявку</JoinButton>
        </JoinSection>
      </div>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
  }
`;

const AboutSection = styled.div`
  margin-bottom: 3rem;
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  font-family: 'Orbitron', sans-serif;
`;

const SectionContent = styled.div`
  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
`;

const JoinSection = styled.div`
  text-align: center;
  margin: 4rem 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://via.placeholder.com/1920x500');
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    font-family: 'Orbitron', sans-serif;
  }

  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const JoinButton = styled(Link)`
  display: inline-block;
  background: var(--accent-color);
  color: var(--text-color);
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default AboutPage; 