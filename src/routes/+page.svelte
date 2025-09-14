<script>
  let name = $state('');
  let welcome = $derived(name ? `Hello, ${name}!` : 'Welcome!');

  function showFortune() {
    const fortunes = [
      '오늘은 행운이 가득한 하루가 될 거예요!',
      '새로운 시작에 좋은 기운이 따르고 있어요.',
      '뜻밖의 좋은 소식을 듣게 될지도 몰라요!',
      '노력했던 일에서 좋은 결실을 맺을 거예요.',
      '사소한 즐거움이 큰 행복을 가져다 줄 거예요.'
    ];
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortuneMessage = fortunes[randomIndex];

    const greeting = name ? `${name}님, 오늘의 운세입니다. ` : '오늘의 운세입니다. ';
    alert(greeting + fortuneMessage);
  }
</script>

<h1>{welcome}</h1>

<label>
  Your name: <input placeholder="type your name" bind:value={name} />
</label>
<p>미리보기: <strong>{name || '(입력 대기)'}</strong></p>

<button onclick={showFortune}>오늘의 운세 보기</button>