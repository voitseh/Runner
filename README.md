# Runner
Runner game created using Pixi.js and TypeScript.

# Technical details
## How to build and run?
To build the project use **webpack** and then use some **static server** to serve the web.

### Step-by-step guide
Here is the whole process for those who got lost or those who are just starting out.

1. Install and configure [node.js]
2. Open your favorite shell and change directory to _root_ at _./runner_
3. Install all npm modules (listed as dependencies in package.json).

   ```
   npm install
   ```
4. Run webpack to compile.

   ```
   npm run build
   ```
   
   and you should see something like this:
   
   ```
    Hash: 2a83d3d1cc776185f2cd
    Version: webpack 1.14.0
    Time: 2473ms
                      Asset     Size  Chunks             Chunk Names
    ./build/scripts/main.js  1.23 MB       0  [emitted]  main
        + 190 hidden modules
    ```
5. Install and use some static web server. E.g. install [Superstatic](https://github.com/firebase/superstatic)

For use via CLI

$ npm install -g superstatic
For use via API

npm install superstatic --save

, run superstatic at _./runner_. Shell output may look something like this
   
   ```
   Superstatic started.
   Visit http://localhost:3474 to view your app.
   ```
   
   Visit suggested web address to play the game.

