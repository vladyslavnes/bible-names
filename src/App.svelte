<script>
  import { Router, Link, Route } from "svelte-routing";
  import { setContext } from "svelte";

  import Home from "./routes/Home.svelte";
  import Questions from "./routes/Questions.svelte";
  import Results from "./routes/Results.svelte";
  import Settings from "./routes/Settings.svelte";

  export let url = "";
  let navbarHeading = "Bible Names";
</script>

<style>
  nav {
    height: 48px;
    padding: 0 16px;
    background: #f15025;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
  }

  nav img {
    width: 32px;
    height: 32px;
  }

  nav img.settings {
    width: 22px;
  }

  nav h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    padding-left: 16px;
    color: #ffffff;
    flex: 1;
    text-align: center;
  }

  /* div {
  } */
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
    rel="stylesheet" />
</svelte:head>

<Router {url}>
  <nav>
    <Link to="/">
      <img src="assets/images/app-icon.svg" alt="" />
    </Link>
    <h1>{navbarHeading}</h1>
    <Link to="/settings">
      <img class="settings" src="assets/icons/settings.svg" alt="" />
    </Link>
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="/questions" component={Questions} />
    <Route path="/results" component={Results} />
    <Route path="/settings" component={Settings} />
  </div>
</Router>
