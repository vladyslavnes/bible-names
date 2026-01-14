<script>
  import TimingSelect from "./../components/TimingSelect.svelte";
  import {
    players,
    resetGame,
    gameState
  } from "./../stores/gameData.js";

  function handleRestartGame() {
    resetGame();
    window.location.href = '/questions';
  }

  function handleStopGame() {
    gameState.set('finished');
    window.location.href = '/results';
  }

  function handleNewGame() {
    gameState.set('setup');
    window.location.href = '/';
  }
</script>

<style>
  section {
    padding: 32px;
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    margin: 16px 0;
  }

  h2 {
    font-size: 1.3em;
    margin: 24px 0 12px 0;
    color: #666;
  }

  .players-list {
    background: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    margin: 16px 0;
  }

  .player-item {
    padding: 8px 0;
    font-size: 1.1em;
  }

  .settings-section {
    margin: 32px 0;
  }

  .game-controls {
    margin-top: 48px;
  }

  button {
    display: block;
    width: 100%;
    padding: 16px;
    margin: 12px 0;
    border: 0;
    border-radius: 12px;
    font-size: 1.2em;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  button.restart {
    background: hsl(13, 100%, 60%);
  }

  button.stop {
    background: #f15025;
  }

  button.new-game {
    background: #6cb946;
  }
</style>

<section>
  <h1>Settings</h1>

  <div class="settings-section">
    <h2>Current Players</h2>
    <div class="players-list">
      {#each $players as player}
        <div class="player-item">{player}</div>
      {/each}
    </div>
  </div>

  <div class="settings-section">
    <h2>Time for Answer</h2>
    <TimingSelect />
  </div>

  <div class="game-controls">
    <h2>Game Controls</h2>
    <button class="restart" on:click={handleRestartGame}>
      Restart Game
    </button>
    <button class="stop" on:click={handleStopGame}>
      Stop Game
    </button>
    <button class="new-game" on:click={handleNewGame}>
      New Game
    </button>
  </div>
</section>
