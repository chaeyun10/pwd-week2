<script>
  import { onMount } from 'svelte';
  import { messageStore } from '../+layout.svelte';

  let canvas;
  let ctx;
  let isDrawing = false;
  let points = [];
  let score = $state(null);

  onMount(() => {
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    clearCanvas();
  }

  function startDrawing(e) {
    isDrawing = true;
    points = [];
    draw(e);
  }

  function endDrawing() {
    isDrawing = false;
    if (points.length > 10) {
      calculateScore();
    } else {
      showMessage('원을 그리려면 마우스를 더 오래 움직여주세요.');
    }
  }

  function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    points = [...points, { x, y }];

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'var(--brand)';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    score = null;
    points = [];
  }

  function calculateScore() {
    if (points.length < 3) {
      score = 0;
      return;
    }

    // 중심점 계산
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

    // 평균 반지름 계산
    const distances = points.map(p => Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)));
    const averageRadius = distances.reduce((sum, d) => sum + d, 0) / distances.length;

    // 표준 편차를 이용해 정확도 계산 (편차가 작을수록 점수 높음)
    const variance = distances.reduce((sum, d) => sum + Math.pow(d - averageRadius, 2), 0) / distances.length;
    const standardDeviation = Math.sqrt(variance);

    // 점수 변환 (0-100점)
    const accuracy = 100 - (standardDeviation / averageRadius) * 100;
    score = Math.max(0, Math.min(100, accuracy)).toFixed(1);

    showMessage(`정확도: ${score}점! 다시 그리려면 캔버스를 클릭하세요.`);
  }

  function showMessage(msg) {
    messageStore.set({ text: msg, visible: true });
    setTimeout(() => messageStore.set({ text: '', visible: false }), 3000);
  }
</script>

<h1>마우스로 원 그리기</h1>
<p>캔버스 위에서 마우스를 꾹 누른 채로 원을 그려보세요. 정확도를 알려줄게요!</p>

<div class="canvas-container">
  <canvas
    bind:this={canvas}
    on:mousedown={startDrawing}
    on:mouseup={endDrawing}
    on:mousemove={draw}
    on:mouseleave={endDrawing}
  ></canvas>
</div>

{#if score !== null}
  <div class="score-box">
    <h2>당신의 점수: {score}점</h2>
    <p>다시 그리려면 캔버스를 클릭하세요.</p>
  </div>
{/if}

<style>
  .canvas-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  canvas {
    border: 2px solid var(--brand);
    border-radius: 12px;
    background-color: var(--on-surface);
    cursor: crosshair;
  }
  .score-box {
    margin-top: 2rem;
    text-align: center;
  }
  h2 {
    color: var(--brand);
    font-size: 2rem;
  }
</style>