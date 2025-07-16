import { PlayersModel, Player } from "../models/playersModels";
import { readFileSync, writeFileSync } from "fs";

const playersFilePath = "src/data/players.json";
const readPlayersFile = async (): Promise<Player[]> => {
  try {
    const data = readFileSync(playersFilePath, "utf-8");
    return JSON.parse(data) as Player[];
  } catch (error) {
    console.error("Error reading players file:", error);
    return [];
  }
};

const getAllPlayers = async (): Promise<Player[]> => {
  const players = await readPlayersFile();
  return players.sort((a, b) => a.name.localeCompare(b.name));
};

const getPlayerById = async (id: number): Promise<Player | undefined> => {
  const players = await getAllPlayers();
  return players.find((player) => player.id === id);
};

const addPlayer = async (player: Player): Promise<void> => {
  const players = await getAllPlayers();
  const newId =
    players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1;
  const newPlayer = { ...player, id: newId };
  players.push(newPlayer);
  try {
    writeFileSync(playersFilePath, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error("Error writing to players file:", error);
  }
};

const updatePlayer = async (
  id: number,
  player: Partial<Player>
): Promise<Player | undefined> => {
  const players = await getAllPlayers();
  const index = players.findIndex((p) => p.id === id);

  if (index === -1) return undefined;

  const updatedPlayer = { ...players[index], ...player };
  players[index] = updatedPlayer;

  try {
    writeFileSync(playersFilePath, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error("Error writing to players file:", error);
  }

  return updatedPlayer;
};

const deletePlayer = async (id: number): Promise<boolean> => {
  const players = await getAllPlayers();
  const index = players.findIndex((player) => player.id === id);

  if (index === -1) return false;

  players.splice(index, 1);

  try {
    writeFileSync(playersFilePath, JSON.stringify(players, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing to players file:", error);
    return false;
  }
};

const playersRepository: PlayersModel = {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer,
};

export default playersRepository;
