import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { createApplication, reset } from '../redux/slices/applicationSlice';

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    otherRole: '',
    experience: '',
    portfolio: '',
    message: '',
  });

  const { name, email, phone, role, otherRole, experience, portfolio, message } = formData;

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message: responseMessage } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (isError) {
      toast.error(responseMessage);
    }

    if (isSuccess) {
      toast.success('Заявка успешно отправлена!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        otherRole: '',
        experience: '',
        portfolio: '',
        message: '',
      });
    }

    dispatch(reset());
  }, [isError, isSuccess, responseMessage, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      name,
      email,
      phone,
      role,
      otherRole,
      experience,
      portfolio,
      message,
    };

    dispatch(createApplication(applicationData));
  };

  return (
    <ApplicationContainer>
      <div className="container">
        <ApplicationContent>
          <ApplicationHeader>
            <h1>Присоединиться к команде</h1>
            <p>
              Мы всегда ищем талантливых и увлеченных людей для работы над нашими проектами.
              Заполните форму ниже, и мы свяжемся с вами в ближайшее время.
            </p>
          </ApplicationHeader>

          <ApplicationForm onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Имя *</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email *</FormLabel>
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
              <FormLabel htmlFor="phone">Телефон *</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="role">Желаемая роль *</FormLabel>
              <FormSelect
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                required
              >
                <option value="">Выберите роль</option>
                <option value="Программист">Программист</option>
                <option value="Дизайнер">Дизайнер</option>
                <option value="Художник">Художник</option>
                <option value="3D-моделлер">3D-моделлер</option>
                <option value="Геймдизайнер">Геймдизайнер</option>
                <option value="Звукорежиссер">Звукорежиссер</option>
                <option value="Композитор">Композитор</option>
                <option value="Сценарист">Сценарист</option>
                <option value="Маркетолог">Маркетолог</option>
                <option value="Другое">Другое</option>
              </FormSelect>
            </FormGroup>

            {role === 'Другое' && (
              <FormGroup>
                <FormLabel htmlFor="otherRole">Укажите вашу роль *</FormLabel>
                <FormInput
                  type="text"
                  id="otherRole"
                  name="otherRole"
                  value={otherRole}
                  onChange={onChange}
                  required
                />
              </FormGroup>
            )}

            <FormGroup>
              <FormLabel htmlFor="experience">Опыт работы *</FormLabel>
              <FormTextarea
                id="experience"
                name="experience"
                value={experience}
                onChange={onChange}
                rows="5"
                placeholder="Расскажите о вашем опыте работы, навыках и проектах, в которых вы участвовали"
                required
              ></FormTextarea>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="portfolio">Ссылка на портфолио</FormLabel>
              <FormInput
                type="url"
                id="portfolio"
                name="portfolio"
                value={portfolio}
                onChange={onChange}
                placeholder="https://your-portfolio.com"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="message">Дополнительная информация</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={message}
                onChange={onChange}
                rows="5"
                placeholder="Расскажите, почему вы хотите присоединиться к нашей команде и что вы можете предложить"
              ></FormTextarea>
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Отправка...' : 'Отправить заявку'}
            </SubmitButton>
          </ApplicationForm>
        </ApplicationContent>
      </div>
    </ApplicationContainer>
  );
};

const ApplicationContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
`;

const ApplicationContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ApplicationHeader = styled.div`
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
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ApplicationForm = styled.form`
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

const FormSelect = styled.select`
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
  background: #222;
  color: var(--text-color);
  resize: vertical;
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

export default ApplicationPage; 