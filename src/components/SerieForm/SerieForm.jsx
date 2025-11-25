import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SerieForm.css'

function SerieForm({ onAddSerie, serieParaEditar, onUpdateSerie, isEditing = false }) {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState(
    serieParaEditar || {
      titulo: '',
      temporadas: '',
      dataLancamento: '',
      diretor: '',
      produtora: '',
      categoria: '',
      dataAssistida: ''
    }
  )

  const [errors, setErrors] = useState({})

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
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório'
    }

    if (!formData.temporadas || formData.temporadas < 1) {
      newErrors.temporadas = 'Número de temporadas deve ser maior que 0'
    }

    if (!formData.dataLancamento) {
      newErrors.dataLancamento = 'Data de lançamento é obrigatória'
    }

    if (!formData.diretor.trim()) {
      newErrors.diretor = 'Diretor é obrigatório'
    }

    if (!formData.produtora.trim()) {
      newErrors.produtora = 'Produtora é obrigatória'
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória'
    }

    if (!formData.dataAssistida) {
      newErrors.dataAssistida = 'Data em que assistiu é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      if (isEditing) {
        onUpdateSerie(serieParaEditar.id, formData)
      } else {
        onAddSerie(formData)
      }
      navigate('/listar')
    }
  }

  return (
    <div className="serie-form">
      <h1>{isEditing ? 'Editar Série' : 'Cadastrar séries'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Digite o título da série"
          />
          {errors.titulo && <span className="error">{errors.titulo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="temporadas">Número de Temporadas:</label>
          <input
            type="number"
            id="temporadas"
            name="temporadas"
            value={formData.temporadas}
            onChange={handleChange}
            min="1"
            placeholder="Número de temporadas"
          />
          {errors.temporadas && <span className="error">{errors.temporadas}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dataLancamento">Data de Lançamento da Temporada:</label>
          <input
            type="date"
            id="dataLancamento"
            name="dataLancamento"
            value={formData.dataLancamento}
            onChange={handleChange}
          />
          {errors.dataLancamento && <span className="error">{errors.dataLancamento}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="diretor">Diretor:</label>
            <input
              type="text"
              id="diretor"
              name="diretor"
              value={formData.diretor}
              onChange={handleChange}
              placeholder="Nome do diretor"
            />
            {errors.diretor && <span className="error">{errors.diretor}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="produtora">Produtora:</label>
            <input
              type="text"
              id="produtora"
              name="produtora"
              value={formData.produtora}
              onChange={handleChange}
              placeholder="Nome da produtora"
            />
            {errors.produtora && <span className="error">{errors.produtora}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoria && <span className="error">{errors.categoria}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dataAssistida">Data em que assistiu:</label>
          <input
            type="date"
            id="dataAssistida"
            name="dataAssistida"
            value={formData.dataAssistida}
            onChange={handleChange}
          />
          {errors.dataAssistida && <span className="error">{errors.dataAssistida}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Atualizar Série' : 'Cadastrar Série'}
        </button>
      </form>
    </div>
  )
}

export default SerieForm