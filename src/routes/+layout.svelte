<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { writable } from 'svelte/store';

  let { children } = $props();

  // 마우스의 현재 좌표를 저장할 상태 변수
  let mouseX = $state(0);
  let mouseY = $state(0);
  function updateMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
  onMount(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  });

  // 메시지 표시를 위한 전역 상태
  export const messageStore = writable({ text: '', visible: false });

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
    <a href="/play">Play</a>
    <a href="/draw">Draw</a>
  </div>
  <button onclick={toggleTheme}>
    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
  </button>
</nav>

<div class="mouse-follower" style:left="{mouseX}px" style:top="{mouseY}px"></div>

<main>
  {@render children()}
</main>

{#if $messageStore.visible}
  <div class="message-box" transition:fade>
    {$messageStore.text}
  </div>
{/if}

<style global>
  @import '../app.css';

  body {
    cursor: none;
  }

  .mouse-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: var(--brand);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.8;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-out;
    z-index: 9999;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-links {
    display: flex;
    gap: 1rem;
  }

  /* 새로운 메시지 박스 스타일 */
  .message-box {
    position: fixed;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    background-color: var(--brand);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 9999;
  }
</style>