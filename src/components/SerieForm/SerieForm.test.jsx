import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SerieForm from './SerieForm';

const renderWithProviders = (component, props = {}) => {
  const theme = createTheme();
  const mockOnAddSerie = vi.fn().mockResolvedValue(true);
  
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SerieForm onAddSerie={mockOnAddSerie} {...props} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('SerieForm', () => {
  test('renderiza o formulário de cadastro', () => {
    renderWithProviders(<SerieForm />);
    
    expect(screen.getByText('Cadastrar Série')).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de temporadas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de lançamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diretor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/produtora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data em que assistiu/i)).toBeInTheDocument();
  });

  test('valida campos obrigatórios', async () => {
    renderWithProviders(<SerieForm />);
    
    const submitButton = screen.getByText('Salvar Série');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Número de temporadas deve ser maior que 0')).toBeInTheDocument();
      expect(screen.getByText('Data de lançamento é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Diretor é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Produtora é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Categoria é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Data em que assistiu é obrigatória')).toBeInTheDocument();
    });
  });

  test('permite preencher e enviar o formulário', async () => {
    const mockOnAddSerie = vi.fn().mockResolvedValue(true);
    
    render(
      <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
          <SerieForm onAddSerie={mockOnAddSerie} />
        </BrowserRouter>
      </ThemeProvider>
    );

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText(/título/i), { 
      target: { value: 'Breaking Bad' } 
    });
    fireEvent.change(screen.getByLabelText(/número de temporadas/i), { 
      target: { value: '5' } 
    });
    fireEvent.change(screen.getByLabelText(/data de lançamento/i), { 
      target: { value: '2008-01-20' } 
    });
    fireEvent.change(screen.getByLabelText(/diretor/i), { 
      target: { value: 'Vince Gilligan' } 
    });
    fireEvent.change(screen.getByLabelText(/produtora/i), { 
      target: { value: 'Sony Pictures' } 
    });
    fireEvent.change(screen.getByLabelText(/categoria/i), { 
      target: { value: 'Drama' } 
    });
    fireEvent.change(screen.getByLabelText(/data em que assistiu/i), { 
      target: { value: '2020-05-15' } 
    });

    // Submete o formulário
    fireEvent.click(screen.getByText('Salvar Série'));

    await waitFor(() => {
      expect(mockOnAddSerie).toHaveBeenCalledWith({
        titulo: 'Breaking Bad',
        temporadas: '5',
        dataLancamento: '2008-01-20',
        diretor: 'Vince Gilligan',
        produtora: 'Sony Pictures',
        categoria: 'Drama',
        dataAssistida: '2020-05-15'
      });
    });
  });
});