import { Game } from "../../Game";

export class SettingsDialogue {

    private game: Game;
    private readonly onSettingsAllowedRequest: () => void;
    private dialogText: string;
    constructor(game: Game, dialogText: string) {
        this.game = game;
        this.dialogText = dialogText;
    }

    show() {
        var c = confirm(this.dialogText);
        if (c == true) {
            }
        else {
            
        }
    }
}

