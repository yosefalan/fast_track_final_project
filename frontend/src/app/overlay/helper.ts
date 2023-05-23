export function show(): void {
  const modal = document.querySelector<HTMLElement>('.modal');
  if (modal !== null) {
    modal.style.display = 'block';
  }
}
