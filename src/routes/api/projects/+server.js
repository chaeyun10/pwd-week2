import { json } from '@sveltejs/kit';

const projects = [
  { slug:'timetable', title:'Timetable Helper', summary:'수업/일정 정리 도우미', tags: ['svelte', 'js', 'css'] },
  { slug:'gallery',   title:'Image Gallery',    summary:'미니 이미지 갤러리', tags: ['svelte', 'js'] },
  { slug:'memo',      title:'Memo Pad',         summary:'로컬에 메모 저장', tags: ['svelte', 'js'] },
  { slug:'go-board',  title:'Go Board',         summary:'간단한 바둑판', tags: ['svelte', 'js', 'game'] }
];

export function GET() {
  return json(projects);
}