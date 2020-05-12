<script>
  import { answerTime } from "./../stores/gameData.js";

  const setActiveAnswerTime = time => {
    answerTime.set(time);
    console.log($answerTime);
  };
</script>

<style>
  .row {
    display: flex;
    width: 100%;
    /* border: 1px solid #000; */
    justify-content: stretch;
  }

  button {
    display: block;
    padding: 12px;
    border: 0;
    background-color: #ffffff;
    border-radius: 11px;
    margin: 8px;
    font-size: 1.25em;
    /* width: 127px; */
    flex: 1;
    transition: color, background-color 400ms ease;
    box-shadow: 2px 2px 2px #00000055;
    outline: none;
  }

  button.active {
    background-color: #2cce47;
    color: #ffffff;
    box-shadow: none;
    box-shadow: inset 2px 2px 2px #00000055;
  }

  button.round {
    flex: 0;
    width: fit-content;
    padding: 15px;
    border-radius: 50%;
  }
</style>

<div class="row">
  <button
    on:click={() => setActiveAnswerTime(Infinity)}
    class="{$answerTime === Infinity ? 'active' : ''} round">
    <img src="assets/icons/infinity.svg" alt="" />
  </button>
  <button
    on:click={() => setActiveAnswerTime(10)}
    class={$answerTime === 10 ? 'active' : ''}>
    10s
  </button>
  <button
    on:click={() => setActiveAnswerTime(15)}
    class={$answerTime === 15 ? 'active' : ''}>
    15s
  </button>
</div>

<div class="row">
  <button
    on:click={() => setActiveAnswerTime(20)}
    class={$answerTime === 20 ? 'active' : ''}>
    20s
  </button>
  <button
    on:click={() => setActiveAnswerTime(30)}
    class={$answerTime === 30 ? 'active' : ''}>
    30s
  </button>
  <button
    on:click={() => setActiveAnswerTime(60)}
    class={$answerTime === 60 ? 'active' : ''}>
    1 min
  </button>
</div>
