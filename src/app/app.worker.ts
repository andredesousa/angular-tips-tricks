/// <reference lib="webworker" />

function generateFibonacci(element: number): number {
  const sequence = [0, 1];

  for (let i = 2; i < element; i++) {
    sequence[i] = sequence[i - 2] + sequence[i - 1];
  }

  return sequence[element - 1];
}

addEventListener('message', ({ data }) => {
  postMessage(generateFibonacci(data));
});
