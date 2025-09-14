<script>
  import OmokBoard from '$lib/OmokBoard.svelte'; // GoBoard 대신 OmokBoard 임포트

  let { data } = $props();
  // memo 관련 코드는 오목만 남기므로 필요없지만, 혹시 나중에 다른 프로젝트 추가를 위해 일단 주석처리
  // let memo = $state(''); 

  // $effect(() => {
  //   if (data.slug === 'memo') {
  //     const saved = localStorage.getItem('memo');
  //     if (saved) memo = saved;
  //   }
  // });

  // function save() {
  //   localStorage.setItem('memo', memo);
  //   alert('저장 완료!');
  // }
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
        <span role="img" aria-label="Game" style="font-size: 28px;">🎮</span>
      {/if}
    {/each}
  </div>
{/if}

{#if data.slug === 'omok-game'}
  <OmokBoard />
{/if}