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

  // Level order traversal
  levelOrder(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // In-order traversal
  inOrder(callback, node = this.root) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (node !== null) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }

  // Pre-order traversal
  preOrder(callback, node = this.root) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (node !== null) {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  // Post-order traversal
  postOrder(callback, node = this.root) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (node !== null) {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }

  // Calculate height of a given node
  height(node) {
    if (node === null) return -1; // Base case: height of empty node is -1

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Calculate depth of a given node
  depth(node, currentNode = this.root, currentDepth = 0) {
    if (currentNode === null) return -1; // Base case: node not found

    if (node.data === currentNode.data) return currentDepth;

    if (node.data < currentNode.data) {
      return this.depth(node, currentNode.left, currentDepth + 1);
    } else {
      return this.depth(node, currentNode.right, currentDepth + 1);
    }
  }

  // Check if the tree is balanced
  isBalanced(node = this.root) {
    if (node === null) return true; // Base case: empty trees are balanced

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    const heightDifference = Math.abs(leftHeight - rightHeight);

    if (heightDifference > 1) return false;

    // Recursively check subtrees
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  // Rebalance the tree
  rebalance() {
    const values = [];
    this.inOrder((node) => values.push(node.data)); // Gather all nodes in sorted order
    this.root = this.buildTree(values); // Rebuild the tree
  }

  // Insert function (already provided)
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

  // Delete function (already provided)
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

    if (root.data > value) {
      root.left = this.deleteItem(root.left, value);
    } else if (root.data < value) {
      root.right = this.deleteItem(root.right, value);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(root.right, successor.data);
    }
    return root;
  }
}

export default Tree;
