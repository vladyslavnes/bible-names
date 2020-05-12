<script>
  //   import { writable } from "svelte/store";
  import {
    players as rawPlayers,
    answerTime,
    names
  } from "./../stores/gameData.js";

  const players = $rawPlayers.map(playerName => ({
    name: playerName,
    score: 0
  }));

  const scorePlayer = score => {
    if (score === 1) {
      names.set($names.slice(1));
    }

    if ($names.length === 0) {
      location.href = "/results";
    } else {
      names.set($names.slice().sort(() => Math.random() - 0.5));
    }
  };
</script>

<style>
  section {
    padding: 32px;
    max-width: 600px;
    margin: 0 auto;
  }

  .card {
    /* max-width: 500px;
    min-height: 100px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 16px 64px 16px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin: 64px auto;
    width: 95%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .timer {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #6cb946;
    color: #ffffff;
    font-size: 21px;
    align-self: flex-start;
  }

  h1 {
    margin-top: 20px;
    font-size: 36px;
    text-align: center;
  }

  h2 {
    padding-left: 16px;
    font-size: 36px;
    font-weight: normal;
  }

  .buttons-wrap {
    width: 100%;
    display: flex;
    justify-content: stretch;
    margin-top: 64px;
  }

  button {
    flex: 1;
    padding: 14px 30px;
    margin: 14px;
    font-size: 1.5em;
    border: 0;
    border-radius: 12px;
    box-shadow: 2px 2px 4px #00000055;
    color: #ffffff;
    font-weight: bold;
  }

  button.no {
    background-color: #2cce47;
  }

  button.yes {
    background-color: #f15025;
  }
</style>

<section>
  <div class="card">
    {#if $answerTime !== Infinity}
      <div class="timer">{$answerTime}</div>
    {/if}
    <h1>{$names[0]}</h1>
  </div>

  <h2>
    <b>{players[0].name},</b>
    can you tell anything about this person?
  </h2>

  <div class="buttons-wrap">
    <button on:click={() => scorePlayer(1)} class="no">I can</button>
    <button on:click={() => scorePlayer(0)} class="yes">I can't</button>
  </div>
</section>
