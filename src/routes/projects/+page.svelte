<script>
  import OmokBoard from '$lib/OmokBoard.svelte';
  // Card 컴포넌트는 더 이상 사용되지 않으므로 임포트 제거
  // let { data } = $props(); // Projects 목록 페이지에서 데이터 로드가 더 이상 필요 없음
</script>

<h1>My Project: Omok Game</h1>
<p>아래에서 심플한 오목 게임을 즐겨보세요!</p>

<OmokBoard />