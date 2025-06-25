const rollDice = async () => {
  return Math.floor(Math.random() * 6) + 1;
};

const getRandomBlock = async () => {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
};

const getRandomPlayer = async (players) => {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
};

const getRandomDamage = async () => {
  return Math.floor(Math.random() * 2) + 1;
};

const isDifferentPlayers = (player1, player2) => {
  return player1.id !== player2.id;
};

const logRollResult = async (characterNOME, block, diceResult, attribute) => {
  console.log(
    `${characterNOME} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
};

const declareWinner = (player1, totalPointsPlayer1, player2, totalPointsPlayer2) => {
  if (totalPointsPlayer1 > totalPointsPlayer2) {
    console.log(
      `🏆 ${player1.NOME}: ${totalPointsPlayer1} pontos!`
    );
    return;
  }
  if (totalPointsPlayer2 > totalPointsPlayer1) {
    console.log(
      `🏆 ${player2.NOME}: ${totalPointsPlayer2} pontos!`
    );
    return;
  }
  console.log(
    `🤝 Empate! Ambos os jogadores terminaram com ${totalPointsPlayer1} pontos!`
  );
};

const handleStraight = async (
  player1,
  player2,
  diceResult1,
  diceResult2,
  block
) => {
  await logRollResult(player1.NOME, block, diceResult1, player1.VELOCIDADE);
  await logRollResult(player2.NOME, block, diceResult2, player2.VELOCIDADE);
  return [diceResult1 + player1.VELOCIDADE, diceResult2 + player2.VELOCIDADE];
};

const handleCurve = async (
  player1,
  player2,
  diceResult1,
  diceResult2,
  block
) => {
  await logRollResult(
    player1.NOME,
    block,
    diceResult1,
    player1.MANOBRABILIDADE
  );
  await logRollResult(
    player2.NOME,
    block,
    diceResult2,
    player2.MANOBRABILIDADE
  );
  return [
    diceResult1 + player1.MANOBRABILIDADE,
    diceResult2 + player2.MANOBRABILIDADE,
  ];
};

const handleCombat = async (
  player1,
  player2,
  diceResult1,
  diceResult2,
  block,
  totalPointsPlayer1,
  totalPointsPlayer2
) => {
  let powerResult1 = diceResult1 + player1.PODER;
  let powerResult2 = diceResult2 + player2.PODER;

  console.log(`${player1.NOME} confrontou com ${player2.NOME}! 🥊`);

  await logRollResult(player1.NOME, block, diceResult1, player1.PODER);
  await logRollResult(player2.NOME, block, diceResult2, player2.PODER);

  if (powerResult1 > powerResult2) {
    totalPointsPlayer1 += 1;
    if (totalPointsPlayer2 > 0) totalPointsPlayer2 -= await getRandomDamage();
    console.log(
      `${player1.NOME} venceu o confronto! ${player2.NOME} perdeu 1 ponto 🐢`
    );
  } else if (powerResult2 > powerResult1) {
    totalPointsPlayer2 += 1;
    if (totalPointsPlayer1 > 0) totalPointsPlayer1 -= await getRandomDamage();
    console.log(
      `${player2.NOME} venceu o confronto! ${player1.NOME} perdeu 1 ponto 🐢`
    );
  } else if (powerResult1 === powerResult2) {
    console.log(`Confronto empatado! Nenhum ponto foi perdido!`);
  }

  return [totalPointsPlayer1, totalPointsPlayer2];
};

const matchEngine = async (player1, player2) => {
  let totalPointsPlayer1 = 0;
  let totalPointsPlayer2 = 0;

  for (let i = 0; i <= 5; i++) {
    let block = await getRandomBlock();
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    if (block === "RETA") {
      const [points1, points2] = await handleStraight(
        player1,
        player2,
        diceResult1,
        diceResult2,
        block
      );
      totalPointsPlayer1 += points1;
      totalPointsPlayer2 += points2;
    } else if (block === "CURVA") {
      const [points1, points2] = await handleCurve(
        player1,
        player2,
        diceResult1,
        diceResult2,
        block
      );
      totalPointsPlayer1 += points1;
      totalPointsPlayer2 += points2;
    } else if (block === "CONFRONTO") {
      [totalPointsPlayer1, totalPointsPlayer2] = await handleCombat(
        player1,
        player2,
        diceResult1,
        diceResult2,
        block,
        totalPointsPlayer1,
        totalPointsPlayer2
      );
    }

  }
  declareWinner(player1, totalPointsPlayer1, player2, totalPointsPlayer2);
};

export {
  rollDice,
  getRandomBlock,
  getRandomPlayer,
  isDifferentPlayers,
  logRollResult,
  matchEngine
};
