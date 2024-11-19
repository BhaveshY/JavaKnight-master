import { useEffect, useRef, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, Message, Frame } from '@stomp/stompjs';
import { WebSocketMessage } from '../types/websocket';

export const useWebSocket = (gameId: string) => {
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe(`/topic/game/${gameId}`, (message: Message) => {
          setLastMessage(message);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: (frame: Frame) => {
        console.error('STOMP error', frame);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [gameId]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (clientRef.current?.active) {
      clientRef.current.publish({
        destination: `/app/game/${gameId}`,
        body: JSON.stringify(message),
      });
    }
  }, [gameId]);

  return { sendMessage, lastMessage };
};
