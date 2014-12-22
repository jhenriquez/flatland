describe('GameMaker', function () {
	describe('Test Setup', function () {
		it('should load a GameStorage object into the window object.', function () {
			window.GameStorage.should.be.ok();
		});
	});
});