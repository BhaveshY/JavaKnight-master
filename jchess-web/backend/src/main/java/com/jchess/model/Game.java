package com.jchess.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class Game {
    private String id;
    private Player whitePlayer;
    private Player blackPlayer;
    private Player currentPlayer;
    private Board board;
    private GameStatus status;
    private List<Move> moves;

    public enum GameStatus {
        NOT_STARTED, IN_PROGRESS, CHECK, CHECKMATE, STALEMATE, DRAW
    }

    public Game(Player whitePlayer, Player blackPlayer) {
        this.id = UUID.randomUUID().toString();
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.currentPlayer = whitePlayer;
        this.board = new Board();
        this.status = GameStatus.NOT_STARTED;
        this.moves = new ArrayList<>();
    }

    public void start() {
        board.initialize();
        status = GameStatus.IN_PROGRESS;
    }

    public boolean makeMove(Move move) {
        if (isValidMove(move)) {
            board.movePiece(move.getFrom(), move.getTo());
            moves.add(move);
            switchPlayer();
            updateGameStatus();
            return true;
        }
        return false;
    }

    private boolean isValidMove(Move move) {
        Square from = move.getFrom();
        Square to = move.getTo();
        
        if (!from.isOccupied()) {
            return false;
        }
        
        Piece piece = from.getPiece();
        return piece.getPlayer() == currentPlayer && piece.isValidMove(to);
    }

    private void switchPlayer() {
        currentPlayer = (currentPlayer == whitePlayer) ? blackPlayer : whitePlayer;
    }

    private void updateGameStatus() {
        // TODO: Implement check, checkmate, and stalemate detection
    }
}
