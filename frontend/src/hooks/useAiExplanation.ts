import { useState } from 'react';
import api from '@/lib/api';

export interface AiExplanationRequest {
  question: string;
  context: string;
  tutorialSlug: string;
  lessonSlug: string;
}

export interface AiExplanationResponse {
  explanation: string;
  codeExample: string;
  relatedTopics: string[];
}

export function useAiExplanation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateExplanation = async (request: AiExplanationRequest): Promise<AiExplanationResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/aiexplanation', request);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate explanation');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateExplanation,
  };
}