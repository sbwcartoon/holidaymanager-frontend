export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getRecent5Years() {
  return Array.from({length: 5}, (_, i) => getCurrentYear() - i)
    .reverse();
}
