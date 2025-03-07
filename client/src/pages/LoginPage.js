import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { login, reset } from '../redux/slices/authSlice';
import { FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Перенаправление на админ-панель, если пользователь администратор
    if (isSuccess && user) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <LoginContainer>
      <div className="container">
        <LoginContent>
          <LoginHeader>
            <h1>
              <FaSignInAlt /> Вход
            </h1>
            <p>Войдите в систему для доступа к админ-панели</p>
          </LoginHeader>

          <LoginForm onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </SubmitButton>
          </LoginForm>
        </LoginContent>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
  min-height: 100vh;
`;

const LoginContent = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
  }
`;

const LoginForm = styled.form`
  background-color: var(--secondary-color);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
  background: #222;
  color: var(--text-color);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  background: var(--accent-color);
  color: var(--text-color);
  padding: 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff3333;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export default LoginPage; 