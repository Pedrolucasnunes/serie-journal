vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(), 
      put: vi.fn(),
      delete: vi.fn()
    }))
  }
}));

import { describe, test, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { serieService, mockApi } from './api';

// Mock do axios
vi.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Com API real disponível', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: [] });
    });

    test('getAll retorna lista de séries da API real', async () => {
      const mockSeries = [{ id: 1, titulo: 'Breaking Bad' }];
      axios.get.mockResolvedValue({ data: mockSeries });

      const result = await serieService.getAll();

      expect(axios.get).toHaveBeenCalledWith('/serie');
      expect(result.data).toEqual(mockSeries);
    });

    test('create envia nova série para API real', async () => {
      const novaSerie = { titulo: 'Nova Série' };
      axios.post.mockResolvedValue({ data: { id: 2, ...novaSerie } });

      const result = await serieService.create(novaSerie);

      expect(axios.post).toHaveBeenCalledWith('/serie', novaSerie);
      expect(result.data).toEqual({ id: 2, ...novaSerie });
    });
  });

  describe('Com API simulada', () => {
    beforeEach(() => {
      axios.get.mockRejectedValue(new Error('API não disponível'));
    });

    test('getAll usa mock quando API real falha', async () => {
      const result = await serieService.getAll();

      expect(result.data).toHaveLength(3); // Dados iniciais do mock
      expect(result.data[0].titulo).toBe('Breaking Bad');
    });

    test('create usa mock quando API real falha', async () => {
      const novaSerie = {
        titulo: 'The Last of Us',
        temporadas: 1,
        dataLancamento: '2023-01-15',
        diretor: 'Craig Mazin',
        produtora: 'HBO',
        categoria: 'Drama',
        dataAssistida: '2023-05-20'
      };

      const result = await serieService.create(novaSerie);

      expect(result.data.titulo).toBe('The Last of Us');
      expect(result.data.id).toBe(5); // Próximo ID disponível
    });
  });
});