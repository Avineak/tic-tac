new Vue({
  el: "#game",
  data: {
    turn: "It's your turn",
    state: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ],
    scores: { X: -10, O: 10, draw: 0 },
    spot: null,
    depth: 0,
    result: "",
    counter: 0,
    clickable: true
  },

  methods: {
    plot: function(place, symbol) {
      document.getElementById(place).innerText = symbol;
    },
    checkEqual: function(one, two, three) {
      return one == two && two == three && one != "";
    },

    winCondition: function() {
      let winner = null;
      let emptySpot = 0;
      //check for every rows
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.checkEqual(
              this.state[i][0],
              this.state[i][1],
              this.state[i][2]
            )
          ) {
            winner = this.state[i][0];
          }
        }
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.checkEqual(
              this.state[0][i],
              this.state[1][i],
              this.state[2][i]
            )
          ) {
            winner = this.state[0][i];
          }
        }
      }

      if (
        this.checkEqual(this.state[0][0], this.state[1][1], this.state[2][2])
      ) {
        winner = this.state[0][0];
      }
      if (
        this.checkEqual(this.state[2][0], this.state[1][1], this.state[0][2])
      ) {
        winner = this.state[2][0];
      }

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.state[i][j] == "") {
            emptySpot++;
          }
        }
      }
      if (winner == null && emptySpot == 0) {
        return "draw";
      } else {
        return winner;
      }
    },

    aiMove: function() {
      let optimalMoves = []; // will hold number of optimal moves to be randomize
      let optimalMove = null; // will hold the coordinate from random optimal moves
      let bestScore = -Infinity;
      let spot = null;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.state[i][j] == "") {
            this.state[i][j] = "O";
            score = this.minimax(this.state, 0, false);
            if (score == 10 || score == 0) {
              optimalMoves.push({ i, j });
            }
            this.state[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
              spot = { x: i, y: j };
            }
          }
        }
      }
      if (optimalMoves.length != 0) {
        optimalMove =
          optimalMoves[Math.floor(Math.random() * optimalMoves.length)];
      }
      if (optimalMove != null) {
        this.state[optimalMove.i][optimalMove.j] = "O";
        this.plot(optimalMove.i + "|" + optimalMove.j, "O");
      } else {
        this.state[spot.x][spot.y] = "O";
        this.plot(spot.x + "|" + spot.y, "O");
      }
      this.turn = "It's your turn";
    },

    whoiswinner: function() {
      this.counter++;
      if (this.counter > 4) {
        result = this.winCondition();
        if (result != null && result != "draw") {
          if (result == "X") {
            this.turn = "You Win";
            this.clickable = false;
          } else {
            this.turn = "Computer Wins";
            this.clickable = false;
          }
        }
      }
    },

    tap: function(event) {
      if (this.clickable) {
        let loc = event.target.id;
        let x = loc[0];
        let y = loc[2];
        if (this.turn == "It's your turn") {
          if (this.state[x][y] == "") {
            this.state[x][y] = "X";
            this.plot(loc, "X");
            this.whoiswinner();
            if (this.counter < 8) {
              let that = this;
              this.turn = "It's computer turn";
              setTimeout(function() {
                that.aiMove();
                that.whoiswinner();
              }, 1000);
            } else {
              this.turn = "It's draw";
            }
          }
        }
      }
    },

    minimax: function(board, depth, isMaximizing) {
      //      if (this.counter > 6) {
      //        this.depth++;
      //        if (this.depth < 100) {
      //          console.log(board, depth);
      //        }
      //      }
      let result = this.winCondition();
      if (result !== null) {
        return this.scores[result];
      }

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
              board[i][j] = "O";
              //if (this.counter > 5) {
              //  this.depth++;
              //  if (this.depth < 100) {
              //    console.log(board, depth);
              //  }
              //}
              score = this.minimax(board, depth + 1, false);
              board[i][j] = "";
              bestScore = Math.max(score, bestScore);
            }
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i <= 2; i++) {
          for (let j = 0; j <= 2; j++) {
            if (board[i][j] == "") {
              board[i][j] = "X";
              score = this.minimax(board, depth + 1, true);
              board[i][j] = "";
              bestScore = Math.min(score, bestScore);
            }
          }
        }
        return bestScore;
      }
    }
  }
});
