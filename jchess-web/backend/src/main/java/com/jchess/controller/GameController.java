package com.jchess.controller;

import com.jchess.dto.GameDTO;
import com.jchess.model.Game;
import com.jchess.model.Move;
import com.jchess.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public GameDTO createGame(@RequestParam String whitePlayerId,
                          @RequestParam String whitePlayerName,
                          @RequestParam String blackPlayerId,
                          @RequestParam String blackPlayerName) {
        Game game = gameService.createGame(whitePlayerId, whitePlayerName, blackPlayerId, blackPlayerName);
        return GameDTO.fromGame(game);
    }

    @GetMapping("/{gameId}")
    public GameDTO getGame(@PathVariable String gameId) {
        Game game = gameService.getGame(gameId);
        return GameDTO.fromGame(game);
    }

    @PostMapping("/{gameId}/start")
    public void startGame(@PathVariable String gameId) {
        gameService.startGame(gameId);
        Game game = gameService.getGame(gameId);
        messagingTemplate.convertAndSend("/topic/games/" + gameId, GameDTO.fromGame(game));
    }

    @MessageMapping("/games/{gameId}/move")
    @SendTo("/topic/games/{gameId}")
    public GameDTO makeMove(@PathVariable String gameId, Move move) {
        gameService.makeMove(gameId, move);
        Game game = gameService.getGame(gameId);
        return GameDTO.fromGame(game);
    }
}
