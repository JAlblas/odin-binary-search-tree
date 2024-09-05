import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) return null;
    array = [...new Set(array)].sort(function (x, y) {
      return x - y;
    });
    const mid = Math.floor((0 + array.length) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1, array.length));

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return node; // Do nothing for duplicates
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  deleteItem(root, value) {
    if (root === null) {
      return root;
    }

    // If key to be searched is in a subtree
    if (root.data > value) {
      root.left = this.deleteItem(root.left, value);
    } else if (root.data < value) {
      root.right = this.deleteItem(root.right, value);
    } else {
      // If root matches with the given key

      // Cases when root has 0 children or
      // only right child
      if (root.left === null) return root.right;

      // When root has only left child
      if (root.right === null) return root.left;

      // When both children are present
      let successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(root.right, successor.data);
    }
    return root;
  }
}

export default Tree;
