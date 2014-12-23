describe('GameMaker', function () {
	describe('Test Setup', function () {
		it('should load a global GameMaker object.', function () {
			GameMaker.should.be.ok();
		});
	});

	describe('getCurrentPlayer', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should return the current player from storage.', function () {
			localStorage.should.have.length(0);
			GameStorage.setCurrentPlayer('batida');
			GameMaker.getCurrentPlayer().should.be.ok().and.eql('batida');
		});
	});

	describe('getScore', function () {
		beforeEach(function () {
			localStorage.clear();
		});
		it('should return the score from storage', function () {
			localStorage.should.have.length(0);
			GameStorage.setScore(1);
			GameMaker.getScore().should.eql(1);
		});
	});
});