"use client";

import type { NextPage } from "next";
import {
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useScaffoldWatchContractEvent,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  const { data } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "winner",
  });

  function choiceInput(playerChoice: string) {
    writeContractAsync({
      functionName: "input",
      args: [playerChoice],
    });
  }

  function handlePlayGame() {
    writeContractAsync({
      functionName: "playGame",
    });
  }

  useScaffoldWatchContractEvent({
    contractName: "YourContract",
    eventName: "GameDone",
    onLogs: logs => {
      logs.map(log => {
        const { winnerEmitted, playerOneChoice, playerTwoChoice } = log.args;
      });
    },
  });

  const { data: events } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GameDone",
    fromBlock: 0n,
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex">
          <button
            className="btn btn-accent m-2"
            onClick={() => {
              choiceInput("block");
            }}
          >
            Block
          </button>
          <button
            className="btn btn-accent m-2"
            onClick={() => {
              choiceInput("paper");
            }}
          >
            Paper
          </button>
          <button
            className="btn btn-accent m-2"
            onClick={() => {
              choiceInput("scissors");
            }}
          >
            Scissors
          </button>
        </div>
        <div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Winner:</h2>
              <p>{data}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={handlePlayGame}>
                  Play Game
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {events && events.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Player 1 Choice</th>
                  <th>Player 2 Choice</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.args.playerOneChoice}</td>
                    <td>{event.args.playerTwoChoice}</td>
                    <td>{event.args.winnerEmitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
