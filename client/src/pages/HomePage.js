import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllContent } from '../redux/slices/contentSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { content, isLoading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(getAllContent());
  }, [dispatch]);

  // Фильтрация контента по секциям
  const heroContent = content.find((item) => item.section === 'hero');
  const featuresContent = content.filter((item) => item.section === 'features');
  const aboutContent = content.find((item) => item.section === 'about');

  if (isLoading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <HomeContainer>
      {/* Hero Section */}
      {heroContent ? (
        <HeroSection imageUrl={heroContent.imageUrl}>
          <div className="container">
            <HeroContent>
              <HeroTitle>{heroContent.title}</HeroTitle>
              <HeroSubtitle>{heroContent.subtitle}</HeroSubtitle>
              <HeroText dangerouslySetInnerHTML={{ __html: heroContent.content }} />
              {heroContent.buttonText && (
                <HeroButton to={heroContent.buttonLink || '/apply'}>
                  {heroContent.buttonText}
                </HeroButton>
              )}
            </HeroContent>
          </div>
        </HeroSection>
      ) : (
        <HeroSection>
          <div className="container">
            <HeroContent>
              <HeroTitle>INDIE TEAM</HeroTitle>
              <HeroSubtitle>Создаем игры, которые запомнятся</HeroSubtitle>
              <HeroText>
                Мы - команда талантливых разработчиков, художников и дизайнеров, 
                объединенных страстью к созданию уникальных игровых миров.
              </HeroText>
              <HeroButton to="/apply">Присоединиться к команде</HeroButton>
            </HeroContent>
          </div>
        </HeroSection>
      )}

      {/* Features Section */}
      <FeaturesSection>
        <div className="container">
          <SectionTitle>Наши проекты</SectionTitle>
          <FeaturesGrid>
            {featuresContent.length > 0 ? (
              featuresContent.map((feature) => (
                <FeatureCard key={feature._id}>
                  {feature.imageUrl && <FeatureImage src={feature.imageUrl} alt={feature.title} />}
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText dangerouslySetInnerHTML={{ __html: feature.content }} />
                  {feature.buttonText && (
                    <FeatureButton to={feature.buttonLink || '#'}>
                      {feature.buttonText}
                    </FeatureButton>
                  )}
                </FeatureCard>
              ))
            ) : (
              <>
                <FeatureCard>
                  <FeatureTitle>Проект "Космическая Одиссея"</FeatureTitle>
                  <FeatureText>
                    Научно-фантастическая RPG с элементами выживания в открытом космосе.
                  </FeatureText>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Проект "Тайны Древних"</FeatureTitle>
                  <FeatureText>
                    Приключенческая игра с головоломками в мире древних цивилизаций.
                  </FeatureText>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Проект "Цифровые Миры"</FeatureTitle>
                  <FeatureText>
                    Инновационная стратегия с процедурной генерацией контента.
                  </FeatureText>
                </FeatureCard>
              </>
            )}
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      {/* About Section */}
      {aboutContent ? (
        <AboutSection>
          <div className="container">
            <AboutContent>
              <AboutInfo>
                <SectionTitle>{aboutContent.title}</SectionTitle>
                <AboutText dangerouslySetInnerHTML={{ __html: aboutContent.content }} />
                {aboutContent.buttonText && (
                  <AboutButton to={aboutContent.buttonLink || '/about'}>
                    {aboutContent.buttonText}
                  </AboutButton>
                )}
              </AboutInfo>
              {aboutContent.imageUrl && (
                <AboutImageContainer>
                  <AboutImage src={aboutContent.imageUrl} alt={aboutContent.title} />
                </AboutImageContainer>
              )}
            </AboutContent>
          </div>
        </AboutSection>
      ) : (
        <AboutSection>
          <div className="container">
            <AboutContent>
              <AboutInfo>
                <SectionTitle>О нашей команде</SectionTitle>
                <AboutText>
                  Мы - независимая команда разработчиков игр, объединенных общей целью: 
                  создавать уникальные игровые миры и незабываемые впечатления для игроков.
                  <br /><br />
                  Наша команда состоит из талантливых программистов, художников, дизайнеров и 
                  музыкантов, каждый из которых вносит свой уникальный вклад в наши проекты.
                </AboutText>
                <AboutButton to="/about">Узнать больше</AboutButton>
              </AboutInfo>
              <AboutImageContainer>
                <AboutImage src="https://via.placeholder.com/500x300" alt="О команде" />
              </AboutImageContainer>
            </AboutContent>
          </div>
        </AboutSection>
      )}

      {/* Call to Action */}
      <CTASection>
        <div className="container">
          <CTAContent>
            <CTATitle>Присоединяйтесь к нашей команде</CTATitle>
            <CTAText>
              Мы всегда ищем талантливых и увлеченных людей для работы над нашими проектами.
              Если вы хотите стать частью нашей команды, оставьте заявку прямо сейчас!
            </CTAText>
            <CTAButton to="/apply">Оставить заявку</CTAButton>
          </CTAContent>
        </div>
      </CTASection>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding-top: 60px;
`;

const HeroSection = styled.section`
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://via.placeholder.com/1920x1080)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroText = styled.div`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: var(--accent-color);
  color: var(--text-color);
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-color);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const FeatureText = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeatureButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: var(--accent-color);
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: var(--text-color);
  }
`;

const AboutSection = styled.section`
  padding: 5rem 0;
  background-color: var(--secondary-color);
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutInfo = styled.div``;

const AboutText = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const AboutButton = styled(Link)`
  display: inline-block;
  background: var(--accent-color);
  color: var(--text-color);
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const AboutImageContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://via.placeholder.com/1920x500');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(Link)`
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
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default HomePage; 