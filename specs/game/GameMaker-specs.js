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

	describe('createGame', function () {
		var settings = {};

		beforeEach(function () {
			settings.canvas = document.getElementById('test-canvas')
		});

		it('expects a canvas on the settings object.', function () {
			(function () { GameMaker.createGame({}); }).should.throw(Error, /canvas/);
		});

		it('it complains if the provided element is not a canvas.', function () {
			settings.canvas = document.getElementById('fake-canvas');
			 (function () { GameMaker.createGame(settings); }).should.throw(Error, /canvas/);
		});

		it('returns a Game object', function () {
			GameMaker.createGame(settings).should.be.instanceof(Game);
		});
	});
});