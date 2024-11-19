import { IMessage as StompMessage } from '@stomp/stompjs';
import { Color, Position, GameState } from './chess';

export type IMessage = StompMessage;

export interface MoveData {
  from: Position;
  to: Position;
}

export interface ViewPositionData {
  moveIndex: number;
}

export type GameStateData = GameState;

export type MessageData = MoveData | ViewPositionData | GameStateData;

export interface WebSocketMessage {
  type: 'MOVE' | 'VIEW_POSITION' | 'GAME_STATE';
  data: MessageData;
}
