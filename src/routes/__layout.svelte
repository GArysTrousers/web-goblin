<script>
  import "../app.css";
</script>

<svelte:head>
  <title>Web Goblin</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="flex-row p-3 gap-2">
  <a class="btn icon" href="/" title="Home">home</a>
  <a class="btn icon" href="/terminal" title="Terminal">terminal</a>
  <a class="btn icon" href="/new" title="New Server">add</a>
</div>
<slot />