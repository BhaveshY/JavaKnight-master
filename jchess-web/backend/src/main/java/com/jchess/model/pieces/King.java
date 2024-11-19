package com.jchess.model.pieces;

import com.jchess.model.Piece;
import com.jchess.model.Player;
import com.jchess.model.Square;

import java.util.ArrayList;
import java.util.List;

public class King extends Piece {
    private static final int[][] DIRECTIONS = {
        {-1, -1}, {-1, 0}, {-1, 1},
        {0, -1},           {0, 1},
        {1, -1},  {1, 0},  {1, 1}
    };
    
    private boolean hasMoved = false;

    public King(Square square, Player player) {
        super(square, player);
        this.symbol = "K";
    }

    @Override
    public List<Square> allMoves() {
        List<Square> moves = new ArrayList<>();
        int x = square.getX();
        int y = square.getY();

        // Normal moves
        for (int[] direction : DIRECTIONS) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            
            Square targetSquare = square.getBoard().getSquare(newX, newY);
            if (targetSquare != null && 
                (!targetSquare.isOccupied() || targetSquare.isOccupiedByOpponent(player)) &&
                !isSquareUnderAttack(targetSquare)) {
                moves.add(targetSquare);
            }
        }

        // Castling
        if (!hasMoved && !isInCheck()) {
            // Kingside castling
            addCastlingMove(moves, 7, true);
            // Queenside castling
            addCastlingMove(moves, 0, false);
        }

        return moves;
    }

    private void addCastlingMove(List<Square> moves, int rookFile, boolean kingSide) {
        int row = player.getColor() == Player.Color.WHITE ? 7 : 0;
        Square rookSquare = square.getBoard().getSquare(rookFile, row);
        
        if (rookSquare != null && rookSquare.getPiece() instanceof Rook) {
            Rook rook = (Rook) rookSquare.getPiece();
            if (!rook.hasMoved()) {
                int direction = kingSide ? 1 : -1;
                int steps = kingSide ? 2 : 3;
                
                boolean pathClear = true;
                for (int i = 1; i <= steps; i++) {
                    Square pathSquare = square.getBoard().getSquare(square.getX() + i * direction, row);
                    if (pathSquare == null || pathSquare.isOccupied() || 
                        (i <= 2 && isSquareUnderAttack(pathSquare))) {
                        pathClear = false;
                        break;
                    }
                }
                
                if (pathClear) {
                    moves.add(square.getBoard().getSquare(square.getX() + 2 * direction, row));
                }
            }
        }
    }

    public boolean isInCheck() {
        return isSquareUnderAttack(square);
    }

    private boolean isSquareUnderAttack(Square targetSquare) {
        return square.getBoard().isSquareUnderAttack(targetSquare, 
            player.getColor() == Player.Color.WHITE ? Player.Color.BLACK : Player.Color.WHITE);
    }

    @Override
    public void move(Square target) {
        super.move(target);
        hasMoved = true;
    }

    public boolean hasMoved() {
        return hasMoved;
    }
}
