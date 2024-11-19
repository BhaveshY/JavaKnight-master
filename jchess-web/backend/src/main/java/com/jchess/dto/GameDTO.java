package com.jchess.dto;

import com.jchess.model.*;
import lombok.Data;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class GameDTO {
    private String id;
    private String whitePlayer;
    private String blackPlayer;
    private PieceDTO[][] board;
    private String currentPlayer;
    private boolean isCheck;
    private boolean isCheckmate;
    private boolean isStalemate;
    private List<MoveDTO> moves;

    @Data
    public static class PieceDTO {
        private String type;
        private String color;

        public static PieceDTO fromPiece(Piece piece) {
            if (piece == null) return null;
            PieceDTO dto = new PieceDTO();
            dto.setType(piece.getClass().getSimpleName().toUpperCase());
            dto.setColor(piece.getPlayer().getColor().toString());
            return dto;
        }
    }

    @Data
    public static class MoveDTO {
        private PositionDTO from;
        private PositionDTO to;
        private boolean isCapture;
        private boolean isCastling;
        private boolean isEnPassant;
        private boolean isPromotion;
        private String promotionPiece;

        public static MoveDTO fromMove(Move move) {
            MoveDTO dto = new MoveDTO();
            dto.setFrom(PositionDTO.fromSquare(move.getFrom()));
            dto.setTo(PositionDTO.fromSquare(move.getTo()));
            // Set other properties as needed
            return dto;
        }
    }

    @Data
    public static class PositionDTO {
        private int row;
        private int col;

        public static PositionDTO fromSquare(Square square) {
            PositionDTO dto = new PositionDTO();
            dto.setRow(square.getX());
            dto.setCol(square.getY());
            return dto;
        }
    }

    public static GameDTO fromGame(Game game) {
        GameDTO dto = new GameDTO();
        dto.setId(game.getId());
        dto.setWhitePlayer(game.getWhitePlayer().getName());
        dto.setBlackPlayer(game.getBlackPlayer().getName());
        dto.setCurrentPlayer(game.getCurrentPlayer().getColor().toString());
        
        // Convert board
        PieceDTO[][] boardDTO = new PieceDTO[8][8];
        Square[][] squares = game.getBoard().getSquares();
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                boardDTO[i][j] = PieceDTO.fromPiece(squares[i][j].getPiece());
            }
        }
        dto.setBoard(boardDTO);

        // Convert moves
        dto.setMoves(game.getMoves().stream()
                .map(MoveDTO::fromMove)
                .collect(Collectors.toList()));

        // Set game status
        dto.setCheck(game.getStatus() == Game.GameStatus.CHECK);
        dto.setCheckmate(game.getStatus() == Game.GameStatus.CHECKMATE);
        dto.setStalemate(game.getStatus() == Game.GameStatus.STALEMATE);

        return dto;
    }
}
