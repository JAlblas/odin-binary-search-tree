import Tree from "./Tree.js";

// Helper function to generate an array of random numbers < 100
function generateRandomArray(size, max = 100) {
  const randomArray = [];
  while (randomArray.length < size) {
    const randomNum = Math.floor(Math.random() * max);
    randomArray.push(randomNum);
  }
  return randomArray;
}

// Helper function to print a tree in different traversal orders
function printTreeTraversals(tree) {
  console.log("\nLevel-order traversal:");
  tree.levelOrder((node) => console.log(node.data));

  console.log("\nPre-order traversal:");
  tree.preOrder((node) => console.log(node.data));

  console.log("\nPost-order traversal:");
  tree.postOrder((node) => console.log(node.data));

  console.log("\nIn-order traversal:");
  tree.inOrder((node) => console.log(node.data));
}

// 1. Create a binary search tree from an array of random numbers < 100
const randomNumbers = generateRandomArray(15); // Create an array of 15 random numbers < 100
const tree = new Tree(randomNumbers);

console.log("Random numbers inserted in the tree:", randomNumbers);

// 2. Confirm the tree is balanced
console.log("\nIs the tree balanced?", tree.isBalanced());

// 3. Print all elements in level, pre, post, and in order traversals
printTreeTraversals(tree);

// 4. Unbalance the tree by adding several numbers > 100
const numbersToUnbalance = [150, 200, 250, 300, 350];
numbersToUnbalance.forEach((num) => tree.insert(num));

console.log("\nNumbers added to unbalance the tree:", numbersToUnbalance);

// 5. Confirm that the tree is unbalanced
console.log("\nIs the tree unbalanced?", !tree.isBalanced());

// 6. Balance the tree by calling rebalance
console.log("\nRebalancing the tree...");
tree.rebalance();

// 7. Confirm that the tree is balanced after rebalancing
console.log("\nIs the tree balanced after rebalancing?", tree.isBalanced());

// 8. Print all elements in level, pre, post, and in order traversals
printTreeTraversals(tree);
