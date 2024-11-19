package com.jchess.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Move {
    private Square from;
    private Square to;
    private Piece piece;
    private Piece capturedPiece;
    private boolean isCheck;
    private boolean isCheckmate;
    private boolean isCastling;
    private boolean isEnPassant;
    private boolean isPawnPromotion;

    public Move(Square from, Square to) {
        this.from = from;
        this.to = to;
        this.piece = from.getPiece();
        this.capturedPiece = to.getPiece();
    }

    @Override
    public String toString() {
        String move = piece.getSymbol() + 
                     (char)('a' + from.getX()) + 
                     (8 - from.getY()) +
                     (capturedPiece != null ? "x" : "-") +
                     (char)('a' + to.getX()) + 
                     (8 - to.getY());
        
        if (isCheck) move += "+";
        if (isCheckmate) move += "#";
        
        return move;
    }
}
