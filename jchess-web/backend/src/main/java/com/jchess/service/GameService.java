package com.jchess.service;

import com.jchess.model.*;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {
    private final Map<String, Game> games = new ConcurrentHashMap<>();

    public Game createGame(String whitePlayerId, String whitePlayerName, String blackPlayerId, String blackPlayerName) {
        Player whitePlayer = new Player(whitePlayerId, whitePlayerName, Player.Color.WHITE, Player.PlayerType.HUMAN);
        Player blackPlayer = new Player(blackPlayerId, blackPlayerName, Player.Color.BLACK, Player.PlayerType.HUMAN);
        
        Game game = new Game(whitePlayer, blackPlayer);
        games.put(game.getId(), game);
        return game;
    }

    public Game getGame(String gameId) {
        return games.get(gameId);
    }

    public boolean makeMove(String gameId, Move move) {
        Game game = getGame(gameId);
        if (game != null) {
            return game.makeMove(move);
        }
        return false;
    }

    public void startGame(String gameId) {
        Game game = getGame(gameId);
        if (game != null) {
            game.start();
        }
    }
}
