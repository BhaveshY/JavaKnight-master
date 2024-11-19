package com.jchess.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Square {
    private int x;
    private int y;
    private Piece piece;
    private Board board;

    public Square(int x, int y, Board board) {
        this.x = x;
        this.y = y;
        this.board = board;
    }

    public boolean isOccupied() {
        return piece != null;
    }

    public boolean isOccupiedByOpponent(Player player) {
        return isOccupied() && piece.getPlayer() != player;
    }

    public Board getBoard() {
        return board;
    }
}
