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

  printNodes() {
    for (let key in this.nodes) {
      console.log(`Key: ${key}, Value: ${this.nodes[key]}`);
    }
  }

  printNode(key) {
    let node = this.nodes[key];
    console.log(node.data);
    for (let i = 0; i < node.adjacentNodes.length; i++) {
      console.log(node.adjacentNodes[i].data);
    }
  }

  findPath(start, end) {
    let queue = [start];
    let visited = new Set();
    let currNode = start;
    let cameFrom = new Map();
    visited.add(currNode);
    while (queue.length != 0) {
      if (currNode === end) {
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
    console.log(`You made it in ${path.length - 1} moves! Here is your path:`);
    console.log(path.map((node) => node.data));
  }
}

let graph = new Graph();

graph.constructGraph();

graph.linkNodes();

graph.knightMoves([0, 0], [7, 7]);
