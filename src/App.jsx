import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import SerieForm from './components/SerieForm/SerieForm';
import SerieList from './components/SerieList/SerieList';
import { serieService } from './services/api';
import { Alert, Snackbar } from '@mui/material';

// Tema do Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
  },
});

function App() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Carregar séries da API
  const loadSeries = async () => {
    try {
      setLoading(true);
      const response = await serieService.getAll();
      setSeries(response.data);
    } catch (error) {
      console.error('Erro ao carregar séries:', error);
      showSnackbar('Erro ao carregar séries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSeries();
  }, []);

  const addSerie = async (novaSerie) => {
    try {
      await serieService.create(novaSerie);
      await loadSeries(); // Recarregar a lista
      showSnackbar('Série cadastrada com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar série:', error);
      showSnackbar('Erro ao cadastrar série', 'error');
      return false;
    }
  };

  const updateSerie = async (id, serieAtualizada) => {
    try {
      await serieService.update(id, serieAtualizada);
      await loadSeries(); // Recarregar a lista
      showSnackbar('Série atualizada com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar série:', error);
      showSnackbar('Erro ao atualizar série', 'error');
      return false;
    }
  };

  const deleteSerie = async (id) => {
    try {
      await serieService.delete(id);
      await loadSeries(); // Recarregar a lista
      showSnackbar('Série excluída com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir série:', error);
      showSnackbar('Erro ao excluir série', 'error');
      return false;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <NavBar />
          <main style={{ padding: '20px 0', minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route 
                path="/cadastrar" 
                element={<SerieForm onAddSerie={addSerie} />} 
              />
              <Route 
                path="/listar" 
                element={
                  <SerieList 
                    series={series}
                    loading={loading}
                    onUpdateSerie={updateSerie}
                    onDeleteSerie={deleteSerie}
                    onReload={loadSeries}
                  />
                } 
              />
            </Routes>
          </main>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;