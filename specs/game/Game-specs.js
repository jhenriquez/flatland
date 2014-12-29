describe('Game', function () {
	describe('Test Setup', function () {
		it('should load a GameMaker object in the global environment.', function () {
			GameMaker.should.be.ok();
		});
	});

	describe('Internal State/Construction', function () {
		var game;
		var canvas = document.getElementById('test-canvas');

		beforeEach(function () {
			game = GameMaker.createGame({
				canvas: canvas,
				width: 50,
				height: 50
			});
		});

		it('should return the internal canvas when getCanvas is called.', function () {
			game.getCanvas().should.be.a(typeof canvas).and.eql(canvas);
		});

		it('should be able to set a direction with setDirection.', function () {
			game.getDirection().should.eql(0);
			game.setDirection(1);
			game.getDirection().should.eql(1);
		});

		it('will ignore any direction that is not between 0-3', function () {
			game.getDirection().should.eql(0);
			game.setDirection(5);
			game.getDirection().should.eql(0);
		});

		it('should return the internally set direction when getDirection is called.', function () {
			game.getDirection().should.eql(0);
		});

		it('should provide the default speed when getSpeed is called.', function () {
			game.getSpeed().should.eql(200);
		});

		it('should indicate if the game is paused.', function () {
			game.isPaused().should.not.be.ok();
		});

		it('should allow pause toggle.', function () {
			game.isPaused().should.not.be.ok();
			game.pauseToggle();
			game.isPaused().should.be.ok();
		});
	});
});