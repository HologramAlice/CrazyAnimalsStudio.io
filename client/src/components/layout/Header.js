import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/slices/authSlice';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaLock } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo>
            <Link to="/">
              <span>INDIE</span>TEAM
            </Link>
          </Logo>

          <MenuIcon onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MenuIcon>

          <Nav isOpen={isOpen}>
            <NavList>
              <NavItem>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Главная
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  О нас
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/apply" onClick={() => setIsOpen(false)}>
                  Присоединиться
                </Link>
              </NavItem>
              {user ? (
                <>
                  {user.isAdmin && (
                    <NavItem>
                      <Link to="/admin" onClick={() => setIsOpen(false)}>
                        <FaLock /> Админ
                      </Link>
                    </NavItem>
                  )}
                  <NavItem>
                    <LogoutButton onClick={onLogout}>
                      <FaSignOutAlt /> Выйти
                    </LogoutButton>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <FaUser /> Войти
                  </Link>
                </NavItem>
              )}
            </NavList>
          </Nav>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
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

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.95);
    height: ${({ isOpen }) => (isOpen ? '100vh' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-in-out;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const NavItem = styled.li`
  margin-left: 1.5rem;

  a, button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    text-decoration: none;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-color);
    }
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

export default Header; 