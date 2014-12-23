define(['game/GameStorage'], function (storage) {
	function GameMaker(storage) {
		if (!storage || storage.constructor.name != 'GameStorage') {
			throw new Error('The GameMaker requires a GameStorage object.');
		}

		this.getCurrentPlayer = function () {
			return storage.getCurrentPlayer();
		};

		this.getScore = function () {
			return storage.getScore();
		};
	}

	GameMaker.prototype = Object.create(GameMaker.prototype);
	GameMaker.constructor = GameMaker;

	return new GameMaker(storage);
});