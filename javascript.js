//Node class represents each position on the chess board and the possible knight moves each position can make
class Node {
  constructor(data) {
    this.data = data;
    this.adjacentNodes = [];
  }
}

//Graph class to represent the board and link the nodes according to movement of teh knight
class Graph {
  constructor() {
    this.nodes = {}; //stores nodes with keys format [x,y]
  }

  //Construct a 7 x 7 chessboard with unique node at every position
  constructGraph() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let node = new Node([i, j]);
        this.nodes[`[${i},${j}]`] = node;
      }
    }
  }

  //adds to nodes each Node's adjacentNodes parameter, linking them according to which other nodes a knight can move to in one turn
  linkNodes() {
    for (let key in this.nodes) {
      let [x, y] = JSON.parse(key);
      let a = x + 1;
      let b = y + 2;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x + 2;
      b = y + 1;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x + 2;
      b = y - 1;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x + 1;
      b = y - 2;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x - 1;
      b = y + 2;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x - 2;
      b = y - 1;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x - 2;
      b = y + 1;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
      a = x - 1;
      b = y - 2;
      if (0 <= a && a < 8 && 0 <= b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        if (linkedNode) {
          this.nodes[key].adjacentNodes.push(linkedNode);
        }
      }
    }
  }

  //ptints all nodes and their keys
  printNodes() {
    for (let key in this.nodes) {
      console.log(`Key: ${key}, Value: ${this.nodes[key]}`);
    }
  }

  //prints individual node including it's data and neighbors
  printNode(key) {
    let node = this.nodes[key];
    console.log("Node: " + node.data);
    console.log("Neighbors: ");
    for (let i = 0; i < node.adjacentNodes.length; i++) {
      console.log(node.adjacentNodes[i].data);
    }
  }

  //finds the shortest path from a start to end node using BFS algorithm
  findPath(start, end) {
    let queue = [start];
    let visited = new Set();
    let cameFrom = new Map();
    while (queue.length != 0) {
      let currNode = queue.shift();
      if (
        currNode.data[0] === end.data[0] &&
        currNode.data[1] === end.data[1]
      ) {
        let path = [];
        let prev = end;
        while (prev !== start) {
          path.push(prev);
          prev = cameFrom.get(prev);
        }
        path.push(start);
        console.log("path: " + path);
        return path.reverse();
      }
      for (let i = 0; i < currNode.adjacentNodes.length; i++) {
        let neighbor = currNode.adjacentNodes[i];
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          cameFrom.set(neighbor, currNode);
        }
      }
    }
    return null;
  }

  //function to find path from start to end and pront results
  knightMoves(start, end) {
    let startKey = JSON.stringify(start);
    let endKey = JSON.stringify(end);
    let startNode = this.nodes[startKey];
    let endNode = this.nodes[endKey];
    let path = this.findPath(startNode, endNode);
    if (path === null) {
      console.log("no path found");
    }
    console.log(`You made it in ${path.length - 1} moves! Here is your path:`);
    console.log(path.map((node) => node.data));
  }
}

//initialize and construct graph
let graph = new Graph();

graph.constructGraph();

graph.linkNodes();

//test case
graph.knightMoves([0, 0], [7, 7]);
