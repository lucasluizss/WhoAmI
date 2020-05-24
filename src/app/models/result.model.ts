export class Result {
		constructor(
			public player: string,
			public score: number
		) { }

		public get scoreTotal(): number {
			return this.score < 0 ? 0 : this.score;
		}
}
