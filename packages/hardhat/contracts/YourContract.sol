//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	string public playerOneChoice;
	string public playerTwoChoice;
	string public winner;

	event PlayerInput(bool playerOneChose, bool playerTwoChose);

	function isEmptyString(string memory str) private pure returns (bool) {
		return bytes(str).length == 0;
	}

	function hash(string memory str) private pure returns (bytes32 strHash) {
		return keccak256(abi.encodePacked(str));
	}

	function input(string memory choice) public {
		bool isEmpty = isEmptyString(playerOneChoice);
		if (isEmpty) {
			playerOneChoice = choice;
		} else {
			playerTwoChoice = choice;
		}
	}

	bytes32 private blockHash = hash("block");
	bytes32 private paperHash = hash("paper");
	bytes32 private scissorsHash = hash("scissors");

	function determineWinner() private view returns (string memory outcome) {
		bytes32 playerOneHash = hash(playerOneChoice);
		bytes32 playerTwoHash = hash(playerTwoChoice);
		if (playerOneHash == playerTwoHash) {
			return "tie";
		} else if (playerOneHash == blockHash) {
			if (playerTwoHash == paperHash) {
				return "player 2 wins";
			} else {
				return "player 1 wins";
			}
		} else if (playerOneHash == paperHash) {
			if (playerTwoHash == scissorsHash) {
				return "player 2 wins";
			} else {
				return "player 1 wins";
			}
		} else if (playerOneHash == scissorsHash) {
			if (playerTwoHash == blockHash) {
				return "player 2 wins";
			} else {
				return "player 1 wins";
			}
		}
	}

	function playGame() public {
		winner = determineWinner();
		playerOneChoice = "";
		playerTwoChoice = "";
	}
}
