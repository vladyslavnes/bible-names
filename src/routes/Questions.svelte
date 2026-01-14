<script>
  import { onMount, onDestroy } from "svelte";
  import {
    players as rawPlayers,
    answerTime,
    names,
    playerScores,
    currentPlayerIndex,
    gameState,
    nextPlayer,
    shuffleNames
  } from "./../stores/gameData.js";

  let timeRemaining = Infinity;
  let timerInterval = null;
  let isHandlingAnswer = false;

  function startTimer() {
    stopTimer();
    if ($answerTime === Infinity || $gameState !== 'playing' || isHandlingAnswer) return;
    
    timeRemaining = $answerTime;
    timerInterval = setInterval(() => {
      if (timeRemaining <= 0) {
        handleAnswer(0);
      } else {
        timeRemaining--;
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  $: {
    if ($answerTime !== Infinity && $gameState === 'playing' && !isHandlingAnswer) {
      startTimer();
    } else if ($answerTime === Infinity || $gameState !== 'playing') {
      stopTimer();
    }
  }

  function handleAnswer(score) {
    if (isHandlingAnswer) return;
    isHandlingAnswer = true;
    stopTimer();
    
    if (score === 1) {
      playerScores.addScore($currentPlayerIndex, 1);
      names.update(n => {
        const newNames = n.slice(1);
        if (newNames.length === 0) {
          gameState.set('finished');
          window.location.href = '/results';
          return [];
        }
        return newNames;
      });
      
      if ($names.length > 1) {
        shuffleNames();
      }
    }

    if ($names.length === 0) {
      gameState.set('finished');
      window.location.href = '/results';
      isHandlingAnswer = false;
      return;
    }

    nextPlayer();
    isHandlingAnswer = false;
    
    if ($answerTime !== Infinity && $gameState === 'playing') {
      startTimer();
    }
  }

  onMount(() => {
    gameState.set('playing');
    if ($answerTime !== Infinity) {
      startTimer();
    }
  });

  onDestroy(() => {
    stopTimer();
  });
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

  .timer.warning {
    background-color: #f15025;
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
    {#if $answerTime !== Infinity && $gameState === 'playing'}
      <div class="timer" class:warning={timeRemaining <= 5}>{timeRemaining}</div>
    {/if}
    {#if $names.length > 0}
      <h1>{$names[0]}</h1>
    {:else}
      <h1>No more names!</h1>
    {/if}
  </div>

  {#if $names.length > 0 && $playerScores.length > 0}
    <h2>
      <b>{$playerScores[$currentPlayerIndex]?.name || 'Player'},</b>
      can you tell anything about this person?
    </h2>

    <div class="buttons-wrap">
      <button on:click={() => handleAnswer(1)} class="no">I can</button>
      <button on:click={() => handleAnswer(0)} class="yes">I can't</button>
    </div>
  {/if}
</section>
