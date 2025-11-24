import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  Movie,
  CalendarToday,
  Person,
  Business,
  Theaters,
} from '@mui/icons-material';
import SerieForm from '../SerieForm/SerieForm';

function SerieList({ series, loading, onUpdateSerie, onDeleteSerie, onReload }) {
  const [serieEditando, setSerieEditando] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [serieParaExcluir, setSerieParaExcluir] = useState(null);

  const handleEditar = (serie) => {
    setSerieEditando(serie);
  };

  const handleCancelarEdicao = () => {
    setSerieEditando(null);
  };

  const handleSalvarEdicao = async (serieAtualizada) => {
    const success = await onUpdateSerie(serieEditando.id, serieAtualizada);
    if (success) {
      setSerieEditando(null);
    }
  };

  const handleExcluirClick = (serie) => {
    setSerieParaExcluir(serie);
  };

  const handleConfirmarExclusao = async () => {
    if (serieParaExcluir) {
      await onDeleteSerie(serieParaExcluir.id);
      setSerieParaExcluir(null);
    }
  };

  const handleCancelarExclusao = () => {
    setSerieParaExcluir(null);
  };

  // Filtrar séries baseado no termo de busca
  const seriesFiltradas = series.filter(serie =>
    serie.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    serie.diretor.toLowerCase().includes(termoBusca.toLowerCase()) ||
    serie.categoria.toLowerCase().includes(termoBusca.toLowerCase()) ||
    serie.produtora.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (serieEditando) {
    return (
      <SerieForm
        serieParaEditar={serieEditando}
        onUpdateSerie={handleSalvarEdicao}
        isEditing={true}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Lista de Séries
      </Typography>

      {/* Busca */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por título, diretor, categoria ou produtora..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {seriesFiltradas.length} de {series.length} séries encontradas
        </Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Lista de séries */}
      {!loading && seriesFiltradas.length === 0 ? (
        <Alert severity="info">
          {termoBusca ? 'Nenhuma série encontrada para sua busca.' : 'Nenhuma série cadastrada.'}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {seriesFiltradas.map((serie) => (
            <Grid item xs={12} sm={6} md={4} key={serie.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {serie.titulo}
                    </Typography>
                    <Chip
                      label={`${serie.temporadas} temp.`}
                      color="primary"
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Lançamento:</strong> {formatarData(serie.dataLancamento)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Diretor:</strong> {serie.diretor}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Business fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Produtora:</strong> {serie.produtora}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Theaters fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Categoria:</strong> 
                        <Chip 
                          label={serie.categoria} 
                          size="small" 
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Movie fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Assistido em:</strong> {formatarData(serie.dataAssistida)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditar(serie)}
                    variant="outlined"
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleExcluirClick(serie)}
                    variant="outlined"
                    color="error"
                  >
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={!!serieParaExcluir}
        onClose={handleCancelarExclusao}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a série "{serieParaExcluir?.titulo}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelarExclusao}>Cancelar</Button>
          <Button 
            onClick={handleConfirmarExclusao} 
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SerieList;