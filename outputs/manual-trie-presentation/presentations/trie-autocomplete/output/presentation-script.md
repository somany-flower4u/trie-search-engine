# Trie 자동완성 검색엔진 발표 대본

## 1. 프로젝트 소개
이 프로젝트는 Trie 자료구조를 이용한 자동완성 검색엔진입니다. 사용자가 단어를 추가하면 Trie에 저장되고, 검색창에 prefix를 입력하면 추천 단어가 바로 표시됩니다. 단순히 결과만 보여주는 것이 아니라, 어떤 노드를 따라 탐색했는지와 추천 단어를 어떻게 수집했는지도 시각화했습니다.

## 2. 문제 정의
자동완성은 사용자가 글자를 입력할 때마다 prefix가 같은 단어를 찾아야 합니다. 배열로 모든 단어를 매번 검사하면 단어 수가 많아질수록 비용이 커집니다. Trie를 사용하면 prefix에 해당하는 경로만 먼저 탐색하고, 그 하위 트리에서만 추천 단어를 수집할 수 있습니다.

## 3. Trie 구조
Trie는 문자 하나를 노드 하나로 저장합니다. 여러 단어가 같은 prefix를 가지면 같은 노드를 공유합니다. 예를 들어 app, apple, application, apply는 root-a-p-p까지 같은 경로를 사용합니다. 각 노드는 children Map과 isEndOfWord 값을 가지고, isEndOfWord가 true이면 그 경로가 완성 단어라는 뜻입니다.

## 4. 핵심 알고리즘
삽입과 검색은 입력 문자열 길이 L만큼 문자를 따라가므로 O(L)입니다. 자동완성은 먼저 prefix 길이만큼 이동한 뒤, 해당 노드 아래에서 DFS로 추천 단어를 수집합니다. 그래서 시간복잡도는 O(L + K)입니다. 여기서 K는 추천 단어를 모으기 위해 방문한 노드 수입니다.

## 5. 구현 흐름
React 상태에는 단어 배열 words만 저장했습니다. Trie 객체는 words에서 useMemo로 다시 만들고, autocomplete 결과에서 traversalPath, visitedPaths, resultWordPaths를 얻습니다. 이 데이터를 React Flow의 nodes와 edges로 바꿔서 탐색 경로는 파란색, 추천 경로는 초록색, 단어 끝 노드는 빨간 점으로 표시했습니다.

## 6. 앱 데모
여기서는 prefix로 app을 입력한 상태입니다. 왼쪽에는 추천 결과가 최대 5개 표시되고, 오른쪽에는 Trie Tree가 표시됩니다. 추천 결과를 클릭하면 검색창에 자동 입력됩니다. 단어를 삭제하면 단어 목록, localStorage, 추천 결과, 시각화가 모두 함께 갱신됩니다.

## 7. 코드 구조
src/trie.js에는 TrieNode와 Trie 클래스가 있고, insert, search, startsWith, autocomplete, delete, getVisualizationData를 구현했습니다. src/App.jsx는 React 상태, localStorage, React Flow 연결을 담당합니다. 자료구조 로직과 UI 렌더링을 분리해서 발표 때 코드 설명이 쉽도록 구성했습니다.

## 8. 마무리
정리하면 Trie는 prefix 검색을 경로 탐색으로 바꿔 자동완성에 적합한 자료구조입니다. 이 프로젝트는 Trie의 동작을 실제 웹앱으로 구현하고, 탐색 경로와 추천 수집 과정을 시각적으로 보여준다는 점이 핵심입니다.
