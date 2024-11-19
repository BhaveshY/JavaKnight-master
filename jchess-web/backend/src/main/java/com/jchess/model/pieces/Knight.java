package com.jchess.model.pieces;

import com.jchess.model.Piece;
import com.jchess.model.Player;
import com.jchess.model.Square;

import java.util.ArrayList;
import java.util.List;

public class Knight extends Piece {
    private static final int[][] MOVES = {
        {-2, -1}, {-2, 1},
        {-1, -2}, {-1, 2},
        {1, -2}, {1, 2},
        {2, -1}, {2, 1}
    };

    public Knight(Square square, Player player) {
        super(square, player);
        this.symbol = "N";
    }

    @Override
    public List<Square> allMoves() {
        List<Square> moves = new ArrayList<>();
        int x = square.getX();
        int y = square.getY();

        for (int[] move : MOVES) {
            int newX = x + move[0];
            int newY = y + move[1];
            
            Square targetSquare = square.getBoard().getSquare(newX, newY);
            if (targetSquare != null && (!targetSquare.isOccupied() || targetSquare.isOccupiedByOpponent(player))) {
                moves.add(targetSquare);
            }
        }

        return moves;
    }
}
