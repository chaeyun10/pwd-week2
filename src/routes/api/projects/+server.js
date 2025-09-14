// src/routes/api/projects/+server.js
import { json } from '@sveltejs/kit';

const projects = [
  { slug:'omok-game', title:'Omok Game', summary:'SvelteKit으로 만든 심플한 오목 게임', tags: ['svelte', 'js', 'game'] }
];

export function GET() {
  return json(projects);
}