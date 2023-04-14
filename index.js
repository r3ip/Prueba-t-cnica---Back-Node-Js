const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let gameNumber = 1;

rl.on('line', (line) => {
  if (line === '0') {
    rl.close();
    return;
  }

  const [numberPlayers, chips] = line.split(' ');
  const players = Array.from({ length: parseInt(numberPlayers) }, () => 3);

  console.log(`Game ${gameNumber}:`);

  const result = playLCR(numberPlayers, chips, players);
  const { playersResult, currentPlayer, centerChips } = result;
  gameStatus(playersResult, currentPlayer, centerChips)

  gameNumber++;
});

const playLCR = (numberPlayers, chips, players) => {
  let center = 0;
  let currentPlayer = 0;
  let currentChips = 0;

  for (let i = 0; i < chips.length; i++) {
    const chip = chips[i];
    if (players[currentPlayer] > 0) {
      if (chip === 'L') { 
        players[currentPlayer]--;
        const previousPlayer = (currentPlayer + numberPlayers - 1) % numberPlayers;
        players[previousPlayer]++;
      } else if (chip === 'C') {
        players[currentPlayer]--;
        center++;
      } else if (chip === 'R') {
        players[currentPlayer]--;
        const nextPlayer = (currentPlayer + 1) % numberPlayers;
        players[nextPlayer]++;
      }
    }
    currentChips++;
    if (currentChips === 3) {
      currentChips = 0;
      currentPlayer = (currentPlayer + 1) % numberPlayers;
    }
    if (players[currentPlayer] <= 2 && currentChips === players[currentPlayer]) {
      currentChips = 0;
      currentPlayer = (currentPlayer + 1) % numberPlayers;
    }
  }

  return { playersResult: players, currentPlayer, centerChips: center };
}

const gameStatus = (players, currentPlayer, center) => {
  for (let i = 0; i < players.length; i++) {
    const playerStatus = players[i] > 0
      ? (i === currentPlayer
        ? `${players[i]}(+)`
        : `${players[i]}`)
      : `${players[i]}(W)`;

    console.log(`Player ${i + 1}:${playerStatus}`);
  }
  console.log(`Center :${center}\n`);
}