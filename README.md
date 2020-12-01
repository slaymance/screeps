# screeps
My codebase for the game Screeps

## Setup
1. Install [Yarn](https://yarnpkg.com/getting-started) package manager.
2. In the project's directory, run the command `yarn` to install dependencies.
3. Edit `'.example.env.main'` and replace `YOUR_TOKEN` with your own Screeps API token.
    1. You can generate a Screeps API token here: https://screeps.com/a/#!/account/auth-tokens
4. Rename the file `'.example.env.main'` to `'.env.main'`. This step is important or your access token could be leaked to git.
5. In the project's directory, run the command `yarn push`.

The code in `src/` will be compiled and start running on Screeps' official servers.