class Node {
  constructor(data) {
    this.data = data;
    this.adjacentNodes = [];
  }
}

class Graph {
  constructor() {
    this.nodes = {};
  }

  constructGraph() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let node = new Node([i, j]);
        this.nodes[`[${i},${j}]`] = node;
      }
    }
  }

  linkNodes() {
    for (let key in this.nodes) {
      let [x, y] = JSON.parse(key);
      let a = x + 1;
      let b = y + 2;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x + 2;
      b = y + 1;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x + 2;
      b = y - 1;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x + 1;
      b = y - 2;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x - 1;
      b = y + 2;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x - 2;
      b = y - 1;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x - 2;
      b = y + 1;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
      a = x - 1;
      b = y - 2;
      if (-1 <= a && a < 8 && -1 < b && b < 8) {
        let linkedNode = this.nodes[`[${a},${b}]`];
        this.nodes[key].adjacentNodes.push(linkedNode);
      }
    }
  }

  printNodes() {
    for (let key in this.nodes) {
      console.log(`Key: ${key}, Value: ${this.nodes[key]}`);
    }
  }

  findPath(start, end) {
    let queue = [start];
    let visited = new Set();
    let currNode = start;
    let cameFrom = {};
    visited.add(currNode);
    while (queue.length != 0) {
      if (currNode === end) {
        let path = [];
        let prev = end;
        path.push(prev);
        while (prev != start) {
          prev = cameFrom[prev];
          path.push(prev);
        }
        path.push(start);
        return path.reverse();
      }
      console.log(currNode);
      for (let i = 0; i < currNode.adjacentNodes.length; i++) {
        let neighbor = currNode.adjacentNodes[i];
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          cameFrom[neighbor] = currNode;
        }
      }
      currNode = queue.shift();
    }
    return null;
  }

  knightMoves(start, end) {
    let startKey = JSON.stringify(start);
    let endKey = JSON.stringify(end);
    let startNode = this.nodes[startKey];
    let endNode = this.nodes[endKey];
    let path = this.findPath(startNode, endNode);
    console.log(path);
  }
}

let graph = new Graph();

graph.constructGraph();

graph.linkNodes();

graph.knightMoves([3, 3], [4, 3]);
