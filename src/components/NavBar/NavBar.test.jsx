import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './NavBar';

const renderWithProviders = (component) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('NavBar', () => {
  test('renderiza o título do aplicativo', () => {
    renderWithProviders(<NavBar />);
    
    const title = screen.getByText('🎬 Series Journal');
    expect(title).toBeInTheDocument();
  });

  test('renderiza todos os links de navegação', () => {
    renderWithProviders(<NavBar />);
    
    const navItems = [
      'Página Inicial',
      'Sobre',
      'Cadastrar Séries',
      'Lista de Séries'
    ];

    navItems.forEach(item => {
      const link = screen.getByText(item);
      expect(link).toBeInTheDocument();
    });
  });

  test('links possuem hrefs corretos', () => {
    renderWithProviders(<NavBar />);
    
    expect(screen.getByText('Página Inicial').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Cadastrar Séries').closest('a')).toHaveAttribute('href', '/cadastrar');
    expect(screen.getByText('Lista de Séries').closest('a')).toHaveAttribute('href', '/listar');
  });
});