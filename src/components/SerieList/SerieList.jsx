import { useState } from 'react'
import SerieForm from '../SerieForm/SerieForm'
import './SerieList.css'

function SerieList({ series, onUpdateSerie, onDeleteSerie }) {
  const [serieEditando, setSerieEditando] = useState(null)
  const [termoBusca, setTermoBusca] = useState('')

  const handleEditar = (serie) => {
    setSerieEditando(serie)
  }

  const handleCancelarEdicao = () => {
    setSerieEditando(null)
  }

  const handleSalvarEdicao = (serieAtualizada) => {
    onUpdateSerie(serieEditando.id, serieAtualizada)
    setSerieEditando(null)
  }

  const handleExcluir = (id, titulo) => {
    if (window.confirm(`Tem certeza que deseja excluir a série "${titulo}"?`)) {
      onDeleteSerie(id)
    }
  }

  // Filtrar séries baseado no termo de busca
  const seriesFiltradas = series.filter(serie =>
    serie.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    serie.diretor.toLowerCase().includes(termoBusca.toLowerCase()) ||
    serie.categoria.toLowerCase().includes(termoBusca.toLowerCase()) ||
    serie.produtora.toLowerCase().includes(termoBusca.toLowerCase())
  )

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  if (serieEditando) {
    return (
      <div className="serie-list">
        <h1>Editando: {serieEditando.titulo}</h1>
        <SerieForm
          serieParaEditar={serieEditando}
          onUpdateSerie={handleSalvarEdicao}
          isEditing={true}
        />
        <button 
          onClick={handleCancelarEdicao}
          className="btn btn-secondary"
          style={{ marginTop: '1rem' }}
        >
          Cancelar Edição
        </button>
      </div>
    )
  }

  return (
    <div className="serie-list">
      <h1>Lista de séries</h1>
      
      {/* Busca */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por título, diretor, categoria ou produtora..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="search-input"
        />
        <span className="search-count">
          {seriesFiltradas.length} de {series.length} séries encontradas
        </span>
      </div>

      {/* Lista de séries */}
      {seriesFiltradas.length === 0 ? (
        <div className="no-series">
          {termoBusca ? 'Nenhuma série encontrada para sua busca.' : 'Nenhuma série cadastrada.'}
        </div>
      ) : (
        <div className="series-grid">
          {seriesFiltradas.map(serie => (
            <div key={serie.id} className="serie-card">
              <div className="serie-header">
                <h3 className="serie-title">{serie.titulo}</h3>
                <span className="serie-temporadas">{serie.temporadas} temporada{serie.temporadas > 1 ? 's' : ''}</span>
              </div>
              
              <div className="serie-details">
                <div className="detail-item">
                  <strong>Data de Lançamento:</strong>
                  <span>{formatarData(serie.dataLancamento)}</span>
                </div>
                <div className="detail-item">
                  <strong>Diretor:</strong>
                  <span>{serie.diretor}</span>
                </div>
                <div className="detail-item">
                  <strong>Produtora:</strong>
                  <span>{serie.produtora}</span>
                </div>
                <div className="detail-item">
                  <strong>Categoria:</strong>
                  <span className="categoria-tag">{serie.categoria}</span>
                </div>
                <div className="detail-item">
                  <strong>Data que assistiu:</strong>
                  <span>{formatarData(serie.dataAssistida)}</span>
                </div>
              </div>

              <div className="serie-actions">
                <button 
                  onClick={() => handleEditar(serie)}
                  className="btn btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleExcluir(serie.id, serie.titulo)}
                  className="btn btn-delete"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SerieList