package com.jchess.model.pieces;

import com.jchess.model.Piece;
import com.jchess.model.Player;
import com.jchess.model.Square;

import java.util.ArrayList;
import java.util.List;

public class Bishop extends Piece {
    private static final int[][] DIRECTIONS = {
        {-1, -1}, {-1, 1},
        {1, -1}, {1, 1}
    };

    public Bishop(Square square, Player player) {
        super(square, player);
        this.symbol = "B";
    }

    @Override
    public List<Square> allMoves() {
        List<Square> moves = new ArrayList<>();
        int x = square.getX();
        int y = square.getY();

        for (int[] direction : DIRECTIONS) {
            int currentX = x;
            int currentY = y;
            
            while (true) {
                currentX += direction[0];
                currentY += direction[1];
                
                Square targetSquare = square.getBoard().getSquare(currentX, currentY);
                if (targetSquare == null) {
                    break;
                }
                
                if (targetSquare.isOccupied()) {
                    if (targetSquare.isOccupiedByOpponent(player)) {
                        moves.add(targetSquare);
                    }
                    break;
                }
                
                moves.add(targetSquare);
            }
        }

        return moves;
    }
}
