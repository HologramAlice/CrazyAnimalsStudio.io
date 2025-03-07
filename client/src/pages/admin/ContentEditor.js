import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  getAllContent,
  createContent,
  updateContent,
  deleteContent,
  uploadImage,
  reset,
} from '../../redux/slices/contentSlice';
import { FaPlus, FaEdit, FaTrash, FaImage, FaSave, FaTimes } from 'react-icons/fa';

const ContentEditor = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    subtitle: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    order: 0,
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const { content, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.content
  );

  useEffect(() => {
    dispatch(getAllContent());
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

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setFormData({
      section: section.section,
      title: section.title,
      subtitle: section.subtitle || '',
      content: section.content,
      imageUrl: section.imageUrl || '',
      buttonText: section.buttonText || '',
      buttonLink: section.buttonLink || '',
      order: section.order || 0,
      isActive: section.isActive,
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setSelectedSection(null);
    setFormData({
      section: '',
      title: '',
      subtitle: '',
      content: '',
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
      order: 0,
      isActive: true,
    });
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setSelectedSection(null);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error('Пожалуйста, выберите изображение');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const result = await dispatch(uploadImage(formData)).unwrap();
      setFormData((prevState) => ({
        ...prevState,
        imageUrl: result.imageUrl,
      }));
      toast.success('Изображение успешно загружено');
      setImageFile(null);
    } catch (error) {
      toast.error('Ошибка при загрузке изображения');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && selectedSection) {
      dispatch(
        updateContent({
          id: selectedSection._id,
          contentData: formData,
        })
      );
      setIsEditing(false);
    } else if (isCreating) {
      dispatch(createContent(formData));
      setIsCreating(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту секцию?')) {
      dispatch(deleteContent(selectedSection._id));
      setIsEditing(false);
      setSelectedSection(null);
    }
  };

  return (
    <EditorContainer>
      <div className="container">
        <EditorHeader>
          <h1>Редактор контента</h1>
          <p>Управление содержимым сайта</p>
        </EditorHeader>

        <EditorContent>
          <SidebarContainer>
            <SidebarHeader>
              <h3>Секции сайта</h3>
              <NewButton onClick={handleCreateNew}>
                <FaPlus /> Новая секция
              </NewButton>
            </SidebarHeader>

            <SectionsList>
              {content.map((section) => (
                <SectionItem
                  key={section._id}
                  active={selectedSection && selectedSection._id === section._id}
                  onClick={() => handleSelectSection(section)}
                >
                  <SectionName>{section.title}</SectionName>
                  <SectionType>{section.section}</SectionType>
                </SectionItem>
              ))}
            </SectionsList>
          </SidebarContainer>

          <EditorFormContainer>
            {(isEditing || isCreating) ? (
              <EditorForm onSubmit={handleSubmit}>
                <FormHeader>
                  <h2>{isEditing ? 'Редактирование секции' : 'Создание новой секции'}</h2>
                  <CancelButton type="button" onClick={handleCancel}>
                    <FaTimes /> Отмена
                  </CancelButton>
                </FormHeader>

                <FormGroup>
                  <FormLabel htmlFor="section">Тип секции *</FormLabel>
                  <FormSelect
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={onChange}
                    required
                    disabled={isEditing}
                  >
                    <option value="">Выберите тип секции</option>
                    <option value="hero">Главный баннер (hero)</option>
                    <option value="about">О нас (about)</option>
                    <option value="features">Проекты (features)</option>
                    <option value="team">Команда (team)</option>
                    <option value="contact">Контакты (contact)</option>
                    <option value="footer">Подвал (footer)</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="title">Заголовок *</FormLabel>
                  <FormInput
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="subtitle">Подзаголовок</FormLabel>
                  <FormInput
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={onChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="content">Содержимое *</FormLabel>
                  <FormTextarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={onChange}
                    rows="10"
                    required
                  ></FormTextarea>
                  <FormHint>
                    Поддерживается HTML-разметка для форматирования текста
                  </FormHint>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Изображение</FormLabel>
                  <ImageUploadContainer>
                    <ImageUploadInput
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <ImageUploadButton
                      type="button"
                      onClick={handleImageUpload}
                      disabled={!imageFile}
                    >
                      <FaImage /> Загрузить
                    </ImageUploadButton>
                  </ImageUploadContainer>
                  {formData.imageUrl && (
                    <ImagePreviewContainer>
                      <ImagePreview src={formData.imageUrl} alt="Preview" />
                      <FormInput
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={onChange}
                        placeholder="URL изображения"
                      />
                    </ImagePreviewContainer>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="buttonText">Текст кнопки</FormLabel>
                  <FormInput
                    type="text"
                    id="buttonText"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={onChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="buttonLink">Ссылка кнопки</FormLabel>
                  <FormInput
                    type="text"
                    id="buttonLink"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={onChange}
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="order">Порядок отображения</FormLabel>
                    <FormInput
                      type="number"
                      id="order"
                      name="order"
                      value={formData.order}
                      onChange={onChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormCheckboxLabel>
                      <FormCheckbox
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={onChange}
                      />
                      Активная секция
                    </FormCheckboxLabel>
                  </FormGroup>
                </FormRow>

                <FormActions>
                  <SubmitButton type="submit" disabled={isLoading}>
                    <FaSave /> {isLoading ? 'Сохранение...' : 'Сохранить'}
                  </SubmitButton>
                  {isEditing && (
                    <DeleteButton type="button" onClick={handleDelete}>
                      <FaTrash /> Удалить
                    </DeleteButton>
                  )}
                </FormActions>
              </EditorForm>
            ) : (
              <EditorPlaceholder>
                <h3>Выберите секцию для редактирования или создайте новую</h3>
                <p>
                  Здесь вы можете управлять содержимым вашего сайта. Выберите существующую
                  секцию из списка слева или создайте новую.
                </p>
                <NewButton onClick={handleCreateNew}>
                  <FaPlus /> Создать новую секцию
                </NewButton>
              </EditorPlaceholder>
            )}
          </EditorFormContainer>
        </EditorContent>
      </div>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  padding: 120px 0 60px;
  background-color: var(--primary-color);
  min-height: 100vh;
`;

const EditorHeader = styled.div`
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

const EditorContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.2rem;
    font-family: 'Orbitron', sans-serif;
  }
`;

const NewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff3333;
  }
`;

const SectionsList = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const SectionItem = styled.div`
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: ${({ active }) => (active ? 'rgba(255, 77, 77, 0.2)' : 'transparent')};
  border-left: 3px solid ${({ active }) => (active ? 'var(--accent-color)' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const SectionName = styled.div`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const SectionType = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const EditorFormContainer = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const EditorPlaceholder = styled.div`
  text-align: center;
  padding: 3rem 0;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-family: 'Orbitron', sans-serif;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const EditorForm = styled.form``;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: 1.5rem;
    font-family: 'Orbitron', sans-serif;
  }
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const FormHint = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
`;

const FormCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FormCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ImageUploadInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  background: #222;
  border: 1px solid #333;
  border-radius: 5px;
  color: var(--text-color);
`;

const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff3333;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const ImagePreviewContainer = styled.div`
  margin-top: 1rem;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 1rem;
  border-radius: 5px;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff3333;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: var(--danger-color);
  border: 1px solid var(--danger-color);
  border-radius: 5px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--danger-color);
    color: var(--text-color);
  }
`;

export default ContentEditor; 