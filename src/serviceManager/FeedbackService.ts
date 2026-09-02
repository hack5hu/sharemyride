import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { type TicketCategory } from '@/constants/enums';
import axiosClient from './axiosClient';

export interface SubmitFeedbackPayload {
  category: TicketCategory;
  summary: string;
  description: string;
  files?: string[];
}

export interface FeedbackResponse {
  id?: string | number;
  ticketId?: string;
  message?: string;
  success?: boolean;
}

export interface FeedbackItem {
  feedbackId?: number;
  ticketNumber?: string;
  category: TicketCategory;
  summary: string;
  description: string;
  screenshotUrls?: string[];
  status?: string;
  message?: string | null;
  createdAt: string;
}

export const FeedbackService = {
  submitFeedback: async (
    payload: SubmitFeedbackPayload,
  ): Promise<FeedbackResponse> => {
    const formData = new FormData();
    formData.append('category', payload.category);
    formData.append('summary', payload.summary.trim());
    formData.append('description', payload.description.trim());

    if (payload.files && payload.files.length > 0) {
      payload.files.forEach((uri, index) => {
        const filename = uri.split('/').pop() || `screenshot_${index}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const ext = match ? match[1].toLowerCase() : 'jpg';
        const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
        formData.append('files', {
          uri,
          name: filename,
          type: mimeType,
        } as unknown as Blob);
      });
    }

    const response = await axiosClient.post<FeedbackResponse>(
      API_ENDPOINTS.FEEDBACK.SUBMIT,
      formData,
    );

    return response.data;
  },

  getMyFeedback: async (): Promise<FeedbackItem[]> => {
    const response = await axiosClient.get<FeedbackItem[]>(
      API_ENDPOINTS.FEEDBACK.MY_FEEDBACK,
    );

    return response.data;
  },
};
