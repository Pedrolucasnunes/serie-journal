import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>Sobre o Projeto</h1>
        <p className="about-subtitle">
          Este é um projeto de gerenciamento de séries assistidas desenvolvido com React 
          para a disciplina Desenvolvimento de Sistemas Frontend.
        </p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>🎯 Objetivo</h2>
          <p>
            Desenvolver um sistema CRUD (Create, Read, Update, Delete) completo para 
            gerenciamento de séries assistidas, aplicando os conceitos fundamentais 
            do desenvolvimento frontend com React.
          </p>
        </div>

        <div className="about-section">
          <h2>🚀 Funcionalidades</h2>
          <div className="features-list">
            <div className="feature-item">
              <strong>Cadastro de Séries</strong>
              <p>Adicione novas séries com todas as informações relevantes</p>
            </div>
            <div className="feature-item">
              <strong>Listagem Completa</strong>
              <p>Visualize todas as séries cadastradas em um layout organizado</p>
            </div>
            <div className="feature-item">
              <strong>Edição em Tempo Real</strong>
              <p>Atualize informações das séries diretamente na lista</p>
            </div>
            <div className="feature-item">
              <strong>Exclusão Segura</strong>
              <p>Remova séries com confirmação para evitar erros</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🛠️ Tecnologias Utilizadas</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <div className="tech-icon">⚛️</div>
              <span>React 18</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon">⚡</div>
              <span>Vite</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🎨</div>
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🧭</div>
              <span>React Router</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;