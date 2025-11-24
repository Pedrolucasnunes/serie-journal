// API simulada para desenvolvimento e testes
let series = [
  {
    id: 1,
    titulo: "Breaking Bad",
    temporadas: 5,
    dataLancamento: "2008-01-20",
    diretor: "Vince Gilligan",
    produtora: "Sony Pictures",
    categoria: "Drama",
    dataAssistida: "2020-05-15"
  },
  {
    id: 2,
    titulo: "Stranger Things",
    temporadas: 4,
    dataLancamento: "2016-07-15",
    diretor: "The Duffer Brothers",
    produtora: "Netflix",
    categoria: "Ficção Científica",
    dataAssistida: "2021-10-20"
  },
  {
    id: 3,
    titulo: "Game of Thrones",
    temporadas: 8,
    dataLancamento: "2011-04-17",
    diretor: "David Benioff & D. B. Weiss",
    produtora: "HBO",
    categoria: "Fantasia",
    dataAssistida: "2019-05-20"
  }
];

// Simula delay de rede para parecer real
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simula erros aleatórios (opcional - para testar resiliência)
const simulateRandomError = () => {
  if (Math.random() < 0.1) { // 10% de chance de erro
    throw new Error('Erro simulado da API');
  }
};

export const mockApi = {
  // GET - Listar todas as séries
  getAll: async () => {
    await delay(800);
    simulateRandomError();
    console.log('📡 Mock API: Obtendo todas as séries');
    return { data: series };
  },
  
  // GET - Buscar série por ID
  getById: async (id) => {
    await delay(500);
    console.log(`📡 Mock API: Buscando série ID ${id}`);
    const serie = series.find(s => s.id === id);
    if (!serie) {
      throw new Error('Série não encontrada');
    }
    return { data: serie };
  },
  
  // POST - Criar nova série
  create: async (serieData) => {
    await delay(600);
    simulateRandomError();
    console.log('📡 Mock API: Criando nova série', serieData);
    
    const newSerie = {
      ...serieData,
      id: series.length > 0 ? Math.max(...series.map(s => s.id)) + 1 : 1
    };
    series.push(newSerie);
    return { data: newSerie };
  },
  
  // PUT - Atualizar série
  update: async (id, serieData) => {
    await delay(600);
    simulateRandomError();
    console.log(`📡 Mock API: Atualizando série ID ${id}`, serieData);
    
    const index = series.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Série não encontrada');
    }
    
    series[index] = { ...serieData, id };
    return { data: series[index] };
  },
  
  // DELETE - Excluir série
  delete: async (id) => {
    await delay(400);
    simulateRandomError();
    console.log(`📡 Mock API: Excluindo série ID ${id}`);
    
    const initialLength = series.length;
    series = series.filter(s => s.id !== id);
    
    if (series.length === initialLength) {
      throw new Error('Série não encontrada');
    }
    
    return { data: { message: 'Série excluída com sucesso' } };
  }
};