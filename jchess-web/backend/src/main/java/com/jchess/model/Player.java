package com.jchess.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
    private String id;
    private String name;
    private Color color;
    private PlayerType type;

    public enum Color {
        WHITE, BLACK
    }

    public enum PlayerType {
        HUMAN, COMPUTER
    }

    public Player(String id, String name, Color color, PlayerType type) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.type = type;
    }
}
