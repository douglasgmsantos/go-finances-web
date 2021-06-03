import React, { useContext, useCallback } from 'react';
import Switch from "react-switch";

import { useRouter } from 'next/router';

import { FiLogOut } from 'react-icons/fi';

import { ThemeContext } from 'styled-components';

import { useTheme } from '../../hooks/theme';

import { Container, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

import { NavLink } from '../NavLink';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme, theme } = useTheme();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await signOut
    router.push("/")
  }, [])

  return (
    <Container size={size}>
      <header>
        <img src="/logo.svg" alt="GoFinances" />
        <nav>
          <nav style={{ display: "flex" }}>
            <NavLink href="/dashboard">
              <a>Dashboard</a>
            </NavLink>
            <NavLink href="/importacao">
              <a>Importação</a>
            </NavLink>
            <NavLink href="/configuracoes">
              <a>Configuração</a>
            </NavLink>

            <div style={{ marginLeft: "35px", display: "flex", alignItems: "center" }}>
              <Switch
                onChange={() => toggleTheme()}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={colors.orange}
                onColor={colors.dark}
              />
            </div>

            <Logout onClick={() => handleSignOut()} style={{ borderBottom: `2px solid ${theme.title === 'light' ? theme.colors.orange : theme.colors.dark}` }}>
              <FiLogOut /> Sair
            </Logout>
          </nav>
        </nav>
      </header>
    </Container>
  )
}

export default Header;
