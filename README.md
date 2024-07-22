# THETAVID
This project is a decentralized video marketplace built on the Theta blockchain. It allows users to mint, buy, sell, and trade video NFTs. The platform leverages Web3 technologies to ensure transparency, security, and decentralized ownership of digital assets.
## Tech Stack
### Frontend
- React.js
- Material UI
- CSS
- Ethersjs
- Theta SDK
### Backend
- Solidity
- IPFS (Pinata)
- openzeppelin
### Development Tools
- Remix IDE
- Metamask


## Features of THETAVID:

- Minting: Users can mint new video NFTs by uploading video files and metadata.
- Trading: Users can list their video NFTs for sale, purchase, or trade.
- Ownership Transfer: Automatic transfer of ownership upon transaction completion.
- Scalability: The game can accommodate a large number of players and transactions.
- Preview: Allow users to view a preview of video NFTs for a few seconds before purchasing.

## Smart Contracts:
- contract.sol: Smart contract for minting and managing video NFTs and handling marketplace functionalities like sale, purchase, or trade.
- OpenZeppelin: Implementation of the ERC721 standard for non-fungible tokens (NFTs).

## Run Locally

Clone the project

```bash
  https://github.com/Aditya-Chaurasia11/THETAVID.git
```

Go to the project directory

```bash
  cd THETAVID
```

Install dependencies

```bash
  npm install
```

Start the Game

```bash
  npm run dev
```

## Game Rules
- Players:
   - The game is played between two players.
   - There are 5 batsman per player.

- Toss:
   - A toss is conducted to decide which player will bat first.
   - The winner of the toss automatically chooses to bat first.
- Batting:
   - The batting player virtually selects a number from 1 to 6 representing their 'batting score'.
   - The bowling player also selects a number from 1 to 6 as the 'bowling score'.
   - If the batting score and bowling score match, the batting player is considered 'out' and the innings ends.
   - If the scores don’t match, the batting player's score is added to their total runs.
- Bowling:
   - The bowling player virtually selects a number from 1 to 6 as their 'bowling score'.
   - The batting player also selects a number from 1 to 6 as their 'batting score'.
   - If the bowling score and batting score match, the batting player is considered 'out' and their innings ends.
   - If the scores don’t match, the bowling player's score is added to the batting player's total runs.
- Winning:
   - The player with the highest total runs at the end of the game wins.
 
## Game Flow

  Check this for video demo [Click here](https://www.youtube.com/watch?v=7o2wKpB63Y0)

 First every user will create or join game

![Gameplay](https://i.ibb.co/XFVt4Q8/one.jpg)

 Once user create a match they will be toss the coin
 
![Gameplay](https://i.ibb.co/m80tJM7/two.jpg)

 After toss user will waiting for other player to join
 
![Gameplay](https://i.ibb.co/tzmtkC3/three.jpg)

  You can you join matches through join page

![Gameplay](https://i.ibb.co/4J2KSfF/nine.jpg)
  


  Once a player joined battle the battle will begin
  
![Gameplay](https://i.ibb.co/J3pTnsh/five.jpg)

  You can see each player individual score
  
  ![Gameplay](https://i.ibb.co/FKbKy7g/six.jpg)
  ![Gameplay](https://i.ibb.co/Gn6Th1r/seven.jpg)
  
  
  After ending match we get the winner
  
![Gameplay](https://i.ibb.co/L95XpC3/eight.jpg)


  
