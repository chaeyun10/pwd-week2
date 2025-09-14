import { error } from '@sveltejs/kit';

const DB = {
  timetable: { title:'Timetable Helper', body:'나만의 시간표를 정리하는 도구입니다.', tags: ['svelte', 'js', 'css'] },
  gallery:   { title:'Image Gallery',    body:'미니 갤러리 예시입니다.', tags: ['svelte', 'js'] },
  memo:      { title:'Memo Pad',         body:'브라우저 로컬에 메모를 저장/복원합니다.', tags: ['svelte', 'js'] },
  'go-board': { title:'Go Board',         body:'SvelteKit으로 만든 간단한 바둑판입니다. 클릭해서 돌을 놓아보세요!', tags: ['svelte', 'js', 'game'] }
};

export function load({ params }) {
  const key = params.slug;
  const item = DB[key];
  if (!item) throw error(404, 'Not found');
  return { item, slug: key };
}