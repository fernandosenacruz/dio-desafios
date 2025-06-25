import PLAYERS from "./players.js";
import { getRandomPlayer, isDifferentPlayers, matchEngine } from "./match.js";

const main = async () => {
  const player1 = await getRandomPlayer(PLAYERS);
  let player2 = await getRandomPlayer(PLAYERS);

  while (!isDifferentPlayers(player1, player2)) {
    player2 = await getRandomPlayer(PLAYERS);
  }

  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await matchEngine(player1, player2);
};

await main();
