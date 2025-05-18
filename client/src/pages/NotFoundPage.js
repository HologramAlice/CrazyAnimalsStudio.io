import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <ErrorIcon>
          <FaExclamationTriangle />
        </ErrorIcon>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Страница не найдена</ErrorTitle>
        <ErrorMessage>
          Упс! Страница, которую вы ищете, не существует или была перемещена.
        </ErrorMessage>
        <HomeButton to="/">
          <FaHome /> Вернуться на главную
        </HomeButton>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--primary-color);
  padding: 0 1rem;
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 3rem;
  background-color: var(--secondary-color);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const ErrorCode = styled.div`
  font-size: 6rem;
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  line-height: 1;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: 'Orbitron', sans-serif;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-color);
  color: var(--text-color);
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 77, 77, 0.4);
  }
`;

export default NotFoundPage; 