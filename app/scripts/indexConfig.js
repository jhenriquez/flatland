requirejs(['./rjsConfig'], function () {
	requirejs(['game/GameMaker'], function (gameMaker) {
		this.Flatland = this.Flatland || {};
		this.Flatland.GameMaster = gameMaker;
	});
});