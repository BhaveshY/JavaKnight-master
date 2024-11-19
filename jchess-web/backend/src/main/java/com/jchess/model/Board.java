package com.jchess.model;

import com.jchess.model.pieces.*;
import lombok.Getter;

@Getter
public class Board {
    private static final int SIZE = 8;
    private final Square[][] squares;

    public Board() {
        squares = new Square[SIZE][SIZE];
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                squares[i][j] = new Square(i, j, this);
            }
        }
    }

    public void initialize() {
        // Initialize white pieces
        initializePieces(Player.Color.WHITE);
        
        // Initialize black pieces
        initializePieces(Player.Color.BLACK);
    }

    private void initializePieces(Player.Color color) {
        int backRow = (color == Player.Color.WHITE) ? 7 : 0;
        int pawnRow = (color == Player.Color.WHITE) ? 6 : 1;
        
        // Initialize pawns
        for (int i = 0; i < SIZE; i++) {
            squares[i][pawnRow].setPiece(new Pawn(squares[i][pawnRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        }
        
        // Initialize other pieces
        squares[0][backRow].setPiece(new Rook(squares[0][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[1][backRow].setPiece(new Knight(squares[1][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[2][backRow].setPiece(new Bishop(squares[2][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[3][backRow].setPiece(new Queen(squares[3][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[4][backRow].setPiece(new King(squares[4][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[5][backRow].setPiece(new Bishop(squares[5][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[6][backRow].setPiece(new Knight(squares[6][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
        squares[7][backRow].setPiece(new Rook(squares[7][backRow], new Player(null, "", color, Player.PlayerType.HUMAN)));
    }

    public void movePiece(Square from, Square to) {
        Piece piece = from.getPiece();
        if (piece != null) {
            piece.move(to);
        }
    }

    public boolean isValidPosition(int x, int y) {
        return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
    }

    public Square getSquare(int x, int y) {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
            return null;
        }
        return squares[x][y];
    }

    public boolean isSquareUnderAttack(Square square, Player.Color attackingColor) {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                Piece piece = squares[i][j].getPiece();
                if (piece != null && piece.getPlayer().getColor() == attackingColor) {
                    if (piece.allMoves().contains(square)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
