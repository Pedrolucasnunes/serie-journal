import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

function SerieForm({ onAddSerie, serieParaEditar, onUpdateSerie, isEditing = false }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titulo: '',
    temporadas: '',
    dataLancamento: '',
    diretor: '',
    produtora: '',
    categoria: '',
    dataAssistida: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const categorias = [
    'Drama',
    'Comédia',
    'Ação',
    'Ficção Científica',
    'Fantasia',
    'Terror',
    'Romance',
    'Suspense',
    'Documentário',
    'Animação'
  ];

  useEffect(() => {
    if (serieParaEditar) {
      setFormData(serieParaEditar);
    }
  }, [serieParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.temporadas || formData.temporadas < 1) {
      newErrors.temporadas = 'Número de temporadas deve ser maior que 0';
    }

    if (!formData.dataLancamento) {
      newErrors.dataLancamento = 'Data de lançamento é obrigatória';
    }

    if (!formData.diretor.trim()) {
      newErrors.diretor = 'Diretor é obrigatório';
    }

    if (!formData.produtora.trim()) {
      newErrors.produtora = 'Produtora é obrigatória';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.dataAssistida) {
      newErrors.dataAssistida = 'Data em que assistiu é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      const success = isEditing 
        ? await onUpdateSerie(serieParaEditar.id, formData)
        : await onAddSerie(formData);
      
      if (success) {
        navigate('/listar');
      } else {
        setSubmitError('Erro ao salvar série. Tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/listar');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {isEditing ? 'Editar Série' : 'Cadastrar Série'}
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                error={!!errors.titulo}
                helperText={errors.titulo}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Temporadas"
                name="temporadas"
                type="number"
                value={formData.temporadas}
                onChange={handleChange}
                error={!!errors.temporadas}
                helperText={errors.temporadas}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data de Lançamento"
                name="dataLancamento"
                type="date"
                value={formData.dataLancamento}
                onChange={handleChange}
                error={!!errors.dataLancamento}
                helperText={errors.dataLancamento}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Diretor"
                name="diretor"
                value={formData.diretor}
                onChange={handleChange}
                error={!!errors.diretor}
                helperText={errors.diretor}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Produtora"
                name="produtora"
                value={formData.produtora}
                onChange={handleChange}
                error={!!errors.produtora}
                helperText={errors.produtora}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.categoria}>
                <InputLabel>Categoria *</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  label="Categoria *"
                >
                  <MenuItem value="">
                    <em>Selecione uma categoria</em>
                  </MenuItem>
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categoria && (
                  <Typography variant="caption" color="error">
                    {errors.categoria}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Data em que Assistiu"
                name="dataAssistida"
                type="date"
                value={formData.dataAssistida}
                onChange={handleChange}
                error={!!errors.dataAssistida}
                helperText={errors.dataAssistida}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                  size="large"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  size="large"
                >
                  {isEditing ? 'Atualizar Série' : 'Salvar Série'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default SerieForm;