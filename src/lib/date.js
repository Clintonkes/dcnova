export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${value}T12:00:00`));
}
