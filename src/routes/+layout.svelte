<script>
  import { onMount } from 'svelte';
  let { children } = $props();

  let isDark = $state(false);

  $effect(() => {
    document.body.dataset.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark = savedTheme === 'dark';
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  function toggleTheme() {
    isDark = !isDark;
  }
</script>

<svelte:head>
  <title>AJOU Mini Portfolio</title>
  <meta name="description" content="SvelteKit + Vercel mini portfolio" />
</svelte:head>

<nav>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/play">Play</a> </div>
  <button onclick={toggleTheme}>
    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
  </button>
</nav>

<main>
  {@render children()}
</main>

<style global>
  @import '../app.css';
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-links {
    display: flex;
    gap: 1rem;
  }
</style>