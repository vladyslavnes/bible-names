<script>
  import { Link } from "svelte-routing";
  import TimingSelect from "./../components/TimingSelect.svelte";

  import { players } from "./../stores/gameData.js";

  const setPlayersNames = e => {
    // console.log(e.target.value);
    players.set(
      e.target.value
        .replace(/,+$/, "")
        .trim()
        .split(/,+/)
    );
  };
</script>

<style>
  section {
    padding: 32px;
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    margin: 16px;
  }

  input {
    display: block;
    text-align: center;
    border: 0;
    padding: 16px;
    background: #ffffff;
    border-radius: 11px;
    margin: 20px 0 0 18px;
    font-size: 1em;
    font-family: Montserrat, sans-serif;
    letter-spacing: 1px;
    text-align: left;
    width: 80%;
  }

  button {
    display: block;
    margin: auto;
    border: 0;
    justify-self: center;
    width: 235px;
    height: 60px;
    color: #ffffff;
    font: 1.75em Montserrat;
    font-weight: bold;
    background: hsl(13, 100%, 60%);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }
</style>

<section>
  <h1>Players names</h1>
  <input
    on:input={setPlayersNames}
    placeholder="John, Jane, Jake"
    type="text"
    id="players-names" />
  <!-- {$players.length} -->
</section>
<section>
  <h1>Time for answer</h1>
  <TimingSelect />
</section>
<section>
  <Link to="/questions">
    <button>Start Game</button>
  </Link>
</section>
