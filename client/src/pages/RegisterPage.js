import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { register, reset } from '../redux/slices/authSlice';
import { FaUserPlus } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Перенаправление после успешной регистрации
    if (isSuccess && user) {
      navigate('/');
      toast.success('Регистрация прошла успешно!');
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

    if (password !== password2) {
      toast.error('Пароли не совпадают');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <RegisterContainer>
      <div className="container">
        <RegisterContent>
          <RegisterHeader>
            <h1>
              <FaUserPlus /> Регистрация
            </h1>
            <p>Создайте аккаунт для доступа к системе</p>
          </RegisterHeader>

          <RegisterForm onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Имя</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Введите ваше имя"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Введите ваш email"
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
                placeholder="Введите пароль"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password2">Подтверждение пароля</FormLabel>
              <FormInput
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Подтвердите пароль"
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </SubmitButton>
          </RegisterForm>

          <LoginLink to="/login">Уже есть аккаунт? Войти</LoginLink>
        </RegisterContent>
      </div>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
  min-height: 100vh;
`;

const RegisterContent = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const RegisterHeader = styled.div`
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

const RegisterForm = styled.form`
  background-color: var(--secondary-color);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
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

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

export default RegisterPage; 