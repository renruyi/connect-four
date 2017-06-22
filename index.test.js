const Board = require('./index');
let board;

test('initiate a board', () => {
  board = new Board();
  expect(typeof board).toBe('object');
  expect(board.nextPlayer).toBe(1);
  expect(board.finished).toBe(false);
  expect(board.winner).toBe(undefined);
})

test('player 1 move on col 0', () => {
  board.play(1, 0)
  expect(board.position[0][0]).toBe(1)
})

test('player 2 move on col 0', () => {
  board.play(-1, 0)
  expect(board.position[0][1]).toBe(-1)
})

test('player 1 move on col 1 and so on', () => {
  board.play(1, 1)
  expect(board.position[1][0]).toBe(1)
  board.play(-1, 1)
  expect(board.position[1][1]).toBe(-1)
  board.play(1, 2)
  expect(board.position[2][0]).toBe(1)
  board.play(-1, 2)
  expect(board.position[2][1]).toBe(-1)
  expect(board.finished).toBe(false);
  expect(board.winner).toBe(undefined);
})

test('player 1 wins', () => {
  board.play(1, 3)
  expect(board.position[3][0]).toBe(1)
  expect(board.finished).toBe(true);
  expect(board.winner).toBe(1);
})