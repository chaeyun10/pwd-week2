<script>
  let { size = 19 } = $props();

  let board = $state(Array(size).fill(null).map(() => Array(size).fill(0)));
  let currentPlayer = $state(1);
  let winner = $state(null);

  function resetBoard() {
    board = Array(size).fill(null).map(() => Array(size).fill(0));
    currentPlayer = 1;
    winner = null;
  }

  function checkWin(row, col) {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    const player = board[row][col];

    for (const [dr, dc] of directions) {
      let count = 1;

      for (let i = 1; i < 5; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
        } else {
          break;
        }
      }

      for (let i = 1; i < 5; i++) {
        const r = row - i * dr;
        const c = col - i * dc;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) {
        winner = player;
        return;
      }
    }
  }

  function placeStone(row, col) {
    if (board[row][col] !== 0 || winner) {
      return;
    }

    const newBoard = board.map(rowArray => [...rowArray]);
    newBoard[row][col] = currentPlayer;
    board = newBoard;

    checkWin(row, col);

    if (!winner) {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }
</script>

<div class="go-board-container">
  <div class="status-message">
    {#if winner}
      <h3 class="winner">🎉 {winner === 1 ? '흑돌' : '백돌'} 승리!</h3>
      <button on:click={resetBoard} class="reset-button">다시 하기</button>
    {:else}
      <p>현재 차례:
        <span class="player-turn {currentPlayer === 1 ? 'black-turn' : 'white-turn'}">
          {currentPlayer === 1 ? '흑돌' : '백돌'}
        </span>
      </p>
    {/if}
  </div>

  <div class="go-board" style="--size: {size};">
    {#each board as row, rowIndex}
      {#each row as stone, colIndex}
        <div class="go-point" on:click={() => placeStone(rowIndex, colIndex)}>
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
  .go-board-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #d1b48c;
    border-radius: 8px;
  }
  .go-board {
    display: grid;
    grid-template-columns: repeat(var(--size), 1fr);
    grid-template-rows: repeat(var(--size), 1fr);
    width: 600px;
    height: 600px;
    border: 1px solid #000;
  }
  .go-point {
    position: relative;
    width: 100%;
    height: 100%;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .go-point:nth-child(var(--size)n) {
    border-right: none;
  }
  .go-point:nth-last-child(-n + var(--size)) {
    border-bottom: none;
  }
  .stone {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  .status-message {
    text-align: center;
    margin-bottom: 1rem;
  }
  .player-turn {
    font-weight: bold;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }
  .black-turn {
    color: #fff;
    background-color: #000;
  }
  .white-turn {
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
  }
  .winner {
    color: var(--brand);
  }
  .reset-button {
    background-color: var(--brand);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
  }
</style>