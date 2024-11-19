package com.jchess.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public abstract class Piece {
    protected Square square;
    protected Player player;
    protected String symbol;
    protected List<Square> availableMoves;

    public Piece(Square square, Player player) {
        this.square = square;
        this.player = player;
        this.availableMoves = new ArrayList<>();
    }

    public abstract List<Square> allMoves();
    
    public boolean isValidMove(Square targetSquare) {
        return availableMoves.contains(targetSquare);
    }

    public void move(Square target) {
        Square oldSquare = this.square;
        this.square = target;
        
        // Remove piece from old square
        if (oldSquare != null) {
            oldSquare.setPiece(null);
        }
        
        // Set piece on new square
        if (target != null) {
            target.setPiece(this);
        }
    }
}
