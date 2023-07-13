import SlotConfig from './models/slot-config.model';
import SlotResult from './models/slot-result.model';

export default class Slot {
	private config: SlotConfig;

	constructor(config: SlotConfig) {
		this.config = config;
	}

	private getRandomSymbol(reelIndex: number): number {
		const reel = this.config.reels[reelIndex];
		const symbolIndex = Math.floor(Math.random() * reel.length);

		return reel[symbolIndex];
	}

	private generateRandomReels(): number[][] {
		const reels: number[][] = [];

		for (let i = 0; i < this.config.reelsCount; i++) {
			const reel: number[] = [];
			for (let j = 0; j < this.config.rowsCount; j++) {
				reel.push(this.getRandomSymbol(i));
			}
			reels.push(reel);
		}

		return reels;
	}

	private generateSymbolsOnScreen(reels: number[][]): number[][] {
		const symbolsOnScreen: number[][] = [];

		for (let row = 0; row < this.config.rowsCount; row++) {
			const symbolsInRow: number[] = [];
			for (const reel of reels) {
				symbolsInRow.push(reel[row]);
			}
			symbolsOnScreen.push(symbolsInRow);
		}

		return symbolsOnScreen;
	}

	private checkLinePayout(line: number[], symbols: number[][]): number {
		const currentSymbolLine = [];

		for (let index = 0; index < line.length; index++) {
			currentSymbolLine.push(symbols[line[index]][index]);
		}

		const threeConsecutive: number = this.hasThreeConsecutive(currentSymbolLine);
		const fourConsecutive: number = this.hasFourConsecutive(currentSymbolLine);
		const fiveConsecutive: number = this.allSame(currentSymbolLine);

		if (fiveConsecutive) {
			return this.config.symbols[fiveConsecutive][4];
		}
		if (fourConsecutive) {
			return this.config.symbols[fourConsecutive][3];
		}
		if (threeConsecutive) {
			return this.config.symbols[threeConsecutive][2];
		}

		return 0;
	}

	private getLinesPayout(symbols: number[][]): number[] {
		const lines = this.config.lines;
		const linesPayout: number[] = [];

		for (const line of lines) {
			const linePayout = this.checkLinePayout(line, symbols);
			linesPayout.push(linePayout);
		}

		return linesPayout;
	}

	public spin(): SlotResult {
		const reels = this.generateRandomReels();
		const symbols = this.generateSymbolsOnScreen(reels);
		const linesPayout = this.getLinesPayout(symbols);

		const result: SlotResult = {
			reels,
			symbols,
			linesPayout,
		};

		console.log('Reels Position:');
		result.reels.forEach((reel, index) => {
			console.log(`Reel ${index + 1}: ${reel.join(", ")}`);
		});

		console.log('\nSymbols on the Screen:');
		result.symbols.forEach((row, rowIndex) => {
			console.log(`Row ${rowIndex + 1}: ${row.join(", ")}`);
		});

		console.log('\nLines Payout:');
		result.linesPayout.forEach((payout, index) => {
			console.log(`Line ${index + 1}: ${payout}`);
		});

		return result;
	}

	private hasThreeConsecutive(arr: number[]): number {
		for (let i = 0; i < arr.length - 2; i++) {
			if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
				return arr[i];
			}
		}

		return null;
	}

	private hasFourConsecutive(arr: number[]): number {
		for (let i = 0; i < arr.length - 3; i++) {
			if (
				arr[i] === arr[i + 1] &&
				arr[i + 1] === arr[i + 2] &&
				arr[i + 2] === arr[i + 3]
			) {
				return arr[i];
			}
		}

		return null;
	}

	private allSame(arr: number[]): number {
		const firstElement = arr[0];
		if (arr.every((num) => num === firstElement)) {
			return arr[0];
		};

		return null;
	}
}

