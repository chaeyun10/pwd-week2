// src/routes/projects/[slug]/+page.server.js
import { error } from '@sveltejs/kit';

const DB = {
  'omok-game': { title:'Omok Game', body:'SvelteKit으로 만든 심플한 오목 게임입니다. 5개의 돌을 먼저 연결해 승리하세요!', tags: ['svelte', 'js', 'game'] }
};

export function load({ params }) {
  const key = params.slug;
  const item = DB[key];
  if (!item) throw error(404, 'Not found');
  return { item, slug: key };
}