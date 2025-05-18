import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTwitter, FaDiscord, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterLogo>
            <Link to="/">
              <span>CRAZY</span>ANIMALS
            </Link>
          </FooterLogo>

          <FooterNav>
            <FooterNavList>
              <FooterNavItem>
                <Link to="/">Главная</Link>
              </FooterNavItem>
              <FooterNavItem>
                <Link to="/about">О нас</Link>
              </FooterNavItem>
              <FooterNavItem>
                <Link to="/apply">Присоединиться</Link>
              </FooterNavItem>
            </FooterNavList>
          </FooterNav>

          <FooterSocial>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <FaDiscord />
            </SocialLink>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="mailto:contact@crazyanimals.com">
              <FaEnvelope />
            </SocialLink>
          </FooterSocial>
        </FooterContent>

        <FooterBottom>
          <p>&copy; {year} CRAZY ANIMALS STUDIO. Все права защищены.</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--secondary-color);
  padding: 3rem 0 1rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;

  a {
    color: var(--text-color);
    text-decoration: none;
  }

  span {
    color: var(--accent-color);
  }
`;

const FooterNav = styled.nav`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FooterNavList = styled.ul`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterNavItem = styled.li`
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-color);
    }
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }
`;

export default Footer; 