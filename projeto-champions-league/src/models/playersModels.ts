export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  age: number;
}

export interface PlayersModel {
  getAllPlayers: () => Promise<Player[]>;
  getPlayerById: (id: number) => Promise<Player | undefined>;
  addPlayer: (player: Player) => Promise<void>;
  updatePlayer: (
    id: number,
    player: Partial<Player>
  ) => Promise<Player | undefined>;
  deletePlayer: (id: number) => Promise<boolean>;
}
