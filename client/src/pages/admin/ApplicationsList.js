import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  reset,
} from '../../redux/slices/applicationSlice';
import { FaEye, FaTrash, FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';

const ApplicationsList = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { applications, application, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleViewApplication = (id) => {
    dispatch(getApplicationById(id));
    setSelectedApplication(id);
  };

  const handleStatusChange = (id, status) => {
    dispatch(
      updateApplicationStatus({
        id,
        statusData: { status },
      })
    );
  };

  const handleDeleteApplication = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      dispatch(deleteApplication(id));
      if (selectedApplication === id) {
        setSelectedApplication(null);
      }
    }
  };

  const handleCloseDetails = () => {
    setSelectedApplication(null);
  };

  // Фильтрация заявок по статусу и поиску
  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <ApplicationsContainer>
      <div className="container">
        <ApplicationsHeader>
          <h1>Управление заявками</h1>
          <p>Просмотр и обработка заявок на вступление в команду</p>
        </ApplicationsHeader>

        <ApplicationsContent>
          <ApplicationsListContainer>
            <ListHeader>
              <FilterContainer>
                <FilterLabel>Статус:</FilterLabel>
                <FilterSelect
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Все заявки</option>
                  <option value="Новая">Новые</option>
                  <option value="Рассмотрена">Рассмотренные</option>
                  <option value="Принята">Принятые</option>
                  <option value="Отклонена">Отклоненные</option>
                </FilterSelect>
              </FilterContainer>

              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Поиск по имени, email или роли..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchContainer>
            </ListHeader>

            {isLoading ? (
              <LoadingMessage>Загрузка заявок...</LoadingMessage>
            ) : filteredApplications.length === 0 ? (
              <NoApplicationsMessage>
                {searchTerm || statusFilter !== 'all'
                  ? 'Заявки не найдены. Попробуйте изменить параметры поиска.'
                  : 'Заявок пока нет.'}
              </NoApplicationsMessage>
            ) : (
              <ApplicationsTable>
                <thead>
                  <tr>
                    <th>Имя</th>
                    <th>Роль</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <ApplicationRow
                      key={app._id}
                      selected={selectedApplication === app._id}
                      status={app.status}
                    >
                      <td>{app.name}</td>
                      <td>{app.role}</td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        <StatusBadge status={app.status}>{app.status}</StatusBadge>
                      </td>
                      <td>
                        <ActionButtons>
                          <ActionButton
                            title="Просмотреть"
                            onClick={() => handleViewApplication(app._id)}
                          >
                            <FaEye />
                          </ActionButton>
                          <ActionButton
                            title="Удалить"
                            danger
                            onClick={() => handleDeleteApplication(app._id)}
                          >
                            <FaTrash />
                          </ActionButton>
                        </ActionButtons>
                      </td>
                    </ApplicationRow>
                  ))}
                </tbody>
              </ApplicationsTable>
            )}
          </ApplicationsListContainer>

          {selectedApplication && application && (
            <ApplicationDetailsContainer>
              <DetailsHeader>
                <h2>Детали заявки</h2>
                <CloseButton onClick={handleCloseDetails}>
                  <FaTimes />
                </CloseButton>
              </DetailsHeader>

              <ApplicationDetails>
                <DetailRow>
                  <DetailLabel>Имя:</DetailLabel>
                  <DetailValue>{application.name}</DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>
                    <a href={`mailto:${application.email}`}>
                      {application.email} <FaEnvelope />
                    </a>
                  </DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Телефон:</DetailLabel>
                  <DetailValue>{application.phone}</DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Роль:</DetailLabel>
                  <DetailValue>
                    {application.role}
                    {application.otherRole && ` (${application.otherRole})`}
                  </DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Дата подачи:</DetailLabel>
                  <DetailValue>
                    {new Date(application.createdAt).toLocaleString()}
                  </DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Статус:</DetailLabel>
                  <DetailValue>
                    <StatusBadge status={application.status}>
                      {application.status}
                    </StatusBadge>
                  </DetailValue>
                </DetailRow>

                {application.portfolio && (
                  <DetailRow>
                    <DetailLabel>Портфолио:</DetailLabel>
                    <DetailValue>
                      <a
                        href={application.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {application.portfolio}
                      </a>
                    </DetailValue>
                  </DetailRow>
                )}

                <DetailSection>
                  <DetailLabel>Опыт работы:</DetailLabel>
                  <DetailText>{application.experience}</DetailText>
                </DetailSection>

                {application.message && (
                  <DetailSection>
                    <DetailLabel>Дополнительная информация:</DetailLabel>
                    <DetailText>{application.message}</DetailText>
                  </DetailSection>
                )}

                <StatusActions>
                  <StatusButton
                    status="Новая"
                    active={application.status === 'Новая'}
                    onClick={() => handleStatusChange(application._id, 'Новая')}
                  >
                    Новая
                  </StatusButton>
                  <StatusButton
                    status="Рассмотрена"
                    active={application.status === 'Рассмотрена'}
                    onClick={() => handleStatusChange(application._id, 'Рассмотрена')}
                  >
                    Рассмотрена
                  </StatusButton>
                  <StatusButton
                    status="Принята"
                    active={application.status === 'Принята'}
                    onClick={() => handleStatusChange(application._id, 'Принята')}
                  >
                    <FaCheck /> Принять
                  </StatusButton>
                  <StatusButton
                    status="Отклонена"
                    active={application.status === 'Отклонена'}
                    onClick={() => handleStatusChange(application._id, 'Отклонена')}
                  >
                    <FaTimes /> Отклонить
                  </StatusButton>
                </StatusActions>

                <DeleteApplicationButton
                  onClick={() => handleDeleteApplication(application._id)}
                >
                  <FaTrash /> Удалить заявку
                </DeleteApplicationButton>
              </ApplicationDetails>
            </ApplicationDetailsContainer>
          )}
        </ApplicationsContent>
      </div>
    </ApplicationsContainer>
  );
};

const ApplicationsContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
  min-height: 100vh;
`;

const ApplicationsHeader = styled.div`
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

const ApplicationsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 992px) {
    grid-template-columns: ${({ hasDetails }) => (hasDetails ? '1fr 400px' : '1fr')};
  }
`;

const ApplicationsListContainer = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  background: #222;
  border: 1px solid #333;
  color: var(--text-color);
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  background: #222;
  border: 1px solid #333;
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

const NoApplicationsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

const ApplicationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const ApplicationRow = styled.tr`
  background-color: ${({ selected }) => (selected ? 'rgba(255, 77, 77, 0.1)' : 'transparent')};
  border-left: 3px solid ${({ selected, status }) => {
    if (selected) return 'var(--accent-color)';
    if (status === 'Новая') return '#ffcc00';
    if (status === 'Рассмотрена') return '#3498db';
    if (status === 'Принята') return '#2ecc71';
    if (status === 'Отклонена') return '#e74c3c';
    return 'transparent';
  }};

  td {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({ status }) => {
    if (status === 'Новая') return '#ffcc00';
    if (status === 'Рассмотрена') return '#3498db';
    if (status === 'Принята') return '#2ecc71';
    if (status === 'Отклонена') return '#e74c3c';
    return '#666';
  }};
  color: ${({ status }) => {
    if (status === 'Новая') return '#000';
    return '#fff';
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ danger }) => (danger ? 'var(--danger-color)' : 'var(--text-color)')};
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ danger }) => (danger ? '#ff6b6b' : 'var(--accent-color)')};
  }
`;

const ApplicationDetailsContainer = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  height: fit-content;
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: 1.5rem;
    font-family: 'Orbitron', sans-serif;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const ApplicationDetails = styled.div``;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const DetailLabel = styled.div`
  width: 120px;
  font-weight: 500;
  color: var(--text-secondary);
`;

const DetailValue = styled.div`
  flex: 1;

  a {
    color: var(--accent-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;

  ${DetailLabel} {
    margin-bottom: 0.5rem;
  }
`;

const DetailText = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-wrap;
`;

const StatusActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const StatusButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ status, active }) => {
    if (active) {
      if (status === 'Новая') return '#ffcc00';
      if (status === 'Рассмотрена') return '#3498db';
      if (status === 'Принята') return '#2ecc71';
      if (status === 'Отклонена') return '#e74c3c';
    }
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${({ status, active }) => {
    if (active) {
      if (status === 'Новая') return '#000';
      return '#fff';
    }
    return 'var(--text-color)';
  }};

  &:hover {
    background-color: ${({ status }) => {
      if (status === 'Новая') return '#ffcc00';
      if (status === 'Рассмотрена') return '#3498db';
      if (status === 'Принята') return '#2ecc71';
      if (status === 'Отклонена') return '#e74c3c';
      return 'rgba(255, 255, 255, 0.2)';
    }};
    color: ${({ status }) => {
      if (status === 'Новая') return '#000';
      return '#fff';
    }};
  }
`;

const DeleteApplicationButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: transparent;
  border: 1px solid var(--danger-color);
  color: var(--danger-color);
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--danger-color);
    color: var(--text-color);
  }
`;

export default ApplicationsList; 