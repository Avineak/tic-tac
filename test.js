class Node {
    constructor(state, depth) {
        this.state = state;
      this.children = [];
      this.value = null;
      this.depth = depth;
    }
    }
class SSTree {
      constructor(state) {
              this.root = new Node(state, 0)
        }
      
      generateTree(){
        this.childMaker(this.root, this.root.depth);
      }
        
      checkEqual(one, two, three) {
          return one == two && two == three && one != "";
        }
        
        checkWinner(node){
          let winner = null;
          let emptySpot = 0;
          //check for every rows
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (
                this.checkEqual(
                  node.state[i][0],
                  node.state[i][1],
                  node.state[i][2]
                )
              ) {
                winner = state[i][0];
              }
            }
          }
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (
                this.checkEqual(
                  node.state[0][i],
                  node.state[1][i],
                  node.state[2][i]
                )
              ) {
                winner = state[0][i];
              }
            }
          }
    
          if (
            this.checkEqual(node.state[0][0], node.state[1][1], node.state[2][2])
          ) {
            winner = node.state[0][0];
          }
          if (
            this.checkEqual(node.state[2][0], node.state[1][1], node.state[0][2])
          ) {
            winner = node.state[2][0];
          }
    
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (node.state[i][j] == "") {
                emptySpot++;
              }
            }
          }
          if (winner == null && emptySpot == 0) {
            return "draw";
          } else {
            return winner;
          }
      }
      
      childMaker(node, depth){
          for(let i = 0; i<3; i++){
            for (let j = 0; j<3; j++){
              if(node.state[i][j] == ""){
                node.state[i][j] = "X";
                node.children.push(new Node(node.state, depth+1));
                node.state[i][j] = "";
              }
            }
          }
        }
    }