// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol"; // DEBUG


contract Rafflebot {
    uint256 public id;
    uint256 public endTime;
    uint256 private seed;
    address[] public entrants;
    mapping(address => uint256) public entries;
    mapping(uint256 => address) public winners;

    event NewEntry(
        address indexed from,
        uint256 indexed id,
        uint256 timestamp
    );

    event NewWinner(
        address indexed winner,
        uint256 indexed id,
        uint256 timestamp
    );

    event NewRaffle(
        uint256 indexed id,
        uint256 endTime
    );

    error AlreadyEntered();
    error RaffleNotOver();

    constructor() {
        id = 0;
        endTime = block.timestamp + 24 hours;
        seed = block.difficulty + block.timestamp;
        
        emit NewRaffle(id, endTime);
    }

    function enter() public {
        if (entries[msg.sender] == id) revert AlreadyEntered();
        
        entrants.push(msg.sender);
        entries[msg.sender] = id;

        emit NewEntry(msg.sender, id, block.timestamp);
    }

    function end() public {
        if (endTime <= block.timestamp) revert RaffleNotOver();

        address winner = raffle();
        winners[id] = winner;
        reset();

        emit NewWinner(winner, id, block.timestamp);
    }

    function raffle() private returns (address) {
        uint256 numberOfEntrants = entrants.length;
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % numberOfEntrants;
        address winner = entrants[randomNumber];
        seed = randomNumber;

        return winner;
    }
    
    function reset() private {
        delete entrants;
        endTime = block.timestamp + 24 hours;
        id++;

        emit NewRaffle(id, endTime);
    }

    function getID() public view returns (uint256) {
        return id;
    }

    function getEndTime() public view returns (uint256) {
        return endTime;
    }

    function getEntrants() public view returns (address[]) {
        return entrants;
    }

    function getWinner(uint256 _id) public view returns (address) {
        return winners[_id];
    }
}
