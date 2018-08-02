# Blocky Puzzle

## To get started

You will need a recent version of [Node]. If you do not have it installed already, we find [nvm] to be a handy script to install and even juggle between versions of Node without too much hassle.

On most projects, we have transitioned into using [Yarn], Facebook's package manager in favour of npm. Either one will do to install and run this project, as well as run its tests.

```sh
yarn
# or `npm install`
yarn start
# or `npm start`
```

`http://localhost:9100/` will open automatically on the blocky app, live-reloading as you develop.

Use `yarn test` to run the unit tests on the terminal. `yarn test --watch` will only run test files relevant to changes since your last commit, and rerun them every time you save.

## Task

Clicking on a block should remove (or hide) itself and all blocks of the same colour that are connected to the target element, then allow the blocks above the removed to "fall down". The "gravity" is similar to [Tetris], but every block is its own 1x1 entity. Unlike Tetris, it's clicking on a block that triggers the removal and fall of blocks.

For example, given:

![Initial state](./initial.jpg)

After clicking one of the bottom right blue boxes, it should look like this:

![state 2](./expectedResult.jpg)

[node]: https://nodejs.org/en/ "Node is a JavaScript runtime built on Chrome's V8 JavaScript engine"
[nvm]: https://github.com/creationix/nvm 'Because nobody wants to upgrade and downgrade Node per project'
[yarn]: https://yarnpkg.com/en/docs/install 'Never go full Facebook though'
[tetris]: https://en.wikipedia.org/wiki/Tetris "You've played Tetris, right?"

## Notes

A key limitation (something I realise is fairly unforgivable) is the lack of working tests. I very sadly abandoned my tests a few hours in, feeling in danger of running out of time to implement anything. With more time I would like to think I'd have kept searching for ways to test. I kept my failing test in so we can discuss the issues with it, and because it did help a little along the way (it initially failed in relevant ways!)

However, as far as I can see, the Blocky works as described in the task. It should be efficient since nothing is re-rendered - only the styles of the blocks are updated.

Other limitations:
- It's not super readable - I'd possibly extract some of the logic out of BlockGrid. `checkColumnElements` is quite unwieldy and could be broken down. I removed a reasonable amount of repetition as I went, but there's still some. It's probably possible to come up with better names for some things.
- I'm not sure if next time around I'd use the approach of updating styles only. It slowed me down a bit, and it's quite fiddly to always be dealing with html elements. I couldn't find a way to turn an htmlCollection into an array, which again made the code a bit less clear in the end.
