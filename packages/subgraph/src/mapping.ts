import {
  YourContract,
  GameDone,
} from "../generated/YourContract/YourContract";
import { Game, Player, Result } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleGameDone(event: GameDone): void {
  let game = new Game(event.transaction.hash.toHex() + "_" + event.logIndex.toString() + "_game");
  game.playerOneChoice = event.params.playerOneChoice;
  game.playerTwoChoice = event.params.playerTwoChoice;
  game.winner = event.params.winnerEmitted;
  game.save();

  let player = new Player(event.transaction.hash.toHex() + "_" + event.logIndex.toString() + "_player");
  player.game = game.id;
  if (game.playerTwoChoice === null) {
    player.number = BigInt.fromI32(1);
    player.choice = event.params.playerOneChoice;
  } else {
    player.number = BigInt.fromI32(2);
    player.choice = event.params.playerTwoChoice;
  }
  player.save();

  let result = new Result(event.transaction.hash.toHex() + "_" + event.logIndex.toString() + "_result");
  result.game = game.id;
  result.winner = event.params.winnerEmitted;
}
