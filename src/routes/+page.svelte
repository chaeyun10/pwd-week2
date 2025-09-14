<script>
  import { messageStore } from './+layout.svelte';

  let name = $state('');
  let welcome = $derived(name ? `Hello, ${name}!` : 'Welcome!');

  function showMessage(msg) {
    messageStore.set({ text: msg, visible: true });
    setTimeout(() => messageStore.set({ text: '', visible: false }), 3000);
  }
</script>

<h1>{welcome}</h1>

<label>
  Your name: <input placeholder="type your name" bind:value={name} />
</label>
<p>미리보기: <strong>{name || '(입력 대기)'}</strong></p>

<button onclick={() => showMessage('안녕하세요, 만나서 반가워요!')}>인사하기</button>