export interface IMessage {
  data: string;
  body?: string;
}

export interface MoveData {
  from: string;
  to: string;
}

export interface GameStateData {
  board: Record<string, {
    piece: {
      type: string;
      color: string;
    };
  }>;
  currentPlayer: 'WHITE' | 'BLACK';
  moves: string[];
  status: 'WAITING' | 'IN_PROGRESS' | 'CHECK' | 'CHECKMATE' | 'DRAW';
}

export interface WebSocketMessage {
  type: 'MOVE' | 'VIEW_POSITION' | 'GAME_STATE';
  data: MoveData | GameStateData;
}
