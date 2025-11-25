import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './pages/Home.jsx';  // ←←← CORRIGIDO!
import About from './pages/About.jsx';
import SerieForm from './components/SerieForm/SerieForm.jsx';
import SerieList from './components/SerieList/SerieList.jsx';
import './App.css';

function App() {
  const [series, setSeries] = useState([
    {
      id: 1,
      titulo: "La Casa de Papel",
      temporadas: 3,
      dataLancamento: "2020-05-20",
      diretor: "Álex Pina",
      produtora: "Netflix",
      categoria: "Drama",
      dataAssistida: "2021-05-10"
    },
    {
      id: 2,
      titulo: "Breaking Bad",
      temporadas: 5,
      dataLancamento: "2008-01-22",
      diretor: "Vince Gilligan",
      produtora: "Sony Pictures",
      categoria: "Drama",
      dataAssistida: "2015-01-20"
    },
    {
      id: 3,
      titulo: "Friends",
      temporadas: 10,
      dataLancamento: "1994-09-22",
      diretor: "Kevin S. Bright",
      produtora: "Warner Bros",
      categoria: "Comédia",
      dataAssistida: "2010-10-10"
    }
  ]);

  const addSerie = (novaSerie) => {
    const serieComId = {
      ...novaSerie,
      id: series.length > 0 ? Math.max(...series.map(s => s.id)) + 1 : 1
    };
    setSeries([...series, serieComId]);
  };

  const updateSerie = (id, serieAtualizada) => {
    setSeries(series.map(serie => 
      serie.id === id ? { ...serieAtualizada, id } : serie
    ));
  };

  const deleteSerie = (id) => {
    setSeries(series.filter(serie => serie.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="container">
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
                  onUpdateSerie={updateSerie}
                  onDeleteSerie={deleteSerie}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;