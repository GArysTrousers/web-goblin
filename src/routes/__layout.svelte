<script>
  import "../app.css";
</script>

<svelte:head>
  <title>Web Goblin</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="flex-row p-3 gap-2">
  <a class="btn icon" href="/">home</a>
  <a class="btn icon" href="/server/server">terminal</a>
</div>
<slot />