class Board {
  constructor(game) {
    game = game || {};
    this.cols = 7;
    this.rows = 6;
    // hard coded board
    // [0][0] is bottom left
    this.position = game.position || [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    this.nextPlayer = game.nextPlayer || 1;
    this.finished = game.finished || false;
    this.winner = game.winner || undefined;
  }

  toJSON(){
    return {
      position: this.position,
      nextPlayer: this.nextPlayer,
      finished: this.finished,
      winner: this.winner
    }
  }

  play(player, col) {
    if(this.finished){
      throw new Error('game already finished')
    }
    if(player !== this.nextPlayer){
      throw new Error('wrong player')
    }
    for(let i = 0; i < this.rows; i++){
      if(this.position[col][i]===0){
        this.position[col][i] = player;
        this.nextPlayer *= -1;
        this.check(player, col, i);
        return
      }
    }
    throw new Error('illegal play')
  }

  check(player, col, row) {
    this.checkFull();
    this.rowCheck(player, col, row);
    this.colCheck(player, col, row);
    this.diagCheck(player, col, row);
  }

  rowCheck(player, col, row) {
    let score = 0
    for(let i = 0; i < this.cols; i++){
      if(this.position[i][row] === player){
        score += 1;
      }else{
        score = 0
      }
      if(score>=4){
        return this.endGame(player);
      }
    }
  }

  colCheck(player, col, row){
    let score = 0
    for(let i = 0; i < this.rows; i++){
      if(this.position[col][i] === player){
        score += 1;
      }else{
        score = 0
      }
      if(score>=4){
        return this.endGame(player);
      }
    }
  }

  diagCheck(player, col, row){
    this.BLDiagCheck(player, col, row);
    this.BRDiagCheck(player, col, row);
  }

  BLDiagCheck(player, col, row){
    const startCol = col - Math.min(col, row);
    const startRow = row - Math.min(col, row);
    let x = startCol, y = startRow;
    let score = 0;
    while (x < this.cols && y < this.rows){
      if(this.position[x][y] === player) {
        score += 1;
      }else{
        score = 0
      }
      if(score>=4){
        return this.endGame(player);
      }
      x += 1;
      y += 1;
    }
  }

  BRDiagCheck(player, col, row){
    let startCol, startRow;
    if(col + row < this.rows){
      startCol = 0;
      startRow = col + row;
    }else{
      startCol = col + this.rows - 1 - row;
      startRow = this.rows -1;
    }

    let x = startCol, y = startRow;
    let score = 0;
    while (x < this.cols && y > 0){
      if(this.position[x][y] === player) {
        score += 1;
      }else{
        score = 0
      }
      if(score>=4){
        return this.endGame(player);
      }
      x += 1;
      y -= 1;
    }
  }

  checkFull(){
    for(let i=0; i<this.cols; i++) {
      for(let j=0; j<this.rows; j++) {
        if(this.position[i][j]===0) return;
      }
    }
    this.endGame(0);
  }

  endGame(winner) {
    console.log('winner is', winner)
    this.finished = true;
    this.winner = winner;
  }
}

module.exports = Board;