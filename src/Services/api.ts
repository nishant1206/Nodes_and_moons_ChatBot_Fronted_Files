import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/predict';

export const sendMessageToServer = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { prompt });
    return response.data.generated_text;
  } catch (error) {
    console.error('Error sending message to server:', error);
    throw error;
  }
};
