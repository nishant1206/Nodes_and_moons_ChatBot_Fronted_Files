export interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
  }
  
export interface Conversation {
    id: number;
    title: string;
    messages: Message[];
}
  