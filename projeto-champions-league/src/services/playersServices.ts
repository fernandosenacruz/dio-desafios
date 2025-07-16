import { Player } from "../models/playersModels";
import playersRepository from "../repositories/playersRepository";

class PlayersService {
  private readonly playersRepository;

  constructor() {
    this.playersRepository = playersRepository;
  }

  async getAllPlayers() {
    return await this.playersRepository.getAllPlayers();
  }

  async getPlayerById(id: number) {
    return await this.playersRepository.getPlayerById(id);
  }

  async addPlayer(player: Player) {
    return await this.playersRepository.addPlayer(player);
  }

  async updatePlayer(id: number, player: Partial<Player>) {
    return await this.playersRepository.updatePlayer(id, player);
  }

  async deletePlayer(id: number) {
    return await this.playersRepository.deletePlayer(id);
  }
}

export default PlayersService;
