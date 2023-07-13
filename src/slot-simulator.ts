import Slot from './slot-game';

export default class SlotSimulator {
  private slot: Slot;
  private totalWins: number;
  private totalBets: number;

  constructor(slot: Slot) {
    this.slot = slot;
    this.totalWins = 0;
    this.totalBets = 0;
  }

  public runSimulation(numSpins: number): void {
    console.log(`Running simulation with ${numSpins} spins...`);

    const startTime = Date.now();

    for (let i = 0; i < numSpins; i++) {
      const result = this.slot.spin();
      const totalLinePayout = result.linesPayout.reduce((sum, payout) => sum + payout, 0);

      this.totalWins += totalLinePayout;
      this.totalBets += 1;
    }

    const endTime = Date.now();
    // Get execution time in seconds
    const executionTime = (endTime - startTime) / 1000;

    // Each spin is $5 - a line with 5 * 1s wins 50$
    console.log('\n');
    console.log(`Simulation completed in ${executionTime} seconds.`);
    console.log(`Total wins: $${this.totalWins}`);
    console.log(`Total bets: $${this.totalBets * 50}`);
    console.log(`Win ratio: ${this.totalWins / this.totalBets * 2}%`);
  }
}
