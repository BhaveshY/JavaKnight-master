package com.jchess.model.pieces;

import com.jchess.model.Piece;
import com.jchess.model.Player;
import com.jchess.model.Square;

import java.util.ArrayList;
import java.util.List;

public class Pawn extends Piece {
    private boolean hasMoved = false;

    public Pawn(Square square, Player player) {
        super(square, player);
        this.symbol = "P";
    }

    @Override
    public List<Square> allMoves() {
        List<Square> moves = new ArrayList<>();
        int direction = player.getColor() == Player.Color.WHITE ? -1 : 1;
        int x = square.getX();
        int y = square.getY();

        // Forward move
        Square oneStep = square.getBoard().getSquare(x, y + direction);
        if (oneStep != null && !oneStep.isOccupied()) {
            moves.add(oneStep);

            // Two-square move from starting position
            if (!hasMoved) {
                Square twoStep = square.getBoard().getSquare(x, y + 2 * direction);
                if (twoStep != null && !twoStep.isOccupied()) {
                    moves.add(twoStep);
                }
            }
        }

        // Captures
        Square leftCapture = square.getBoard().getSquare(x - 1, y + direction);
        Square rightCapture = square.getBoard().getSquare(x + 1, y + direction);

        if (leftCapture != null && leftCapture.isOccupiedByOpponent(player)) {
            moves.add(leftCapture);
        }
        if (rightCapture != null && rightCapture.isOccupiedByOpponent(player)) {
            moves.add(rightCapture);
        }

        return moves;
    }

    @Override
    public void move(Square target) {
        super.move(target);
        hasMoved = true;
    }
}
