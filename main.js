import Tree from "./Tree.js";

const tree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 99, 5, 7, 9, 25, 67, 6345, 324,
]);

tree.insert(105);
tree.prettyPrint(tree.root);
