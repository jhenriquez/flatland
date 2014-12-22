describe('GameStorage', function () {
	describe('Test Setup', function () {
		it('should load a GameStorage subject into the window.', function () {
			GameStorage.should.be.ok();
		});
	});

	describe('setCurrentPlayer', function () {
		beforeEach(function() {
			localStorage.clear();
		});
		it('should set the current player by name.', function () {
			localStorage.should.have.length(0);
			GameStorage.setCurrentPlayer('Batida');
			localStorage.should.have.length(1);
		});
		it('shoul be idempotent.', function () {
			for(var i = 0; i < 10; i++) {
			  GameStorage.setCurrentPlayer('Batida');
			}
			localStorage.should.have.length(1);
		});
	});

	describe('getCurrentPlayer', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should be able to trieve the current playername.', function () {
			localStorage.should.have.length(0);
			GameStorage.setCurrentPlayer('batida');
			localStorage.should.have.length(1);
			GameStorage.getCurrentPlayer().should.be.eql('batida');
		});
	});

	describe('getScore', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should return 0 when no previous score exists.', function () {
			localStorage.should.have.length(0);
			GameStorage.getScore().should.eql(0);
		});
	});

	describe('setScore', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should set a score.', function () {
			localStorage.should.have.length(0);
			GameStorage.setScore(10);
			GameStorage.getScore().should.be.eql(10);
		});
		it('should ignore an invalid input.', function () {
			GameStorage.setScore(10);
			GameStorage.setScore('InvalidString');
			GameStorage.getScore().should.be.eql(10);
		});
	});

	describe('saveHighScore', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should save a HighScore.', function () {
			localStorage.should.have.length(0);
			GameStorage.saveHighScore('batida', 10);
			localStorage.should.have.length(1);
		});
		it('should ignore a score that is lower than the current one for a player.', function () {
			localStorage.should.have.length(0);
			GameStorage.saveHighScore('batida', 10);
			GameStorage.saveHighScore('batida', 9);
			GameStorage.getHighScores('batida').should.eql([{player: 'batida', score: 10 }]);
		});
		it('should ignore a call where no player has been supplied.', function () {
			localStorage.should.have.length(0);
			GameStorage.saveHighScore(undefined, 10);
			localStorage.should.have.length(0);
			GameStorage.saveHighScore('batida', 10);
			localStorage.should.have.length(1);
			GameStorage.saveHighScore(undefined, 10);
		});
		it('should be idempotent.', function () {
			localStorage.should.have.length(0);
			for(var i = 0; i < 5; i++) {
			  GameStorage.saveHighScore(undefined, 10);
			}
			localStorage.should.have.length(0);
			for(var i = 0; i < 5; i++) {
			  GameStorage.saveHighScore('batida', 10);
			}
			localStorage.should.have.length(1);
		});
	});

	describe('getHighScores', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should return an array.', function () {
			GameStorage.getHighScores().should.be.a('Array');
		});
		it('should return an empty array when no high scores exist.', function () {
			localStorage.should.have.length(0);
			GameStorage.getHighScores().should.be.a('Array').and.have.length(0);
		});
		it('should return an array of objects with the player and score.', function () {
			localStorage.should.have.length(0);
			GameStorage.saveHighScore('batida', 10);
			GameStorage.getHighScores().should.be.a('Array').and.have.length(1).and.eql([{player: 'batida', score: 10}]);
		});
		it('it returns only the results for a single player when a playername is suplied.', function () {
			localStorage.should.have.length(0);
			GameStorage.saveHighScore('batida', 10);
			GameStorage.saveHighScore('Pablo', 10);
			localStorage.should.have.length(2);
			GameStorage.getHighScores('batida').should.be.a('Array').and.have.length(1).and.eql([{player: 'batida', score: 10}]);
		});
	});
});