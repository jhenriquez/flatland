define(['vendors/modernizr'],function () {
	function GameStorage() {
		this.setCurrentPlayer = function () {

		};

		this.removeCurrentPlayer = function() {

		};

		this.currentPlayer = function () {

		};	

		this.saveHighScore = function (player, score) {

		};

		this.getHighScores = function () {
			return [];
		};
	}

	GameStorage.prototype = Object.create(GameStorage.prototype);
	GameStorage.constructor = GameStorage;

	return new GameStorage();
});