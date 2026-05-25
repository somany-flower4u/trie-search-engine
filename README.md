# Trie 자동완성 검색엔진

트리 구조를 활용한 애플리케이션 구현 과제용 React 웹앱입니다. 문자열을 문자 단위 노드로 저장하는 Trie Tree를 사용하여 단어 추가, 삭제, 검색, 자동완성, 전위 탐색 출력, BFS 출력, 통계, 시각화를 제공합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 Vite가 출력하는 로컬 주소를 열면 됩니다. 보통 `http://localhost:5173`입니다.

빌드 확인:

```bash
npm run build
```

## 과제 요구사항 대응

- `TrieNode` 객체 정의: 노드 이름, 설명, 담당자, 구현 상태, 자식 배열, 단어 끝 여부 포함
- N-ary Tree 구현: 각 문자 노드가 여러 자식 노드를 가질 수 있으므로 `children` 배열 사용
- 노드 추가: `insert(word)`로 단어의 문자 노드를 Trie에 삽입
- 노드 삭제: `delete(word)`로 단어 끝 표시를 해제하고 불필요한 말단 노드 제거
- 전체 구조 출력: `preOrderTraversal()` 또는 `bfsTraversal()`로 들여쓰기 출력
- 특정 기능 검색: `searchWithMetadata(word)`로 단어 존재 여부, 경로, 노드 메타데이터 출력
- 통계 기능: 전체 노드 수, Leaf 노드 수, 단어 끝 노드 수, 최대 깊이 계산
- 시각화: React Flow로 Root, Parent, Child, Leaf 관계 표시
- 저장: localStorage에 단어 목록 저장

## 주요 파일 구조

```text
src/
  trie.js       # TrieNode, Trie 클래스와 트리 알고리즘
  App.jsx       # React UI, localStorage, React Flow 시각화 연결
  main.jsx      # React 엔트리 포인트
  styles.css    # Tailwind CSS 및 전역 스타일
```

## 핵심 알고리즘

- `insert(word)`: 단어의 각 문자를 따라가며 없는 자식 노드를 생성합니다. 시간복잡도는 `O(L)`입니다.
- `search(word)`: 입력 문자열의 문자 경로를 따라간 뒤 마지막 노드가 단어 끝인지 확인합니다. 시간복잡도는 `O(L)`입니다.
- `autocomplete(prefix, limit)`: prefix 노드까지 이동한 뒤 DFS로 추천 단어를 수집합니다. 시간복잡도는 `O(L + K)`입니다.
- `delete(word)`: 단어 끝 표시를 해제하고 다른 단어와 공유되지 않는 말단 노드만 정리합니다.
- `preOrderTraversal()`: 현재 노드를 먼저 출력하고 자식 노드를 재귀적으로 방문합니다.
- `bfsTraversal()`: Queue를 사용해 깊이가 낮은 노드부터 방문합니다.

`L`은 입력 문자열 길이이고, `K`는 추천 단어 수집 중 방문한 노드 수입니다.
