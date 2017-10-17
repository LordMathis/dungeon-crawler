# Dungeon Crawler

Roguelike dungeon crawler with procedurally generated dungeons.

The dungeons are first generated using cellular automaton. Then largest area is identified by flood fill algorithm. Finally the largest dungeon is randomly filled with monsters, weapons, healthpacks, keys and a gate.

## Items on the map

- ![#808080](https://placehold.it/15/808080/000000?text=+) player
- ![#E6E600](https://placehold.it/15/E6E600/000000?text=+) key
- ![#009900](https://placehold.it/15/009900/000000?text=+) healthpack
- ![#3366FF](https://placehold.it/15/3366FF/000000?text=+) weapon
- ![#6600FF](https://placehold.it/15/6600FF/000000?text=+) gate
- ![#FF9999](https://placehold.it/15/FF9999/000000?text=+) weakest monsters
- ![#FF4D4D](https://placehold.it/15/FF4D4D/000000?text=+) medium monsters
- ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) strongest monsters

## Rules

To win the game you need to collect all 5 keys and get at least 500 xp. Then you can enter the gate.

Healthpacks regenerate 25 hp. Weapons add 10 to your damage.

Strong monsters deal 20 damage, medium monsters deal 15 damage and weak monsters deal 10 damage. They have 150, 100 and 50 hp and killing them gives you 30, 20 and 10 xp respectively.

## How to run

* Clone the repository `git clone https://github.com/LordMathis/dungeon-crawler`
* Install `yarn install` (or `npm install`)
* Run development server `yarn run start`
* Build for production `yarn run build`
