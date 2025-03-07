import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getAllContent } from '../../redux/slices/contentSlice';
import { getApplications } from '../../redux/slices/applicationSlice';
import { FaEdit, FaUsers, FaFileAlt, FaHome } from 'react-icons/fa';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { content, isLoading: contentLoading } = useSelector((state) => state.content);
  const { applications, isLoading: applicationsLoading } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(getAllContent());
    dispatch(getApplications());
  }, [dispatch]);

  // Фильтрация новых заявок
  const newApplications = applications.filter((app) => app.status === 'Новая');

  return (
    <DashboardContainer>
      <div className="container">
        <DashboardHeader>
          <h1>Панель администратора</h1>
          <p>Добро пожаловать, {user && user.name}!</p>
        </DashboardHeader>

        <DashboardStats>
          <StatCard>
            <StatIcon>
              <FaFileAlt />
            </StatIcon>
            <StatInfo>
              <StatCount>{content.length}</StatCount>
              <StatLabel>Секций контента</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon>
              <FaUsers />
            </StatIcon>
            <StatInfo>
              <StatCount>{applications.length}</StatCount>
              <StatLabel>Всего заявок</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard highlight>
            <StatIcon>
              <FaUsers />
            </StatIcon>
            <StatInfo>
              <StatCount>{newApplications.length}</StatCount>
              <StatLabel>Новых заявок</StatLabel>
            </StatInfo>
          </StatCard>
        </DashboardStats>

        <DashboardActions>
          <ActionCard to="/admin/content">
            <ActionIcon>
              <FaEdit />
            </ActionIcon>
            <ActionTitle>Управление контентом</ActionTitle>
            <ActionDescription>
              Редактирование текстов и изображений на сайте
            </ActionDescription>
          </ActionCard>

          <ActionCard to="/admin/applications">
            <ActionIcon>
              <FaUsers />
            </ActionIcon>
            <ActionTitle>Управление заявками</ActionTitle>
            <ActionDescription>
              Просмотр и обработка заявок на вступление в команду
            </ActionDescription>
          </ActionCard>

          <ActionCard to="/" target="_blank">
            <ActionIcon>
              <FaHome />
            </ActionIcon>
            <ActionTitle>Просмотр сайта</ActionTitle>
            <ActionDescription>
              Открыть сайт в новой вкладке для просмотра изменений
            </ActionDescription>
          </ActionCard>
        </DashboardActions>

        {newApplications.length > 0 && (
          <NewApplicationsSection>
            <h2>Новые заявки</h2>
            <ApplicationsList>
              {newApplications.map((application) => (
                <ApplicationItem key={application._id}>
                  <ApplicationName>{application.name}</ApplicationName>
                  <ApplicationRole>{application.role}</ApplicationRole>
                  <ApplicationDate>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </ApplicationDate>
                  <ViewButton to={`/admin/applications/${application._id}`}>
                    Просмотреть
                  </ViewButton>
                </ApplicationItem>
              ))}
            </ApplicationsList>
            <ViewAllButton to="/admin/applications">
              Просмотреть все заявки
            </ViewAllButton>
          </NewApplicationsSection>
        )}
      </div>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
  min-height: 100vh;
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
`;

const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-left: 5px solid ${({ highlight }) => (highlight ? 'var(--accent-color)' : 'var(--secondary-color)')};
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-right: 1rem;
  color: var(--accent-color);
`;

const StatInfo = styled.div``;

const StatCount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const DashboardActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ActionCard = styled(Link)`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  }
`;

const ActionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
`;

const ActionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
`;

const ActionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const NewApplicationsSection = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-family: 'Orbitron', sans-serif;
  }
`;

const ApplicationsList = styled.div`
  margin-bottom: 1.5rem;
`;

const ApplicationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const ApplicationName = styled.div`
  flex: 2;
  font-weight: 500;
`;

const ApplicationRole = styled.div`
  flex: 2;
  color: var(--text-secondary);
`;

const ApplicationDate = styled.div`
  flex: 1;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ViewButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  border-radius: 5px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent-color);
    color: var(--text-color);
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--accent-color);
  color: var(--text-color);
  border-radius: 5px;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #ff3333;
  }
`;

export default AdminDashboard; 