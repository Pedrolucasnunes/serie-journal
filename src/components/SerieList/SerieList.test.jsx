import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SerieList from './SerieList';

const mockSeries = [
  {
    id: 1,
    titulo: 'Breaking Bad',
    temporadas: 5,
    dataLancamento: '2008-01-20',
    diretor: 'Vince Gilligan',
    produtora: 'Sony Pictures',
    categoria: 'Drama',
    dataAssistida: '2020-05-15'
  },
  {
    id: 2,
    titulo: 'Stranger Things',
    temporadas: 4,
    dataLancamento: '2016-07-15',
    diretor: 'The Duffer Brothers',
    produtora: 'Netflix',
    categoria: 'Ficção Científica',
    dataAssistida: '2021-10-20'
  }
];

const renderWithProviders = (component, props = {}) => {
  const theme = createTheme();
  const defaultProps = {
    series: mockSeries,
    loading: false,
    onUpdateSerie: vi.fn(),
    onDeleteSerie: vi.fn(),
    onReload: vi.fn(),
    ...props
  };

  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SerieList {...defaultProps} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('SerieList', () => {
  test('renderiza a lista de séries', () => {
    renderWithProviders(<SerieList />);
    
    expect(screen.getByText('Lista de Séries')).toBeInTheDocument();
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.getByText('Stranger Things')).toBeInTheDocument();
    expect(screen.getByText('2 de 2 séries encontradas')).toBeInTheDocument();
  });

  test('mostra loading quando está carregando', () => {
    renderWithProviders(<SerieList loading={true} series={[]} />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('filtra séries pela busca', () => {
    renderWithProviders(<SerieList />);
    
    const searchInput = screen.getByPlaceholderText(/buscar por título/i);
    fireEvent.change(searchInput, { target: { value: 'Breaking' } });

    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.queryByText('Stranger Things')).not.toBeInTheDocument();
    expect(screen.getByText('1 de 2 séries encontradas')).toBeInTheDocument();
  });

  test('mostra mensagem quando não há séries', () => {
    renderWithProviders(<SerieList series={[]} />);
    
    expect(screen.getByText('Nenhuma série cadastrada.')).toBeInTheDocument();
  });

  test('chama função de deletar quando confirma exclusão', async () => {
    const mockOnDeleteSerie = vi.fn();
    renderWithProviders(<SerieList onDeleteSerie={mockOnDeleteSerie} />);
    
    const deleteButtons = screen.getAllByText('Excluir');
    fireEvent.click(deleteButtons[0]);

    const confirmButton = screen.getByText('Excluir', { selector: 'button' });
    fireEvent.click(confirmButton);

    expect(mockOnDeleteSerie).toHaveBeenCalledWith(1);
  });
});