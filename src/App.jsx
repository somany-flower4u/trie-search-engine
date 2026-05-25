import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MiniMap,
  Panel,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import {
  BarChart3,
  CheckCircle2,
  Database,
  GitBranch,
  ListRestart,
  ListTree,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { DEFAULT_WORDS, Trie } from "./trie";

const STORAGE_KEY = "trie-autocomplete-words";

function normalizeWord(word) {
  return word.trim().toLowerCase();
}

function loadInitialWords() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved)) {
      return [...new Set(saved.map(normalizeWord).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, "ko"),
      );
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return [...DEFAULT_WORDS].sort((a, b) => a.localeCompare(b, "ko"));
}

function TrieGraphNode({ data }) {
  const stateClasses = data.isTraversal
    ? "border-sky-500 bg-sky-50 text-sky-800 shadow-[0_0_0_5px_rgba(14,165,233,0.16)]"
    : data.isSuggestionPath
      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
      : data.isCollected
        ? "border-amber-400 bg-amber-50 text-amber-900"
        : "border-slate-300 bg-white text-slate-700";

  return (
    <div
      className={`relative flex h-12 w-12 items-center justify-center rounded-md border-2 text-sm font-bold shadow-sm ${stateClasses}`}
      title={data.metadata.description}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-0 !bg-transparent"
      />
      {data.label}
      {data.isEndOfWord && (
        <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-white bg-rose-500" />
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-0 !bg-transparent"
      />
    </div>
  );
}

const nodeTypes = { trieNode: TrieGraphNode };

function App() {
  const [words, setWords] = useState(loadInitialWords);
  const [newWord, setNewWord] = useState("");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notice, setNotice] = useState("");
  const [traversalMode, setTraversalMode] = useState("preorder");

  // React 상태는 단어 배열만 보관하고, Trie 자료구조는 상태에서 파생해 관리한다.
  const trie = useMemo(() => new Trie(words), [words]);
  const autocomplete = useMemo(() => trie.autocomplete(query, 5), [trie, query]);
  const stats = useMemo(() => trie.getStats(), [trie]);
  const traversalLines = useMemo(
    () => (traversalMode === "preorder" ? trie.preOrderTraversal() : trie.bfsTraversal()),
    [trie, traversalMode],
  );
  const visualization = useMemo(
    () =>
      trie.getVisualizationData({
        traversalPath: autocomplete.traversalPath,
        visitedPaths: autocomplete.visitedPaths,
        resultWordPaths: autocomplete.resultWordPaths,
      }),
    [trie, autocomplete],
  );

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(visualization.nodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(visualization.edges);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    setFlowNodes(visualization.nodes);
    setFlowEdges(visualization.edges);
  }, [visualization, setFlowNodes, setFlowEdges]);

  const addWord = useCallback(
    (event) => {
      event.preventDefault();
      const normalized = normalizeWord(newWord);
      if (!normalized) {
        setNotice("추가할 단어를 입력하세요.");
        return;
      }
      if (words.includes(normalized)) {
        setNotice(`"${normalized}"는 이미 Trie에 저장되어 있습니다.`);
        return;
      }
      setWords((currentWords) =>
        [...currentWords, normalized].sort((a, b) => a.localeCompare(b, "ko")),
      );
      setNewWord("");
      setNotice(`"${normalized}" 단어를 추가했습니다.`);
    },
    [newWord, words],
  );

  const checkWord = useCallback(() => {
    const normalized = normalizeWord(query);
    if (!normalized) {
      setSearchResult(null);
      setNotice("검색할 단어를 입력하세요.");
      return;
    }

    const result = trie.searchWithMetadata(normalized);
    setSearchResult(result);
    setNotice(result.exists ? `"${normalized}" 단어를 찾았습니다.` : "단어가 없습니다.");
  }, [query, trie]);

  const deleteWord = useCallback((word) => {
    setWords((currentWords) => currentWords.filter((item) => item !== word));
    setSearchResult((currentResult) =>
      currentResult?.word === word ? null : currentResult,
    );
    setNotice(`"${word}" 단어를 삭제했습니다.`);
  }, []);

  const resetAll = useCallback(() => {
    setWords([]);
    setQuery("");
    setNewWord("");
    setSearchResult(null);
    setNotice("Trie를 비웠습니다.");
  }, []);

  const restoreExamples = useCallback(() => {
    setWords([...DEFAULT_WORDS].sort((a, b) => a.localeCompare(b, "ko")));
    setSearchResult(null);
    setNotice("기본 예시 단어를 다시 불러왔습니다.");
  }, []);

  const pathLabels = autocomplete.traversalPath.map((path) =>
    path === "root" ? "root" : path.at(-1),
  );

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-5 sm:px-6 lg:h-screen lg:px-8">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
              <GitBranch className="h-4 w-4" />
              트리 구조 활용 애플리케이션
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
              Trie 자동완성 검색엔진
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={restoreExamples}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
            >
              <RotateCcw className="h-4 w-4" />
              예시 단어
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <ListRestart className="h-4 w-4" />
              전체 초기화
            </button>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="flex min-h-0 flex-col gap-4">
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <label htmlFor="search-input" className="text-sm font-semibold text-slate-700">
                자동완성 / 단어 검색
              </label>
              <div className="mt-2 flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="search-input"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value.toLowerCase());
                      setSearchResult(null);
                    }}
                    placeholder="prefix 또는 단어 입력"
                    className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={checkWord}
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-slate-900 px-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  <Search className="h-4 w-4" />
                  검색
                </button>
              </div>

              {searchResult && (
                <div
                  className={`mt-3 rounded-md border px-3 py-2 text-sm ${
                    searchResult.exists
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {searchResult.exists ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {searchResult.exists ? "단어가 존재합니다" : "단어가 없습니다"}
                  </div>
                  <p className="mt-2 font-mono text-xs">
                    경로: {searchResult.traversalPath.join(" / ")}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-700">추천 결과</h2>
                  <span className="text-xs font-medium text-slate-500">최대 5개</span>
                </div>
                <div className="flex min-h-12 flex-wrap gap-2">
                  {autocomplete.words.length > 0 ? (
                    autocomplete.words.map((word) => (
                      <button
                        type="button"
                        key={word}
                        onClick={() => {
                          setQuery(word);
                          setSearchResult(trie.searchWithMetadata(word));
                        }}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                      >
                        {word}
                      </button>
                    ))
                  ) : (
                    <p className="py-2 text-sm text-slate-500">prefix로 시작하는 단어가 없습니다.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <form onSubmit={addWord}>
                <label htmlFor="word-input" className="text-sm font-semibold text-slate-700">
                  단어 추가
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="word-input"
                    value={newWord}
                    onChange={(event) => setNewWord(event.target.value)}
                    placeholder="새 단어"
                    className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-sky-600 px-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    <Plus className="h-4 w-4" />
                    추가
                  </button>
                </div>
              </form>
              {notice && <p className="mt-3 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-600">{notice}</p>}
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BarChart3 className="h-4 w-4 text-indigo-600" />
                Trie 통계
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <Stat label="전체 노드" value={stats.totalNodes} />
                <Stat label="Leaf 노드" value={stats.leafNodes} />
                <Stat label="단어 끝 노드" value={stats.wordEndNodes} />
                <Stat label="최대 깊이" value={stats.maxDepth} />
              </div>
            </section>

            <section className="flex min-h-[230px] flex-1 flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Database className="h-4 w-4 text-sky-600" />
                  저장된 단어
                </h2>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {words.length}개
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-auto pr-1">
                <ul className="space-y-2">
                  {words.map((word) => (
                    <li key={word} className="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setQuery(word)}
                        className="min-w-0 truncate text-left text-sm font-semibold text-slate-700 hover:text-sky-700"
                      >
                        {word}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteWord(word)}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-rose-200 bg-white text-rose-600 transition hover:bg-rose-50"
                        title={`${word} 삭제`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>

          <section className="grid min-h-[760px] grid-rows-[minmax(420px,1fr)_auto] gap-4 xl:min-h-0">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel">
              <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.2}
                maxZoom={1.6}
                nodesDraggable={false}
                nodesConnectable={false}
              >
                <Background color="#dbe4ef" gap={22} />
                <MiniMap
                  pannable
                  zoomable
                  nodeColor={(node) => {
                    if (node.data?.isTraversal) return "#0ea5e9";
                    if (node.data?.isSuggestionPath) return "#10b981";
                    if (node.data?.isEndOfWord) return "#f43f5e";
                    return "#94a3b8";
                  }}
                />
                <Controls showInteractive={false} />
                <Panel position="top-left">
                  <div className="rounded-md border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                    Trie Tree: Root / Node / Child / Leaf 시각화
                  </div>
                </Panel>
              </ReactFlow>
            </div>

            <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <ListTree className="h-4 w-4 text-sky-600" />
                    전체 구조 출력
                  </h2>
                  <div className="flex rounded-md border border-slate-200 bg-slate-50 p-1">
                    <ModeButton active={traversalMode === "preorder"} onClick={() => setTraversalMode("preorder")}>
                      Pre-order
                    </ModeButton>
                    <ModeButton active={traversalMode === "bfs"} onClick={() => setTraversalMode("bfs")}>
                      BFS
                    </ModeButton>
                  </div>
                </div>
                <pre className="max-h-56 overflow-auto rounded-md bg-slate-950 p-3 text-xs leading-6 text-slate-100">
                  {traversalLines.join("\n")}
                </pre>
              </div>

              <AlgorithmPanel
                query={query}
                pathLabels={pathLabels}
                autocomplete={autocomplete}
                searchResult={searchResult}
              />
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-xs font-bold text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-2xl font-bold text-slate-950">{value}</div>
    </div>
  );
}

function ModeButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-bold transition ${
        active ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

function AlgorithmPanel({ query, pathLabels, autocomplete, searchResult }) {
  const metadata = searchResult?.metadata;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <h2 className="text-sm font-bold text-slate-800">검색 경로와 메타데이터</h2>
      <dl className="mt-3 space-y-2 text-sm">
        <Info label="현재 prefix" value={query || "(empty)"} mono />
        <Info label="탐색 경로" value={pathLabels.join(" → ")} mono />
        <Info label="추천 결과" value={autocomplete.words.join(", ") || "없음"} />
        <Info label="방문 노드 K" value={autocomplete.visitedNodesCount} mono />
        {metadata && (
          <>
            <Info label="노드 이름" value={metadata.name} />
            <Info label="설명" value={metadata.description} />
            <Info label="담당자/상태" value={`${metadata.owner} / ${metadata.status}`} />
          </>
        )}
      </dl>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
        <span className="rounded-md bg-indigo-50 px-2.5 py-2 text-indigo-700">삽입 O(L)</span>
        <span className="rounded-md bg-emerald-50 px-2.5 py-2 text-emerald-700">검색 O(L)</span>
        <span className="rounded-md bg-amber-50 px-2.5 py-2 text-amber-800">자동완성 O(L + K)</span>
        <span className="rounded-md bg-slate-100 px-2.5 py-2 text-slate-700">L: 문자열 길이</span>
      </div>
    </section>
  );
}

function Info({ label, value, mono = false }) {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-md bg-slate-50 px-3 py-2">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className={`break-words text-slate-800 ${mono ? "font-mono text-xs" : ""}`}>{value}</dd>
    </div>
  );
}

export default App;
