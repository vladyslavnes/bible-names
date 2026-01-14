<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import {
    playerScores,
    names,
    resetGame,
    gameState
  } from "./../stores/gameData.js";

  let sortedScores = [];
  let winners = [];
  let totalNamesAnswered = 0;

  $: {
    sortedScores = [...$playerScores].sort((a, b) => b.score - a.score);
    const maxScore = sortedScores.length > 0 ? sortedScores[0].score : 0;
    winners = sortedScores.filter(p => p.score === maxScore && maxScore > 0);
    totalNamesAnswered = $playerScores.reduce((sum, p) => sum + p.score, 0);
  }

  function handlePlayAgain() {
    resetGame();
    window.location.href = '/questions';
  }

  function handleNewGame() {
    gameState.set('setup');
    window.location.href = '/';
  }

  onMount(() => {
    gameState.set('finished');
  });
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
    text-align: center;
  }

  h2 {
    font-size: 1.5em;
    margin: 24px 0 16px 0;
    text-align: center;
    color: #f15025;
  }

  .summary {
    text-align: center;
    margin: 24px 0;
    font-size: 1.1em;
    color: #666;
  }

  .leaderboard {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 24px;
    margin: 32px 0;
  }

  .leaderboard-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin: 8px 0;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .leaderboard-item.winner {
    background: #fff4e6;
    border: 2px solid #f15025;
  }

  .leaderboard-item.rank-1 {
    background: #fff4e6;
    border: 2px solid #f15025;
  }

  .player-name {
    font-size: 1.3em;
    font-weight: bold;
  }

  .player-score {
    font-size: 1.5em;
    font-weight: bold;
    color: #f15025;
  }

  .rank-badge {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f15025;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 16px;
  }

  .buttons-wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
  }

  button {
    width: 100%;
    padding: 16px;
    border: 0;
    border-radius: 12px;
    font-size: 1.2em;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  button.play-again {
    background: hsl(13, 100%, 60%);
  }

  button.new-game {
    background: #6cb946;
  }
</style>

<section>
  <h1>Game Over!</h1>
  
  {#if winners.length > 0}
    <h2>
      {#if winners.length === 1}
        Winner: {winners[0].name}!
      {:else}
        Winners: {winners.map(w => w.name).join(', ')}!
      {/if}
    </h2>
  {:else}
    <h2>No winners yet</h2>
  {/if}

  <div class="summary">
    Total names answered correctly: {totalNamesAnswered}
  </div>

  <div class="leaderboard">
    <h2 style="margin-top: 0;">Leaderboard</h2>
    {#each sortedScores as player, index}
      <div class="leaderboard-item" class:rank-1={index === 0 && player.score > 0}>
        <div style="display: flex; align-items: center;">
          <div class="rank-badge">{index + 1}</div>
          <div class="player-name">{player.name}</div>
        </div>
        <div class="player-score">{player.score}</div>
      </div>
    {/each}
  </div>

  <div class="buttons-wrap">
    <button class="play-again" on:click={handlePlayAgain}>
      Play Again
    </button>
    <button class="new-game" on:click={handleNewGame}>
      New Game
    </button>
  </div>
</section>
