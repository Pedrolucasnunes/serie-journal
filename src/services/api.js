import axios from 'axios';
import { mockApi } from './mockApi';

const API_BASE_URL = 'http://localhost:3002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000, // Timeout de 3 segundos para a API real
});

// Função para verificar se a API real está disponível
const isRealApiAvailable = async () => {
  try {
    await axios.get(`${API_BASE_URL}/series`, { timeout: 2000 });
    console.log('✅ API real detectada - usando servidor externo');
    return true;
  } catch (error) {
    console.log('🔧 API real não disponível - usando API simulada');
    return false;
  }
};

// Tenta usar API real, se falhar usa mock automaticamente
const tryRealApi = async (realCall, mockCall) => {
  const useRealApi = await isRealApiAvailable();
  
  if (useRealApi) {
    try {
      return await realCall();
    } catch (error) {
      console.warn('❌ API real falhou, usando API simulada:', error.message);
      return await mockCall();
    }
  } else {
    return await mockCall();
  }
};

export const serieService = {
  // GET - Listar todas as séries
  getAll: () => tryRealApi(
    () => api.get('/series'),
    () => mockApi.getAll()
  ),
  
  // GET - Buscar série por ID
  getById: (id) => tryRealApi(
    () => api.get(`/series/${id}`),
    () => mockApi.getById(id)
  ),
  
  // POST - Criar nova série
  create: (serieData) => tryRealApi(
    () => api.post('/series', serieData),
    () => mockApi.create(serieData)
  ),
  
  // PUT - Atualizar série
  update: (id, serieData) => tryRealApi(
    () => api.put(`/series/${id}`, serieData),
    () => mockApi.update(id, serieData)
  ),
  
  // DELETE - Excluir série
  delete: (id) => tryRealApi(
    () => api.delete(`/series/${id}`),
    () => mockApi.delete(id)
  ),
};

// Export para testes
export { mockApi };
export default api;