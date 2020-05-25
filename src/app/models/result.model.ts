export class Result {
		constructor(
			public player: string,
			public score?: number,
		) {
			this.date = new Date();
		}

		public date: Date;

		public get scoreTotal(): number {
			return this.score < 0 ? 0 : this.score;
		}
}
