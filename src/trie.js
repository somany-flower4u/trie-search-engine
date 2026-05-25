export class TrieNode {
  constructor(char = "root", path = "root") {
    this.char = char;
    this.path = path;
    this.name = path === "root" ? "Root Node" : `문자 노드 '${char}'`;
    this.description =
      path === "root"
        ? "모든 단어 탐색이 시작되는 Trie의 최상위 노드"
        : `"${path}" prefix를 표현하는 문자 노드`;
    this.owner = "자료구조 담당";
    this.status = "구현 완료";
    this.isEndOfWord = false;
    this.word = "";
    // 과제 조건의 N-ary Tree 요구에 맞게 자식 노드를 가변 배열로 저장한다.
    this.children = [];
  }
}

export class Trie {
  constructor(words = []) {
    this.root = new TrieNode();
    words.forEach((word) => this.insert(word));
  }

  normalize(word) {
    return word.trim().toLowerCase();
  }

  getSortedChildren(node) {
    return [...node.children].sort((a, b) => a.char.localeCompare(b.char, "ko"));
  }

  findChild(node, char) {
    return node.children.find((child) => child.char === char) || null;
  }

  insert(word) {
    const normalized = this.normalize(word);
    if (!normalized || this.search(normalized)) return false;

    let current = this.root;
    for (const char of normalized) {
      let child = this.findChild(current, char);
      if (!child) {
        const path = current.path === "root" ? char : `${current.path}${char}`;
        child = new TrieNode(char, path);
        current.children.push(child);
      }
      current = child;
    }

    current.isEndOfWord = true;
    current.word = normalized;
    current.name = `단어 끝: ${normalized}`;
    current.description = `"${normalized}" 단어가 완성되는 Leaf 또는 중간 종료 노드`;
    return true;
  }

  findNode(prefix) {
    const normalized = this.normalize(prefix);
    const traversalPath = [this.root.path];
    let current = this.root;

    for (const char of normalized) {
      const child = this.findChild(current, char);
      if (!child) {
        return { node: null, traversalPath, missingChar: char };
      }
      current = child;
      traversalPath.push(current.path);
    }

    return { node: current, traversalPath, missingChar: null };
  }

  search(word) {
    const { node } = this.findNode(word);
    return Boolean(node?.isEndOfWord);
  }

  startsWith(prefix) {
    return Boolean(this.findNode(prefix).node);
  }

  searchWithMetadata(word) {
    const normalized = this.normalize(word);
    const found = this.findNode(normalized);
    return {
      ...found,
      exists: Boolean(found.node?.isEndOfWord),
      word: normalized,
      metadata: found.node ? this.getNodeMetadata(found.node) : null,
    };
  }

  autocomplete(prefix, limit = 5) {
    const normalized = this.normalize(prefix);
    const { node, traversalPath, missingChar } = this.findNode(normalized);
    const words = [];
    const visitedPaths = new Set();
    const resultWordPaths = new Set();
    let visitedNodesCount = 0;

    if (!node) {
      return { words, traversalPath, visitedPaths, resultWordPaths, visitedNodesCount, missingChar };
    }

    const collectWords = (current, currentWord) => {
      if (words.length >= limit) return;
      visitedNodesCount += 1;
      visitedPaths.add(current.path);

      if (current.isEndOfWord) {
        words.push(currentWord);
        for (let i = 1; i <= currentWord.length; i += 1) {
          resultWordPaths.add(currentWord.slice(0, i));
        }
      }

      for (const child of this.getSortedChildren(current)) {
        collectWords(child, `${currentWord}${child.char}`);
        if (words.length >= limit) return;
      }
    };

    collectWords(node, normalized);
    return { words, traversalPath, visitedPaths, resultWordPaths, visitedNodesCount, missingChar };
  }

  delete(word) {
    const normalized = this.normalize(word);
    if (!this.search(normalized)) return false;

    const remove = (node, depth) => {
      if (depth === normalized.length) {
        node.isEndOfWord = false;
        node.word = "";
        node.name = `문자 노드 '${node.char}'`;
        node.description = `"${node.path}" prefix를 표현하는 문자 노드`;
        return node.children.length === 0;
      }

      const char = normalized[depth];
      const childIndex = node.children.findIndex((child) => child.char === char);
      const child = node.children[childIndex];
      const shouldDeleteChild = remove(child, depth + 1);

      if (shouldDeleteChild) {
        node.children.splice(childIndex, 1);
      }

      return !node.isEndOfWord && node.children.length === 0 && node !== this.root;
    };

    remove(this.root, 0);
    return true;
  }

