import {
  YourContract,
  GameDone,
} from "../generated/YourContract/YourContract";
import { Game, Player, Result } from "../generated/schema";

export function handleGameDone(event: GameDone): void {
  let game = new Game(event.transaction.hash.toHex() + "_" + event.logIndex.toString());
  game.playerOneChoice = event.params.playerOneChoice;
  game.playerTwoChoice = event.params.playerTwoChoice;
  game.winner = event.params.winnerEmitted;
  game.save();

  let player = new Player(event.transaction.hash.toHex() + "_" + event.logIndex.toString());
  player.game = game.id;
  player.choice = game.playerOneChoice;
}
