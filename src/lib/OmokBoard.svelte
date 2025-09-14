<script>
  let { size = 15 } = $props(); // 오목판은 보통 15x15
  let board = $state(Array(size).fill(null).map(() => Array(size).fill(0)));
  let currentPlayer = $state(1); // 1: 흑돌, 2: 백돌
  let winner = $state(null); // null: 게임 중, 1: 흑돌 승, 2: 백돌 승

  function resetGame() {
    board = Array(size).fill(null).map(() => Array(size).fill(0));
    currentPlayer = 1;
    winner = null;
  }

  function checkWin(r, c, player) {
    const directions = [
      [0, 1],   // 가로
      [1, 0],   // 세로
      [1, 1],   // 대각선 (↘)
      [1, -1]   // 대각선 (↙)
    ];

    for (const [dr, dc] of directions) {
      let count = 1;

      // 정방향 체크
      for (let i = 1; i < 5; i++) {
        const nr = r + i * dr;
        const nc = c + i * dc;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] === player) {
          count++;
        } else {
          break;
        }
      }

      // 역방향 체크
      for (let i = 1; i < 5; i++) {
        const nr = r - i * dr;
        const nc = c - i * dc;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) {
        return true;
      }
    }
    return false;
  }

  function placeStone(row, col) {
    if (board[row][col] !== 0 || winner) { // 이미 돌이 있거나 게임이 끝났으면 놓을 수 없음
      return;
    }

    const newBoard = board.map(rowArray => [...rowArray]);
    newBoard[row][col] = currentPlayer;
    board = newBoard;

    if (checkWin(row, col, currentPlayer)) {
      winner = currentPlayer;
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1; // 다음 턴으로 넘김
    }
  }
</script>

<div class="omok-game-container">
  <div class="status-area">
    {#if winner}
      <h3 class="winner-message">🎉 {winner === 1 ? '흑돌' : '백돌'} 승리!</h3>
      <button onclick={resetGame} class="reset-button">다시 하기</button>
    {:else}
      <p class="current-turn">
        현재 차례:
        <span class="player-indicator {currentPlayer === 1 ? 'black-turn' : 'white-turn'}">
          {currentPlayer === 1 ? '흑돌' : '백돌'}
        </span>
      </p>
    {/if}
  </div>

  <div class="omok-board" style="--size: {size};">
    {#each board as row, rowIndex}
      {#each row as stone, colIndex}
        <div
          class="omok-point"
          onclick={() => placeStone(rowIndex, colIndex)}
          style:border-right={colIndex === size - 1 ? 'none' : ''}
          style:border-bottom={rowIndex === size - 1 ? 'none' : ''}
        >
          {#if stone === 1}
            <div class="stone black-stone"></div>
          {:else if stone === 2}
            <div class="stone white-stone"></div>
          {/if}
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .omok-game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: var(--card-bg); /* 다크모드 지원 */
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: fit-content;
    margin: 2rem auto;
  }

  .status-area {
    text-align: center;
    margin-bottom: 1.5rem;
    width: 100%;
    min-height: 80px; /* 메시지가 나왔을 때 레이아웃이 크게 흔들리지 않도록 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .current-turn {
    font-size: 1.1em;
    color: var(--text-color);
  }

  .player-indicator {
    font-weight: bold;
    padding: 0.3em 0.7em;
    border-radius: 20px;
    margin-left: 0.5em;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    display: inline-block;
  }

  .black-turn {
    background-color: #333;
    color: white;
  }

  .white-turn {
    background-color: #eee;
    color: #333;
    border: 1px solid #ccc;
  }

  .winner-message {
    color: var(--brand);
    font-size: 1.8em;
    margin-bottom: 1em;
  }

  .reset-button {
    background-color: var(--brand);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }

  .reset-button:hover {
    background-color: #4a2eaf; /* 브랜드 색상보다 약간 어둡게 */
  }

  .omok-board {
    display: grid;
    grid-template-columns: repeat(var(--size), 1fr);
    grid-template-rows: repeat(var(--size), 1fr);
    width: clamp(300px, 90vw, 600px); /* 반응형 크기 조절 */
    height: clamp(300px, 90vw, 600px);
    background-color: #d1b48c; /* 바둑판 나무색 */
    border: 1px solid #000;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    border-radius: 4px;
  }

  .omok-point {
    position: relative;
    width: 100%;
    height: 100%;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    display: flex; /* 돌을 중앙에 배치하기 위함 */
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.1s ease;
  }
  .omok-point:hover:not(.stone) {
    background-color: rgba(0, 0, 0, 0.05); /* 돌을 놓을 수 있는 곳에 호버 효과 */
  }

  .stone {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  .black-stone {
    background-color: #000;
  }
  .white-stone {
    background-color: #fff;
    border: 1px solid #000;
  }
</style>