  preOrderTraversal(node = this.root, depth = 0, lines = []) {
    const indent = depth === 0 ? "" : `${"  ".repeat(depth - 1)}-- `;
    const label = node.path === "root" ? "root" : node.char;
    const endMark = node.isEndOfWord ? ` (END: ${node.word})` : "";
    lines.push(`${indent}${label}${endMark} [${node.status}] - ${node.description}`);

    for (const child of this.getSortedChildren(node)) {
      this.preOrderTraversal(child, depth + 1, lines);
    }
    return lines;
  }

  bfsTraversal() {
    const lines = [];
    const queue = [{ node: this.root, depth: 0 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift();
      const indent = depth === 0 ? "" : `${"  ".repeat(depth - 1)}-- `;
      const label = node.path === "root" ? "root" : node.char;
      const endMark = node.isEndOfWord ? ` (END: ${node.word})` : "";
      lines.push(`${indent}${label}${endMark} [depth ${depth}]`);

      for (const child of this.getSortedChildren(node)) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }
    return lines;
  }

  getStats() {
    let totalNodes = 0;
    let leafNodes = 0;
    let wordEndNodes = 0;
    let maxDepth = 0;

    const walk = (node, depth) => {
      totalNodes += 1;
      maxDepth = Math.max(maxDepth, depth);
      if (node.children.length === 0) leafNodes += 1;
      if (node.isEndOfWord) wordEndNodes += 1;
      node.children.forEach((child) => walk(child, depth + 1));
    };

    walk(this.root, 0);
    return { totalNodes, leafNodes, wordEndNodes, maxDepth };
  }

  getNodeMetadata(node) {
    return {
      name: node.name,
      description: node.description,
      owner: node.owner,
      status: node.status,
      path: node.path,
      childCount: node.children.length,
      isLeaf: node.children.length === 0,
      isEndOfWord: node.isEndOfWord,
      word: node.word,
    };
  }

  getVisualizationData(options = {}) {
    const {
      traversalPath = [],
      visitedPaths = new Set(),
      resultWordPaths = new Set(),
    } = options;
    const pathSet = new Set(traversalPath);
    const nodes = [];
    const edges = [];
    let leafIndex = 0;
    const xGap = 88;
    const yGap = 92;

    const measureAndPlace = (node, depth) => {
      const children = this.getSortedChildren(node);
      let x;

      if (children.length === 0) {
        x = leafIndex * xGap;
        leafIndex += 1;
      } else {
        const childPositions = children.map((child) => measureAndPlace(child, depth + 1));
        x = (childPositions[0] + childPositions[childPositions.length - 1]) / 2;
      }

      const isTraversal = pathSet.has(node.path);
      const isCollected = visitedPaths.has(node.path);
      const isSuggestionPath = resultWordPaths.has(node.path);

      nodes.push({
        id: node.path,
        type: "trieNode",
        position: { x, y: depth * yGap },
        data: {
          label: node.path === "root" ? "root" : node.char,
          metadata: this.getNodeMetadata(node),
          isEndOfWord: node.isEndOfWord,
          isTraversal,
          isCollected,
          isSuggestionPath,
        },
      });

      children.forEach((child) => {
        const isTraversalEdge = pathSet.has(node.path) && pathSet.has(child.path);
        const isSuggestionEdge = resultWordPaths.has(child.path);
        edges.push({
          id: `${node.path}-${child.path}`,
          source: node.path,
          target: child.path,
          type: "smoothstep",
          animated: isTraversalEdge,
          style: {
            stroke: isTraversalEdge ? "#0ea5e9" : isSuggestionEdge ? "#10b981" : "#94a3b8",
            strokeWidth: isTraversalEdge || isSuggestionEdge ? 3 : 2,
          },
        });
      });

      return x;
    };

    measureAndPlace(this.root, 0);
    const minX = Math.min(...nodes.map((node) => node.position.x), 0);
    return {
      nodes: nodes.map((node) => ({
        ...node,
        position: { x: node.position.x - minX + 24, y: node.position.y + 24 },
      })),
      edges,
    };
  }
}

export const DEFAULT_WORDS = [
  "apple",
  "app",
  "application",
  "apply",
  "banana",
  "band",
  "bandit",
  "cat",
  "car",
  "card",
  "care",
  "dog",
];
