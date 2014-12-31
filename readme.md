### Flatland ###

Flatland is a [Snake](http://en.wikipedia.org/wiki/Snake_%28video_game%29) like game developed using JavaScript and Canvas 2D.

Right now the game exposes very basic functionality:

- Controls With Arrow Keys.
- Game Pausing (Space bar) and Resetting (mouse click).
- Responsive Canvas (with Twitter Bootstrap).
- OnScreen controls for small devices.

You can try it [here](http://flatland.herokuapp.com).

### Playing with the source ###

You need to have [NodeJS](http://nodejs.org/) >= '0.10' and [grunt-cli](https://www.npmjs.com/package/grunt-cli). Clone this repository and

````
npm install
````

To run the tests:

````
npm test | grunt test
````

### Design Overview ###

The game is composed of four modules. 

##### GameStorage #####

This module handles the storage of application information, spcificially the DOM storage. The idea is to have a simple and consistent contract to access data.

##### GameMaker #####

Essentially a factory for creating a Game object.

##### Game #####

Here is where the gross of the logic is encapsulated.

##### Block #####

The smallest peace of drawable content.
