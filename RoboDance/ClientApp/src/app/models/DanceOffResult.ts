import { Robot } from "./Robot";

export interface DanceOffResult {
  id: number;
  winner: number;
  loser: number;
  dancedAt: string;
  winnerRobot?: Robot;
  loserRobot?: Robot
}
