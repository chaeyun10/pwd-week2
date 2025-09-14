<script>
  import GoBoard from '$lib/GoBoard.svelte';

  let { data } = $props();
  let memo = $state('');

  $effect(() => {
    if (data.slug === 'memo') {
      const saved = localStorage.getItem('memo');
      if (saved) memo = saved;
    }
  });

  function save() {
    localStorage.setItem('memo', memo);
    alert('저장 완료!');
  }
</script>

<h2>{data.item.title}</h2>
<p>{data.item.body}</p>

{#if data.item.tags && data.item.tags.length > 0}
  <div class="tech-stack-icons">
    {#each data.item.tags as tag}
      {#if tag === 'svelte'}
        <img src="/svelte-icon.svg" alt="Svelte" title="Svelte" class="tech-icon" />
      {:else if tag === 'js'}
        <img src="/js-icon.svg" alt="JavaScript" title="JavaScript" class="tech-icon" />
      {:else if tag === 'css'}
        <img src="/css-icon.svg" alt="CSS" title="CSS" class="tech-icon" />
      {:else if tag === 'game'}
        <span role="img" aria-label="Game" style="font-size: 24px;">🎮</span>
      {/if}
    {/each}
  </div>
{/if}

{#if data.slug === 'memo'}
  <textarea rows="6" bind:value={memo} class="card" style="width:100%"></textarea>
  <button onclick={save}>메모 저장</button>
  <p style="opacity:.6">브라우저 로컬에만 저장됩니다.</p>
{:else if data.slug === 'go-board'}
  <GoBoard />
{/if}