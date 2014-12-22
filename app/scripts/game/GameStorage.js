define(['vendors/modernizr'],function () {
	function GameStorage() {
		this.setCurrentPlayer = function (playername) {
			localStorage['Flatland.CurrentPlayer'] = playername;
		};

		this.getCurrentPlayer = function () {
			return localStorage['Flatland.CurrentPlayer'];
		};

		this.setScore = function (score) {
			if (!isValidScore(score)) return;
			localStorage['Flatland.Score'] = score;
		};

		this.getScore = function () {
			return parseInt(localStorage['Flatland.Score']) || 0;
		};

		this.saveHighScore = function (player, score) {
			if (!player) return;
			var highScore = 'Flatland.HighScores.' + player;
			if (!isValidScore(score)) return;
			if ((localStorage[highScore] || 0) < score) {
				localStorage[highScore] = score;
			}
		};

		this.getHighScores = function (player) {
			var scores = [];
			for (var value in localStorage) {
				var valid = value.match(/^Flatland.HighScores.(.+)$/);
				if(valid) {
					if (player && valid[1] === player) {
						return [{ player: valid[1], score: parseInt(localStorage[valid[0]]) }];
					}
					scores.push({
						player: valid[1],
						score: parseInt(localStorage[valid[0]])
					});
				}
			}
			return scores;
		};

		function isValidScore(score) {
			return !isNaN(parseInt(score));
		}

		if (!Modernizr.localstorage) {
			throw new Error("This module requires a browser that supports localStorage. Don't expect the game to work properly.");
		}
	}

	GameStorage.prototype = Object.create(GameStorage.prototype);
	GameStorage.constructor = GameStorage;

	return new GameStorage();
});