define(function () {
	function Block (x, y, size, context) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.size = size;
	}

	Block.prototype.clear = function () {
		this.context.clearRect(this.x,this.y,this.size,this.size);
	};

	Block.prototype.draw = function () {
		this.context.fillRect(this.x,this.y,this.size,this.size);
	};

	Block.prototype = Object.create(Block.prototype);
	Block.constructor = Block;

	return Block;
});