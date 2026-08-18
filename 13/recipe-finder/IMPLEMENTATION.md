# Recipe Finder 実装メモ

require.md の要件に沿って実装した内容の振り返り。どこで何をしていて、props がどう流れているかをまとめる。

---

## 1. ディレクトリ構成と役割

```
src/
├── App.tsx                 # ルーティング定義（Routes）とヘッダー/ナビゲーション
├── main.tsx                 # エントリポイント。BrowserRouter + FavoritesProvider でApp全体をラップ
├── pages/                   # ルートに対応する画面コンポーネント
│   ├── SearchPage.tsx       # "/"        検索・カテゴリ/地域絞り込み・今日の一品
│   ├── MealDetailPage.tsx   # "/meals/:id" 詳細情報 + お気に入りボタン
│   └── FavoritesPage.tsx    # "/favorites" お気に入り一覧
├── components/               # 複数箇所で使い回す部品（ページを持たない）
│   ├── SearchForm.tsx        # 料理名の入力フォーム
│   ├── CategoryAreaFilter.tsx# カテゴリ/地域のプルダウン
│   ├── TodaysPicks.tsx       # ランダム3件の「今日の一品」
│   ├── MealList.tsx          # meal配列 → MealCardのmap
│   ├── MealCard.tsx          # 料理1件のカード（一覧・お気に入り・今日の一品で共通利用）
│   ├── IngredientList.tsx    # 材料・分量の整形表示
│   └── Navigation.tsx        # ヘッダー内の画面遷移リンク
├── context/
│   └── FavoritesContext.tsx  # お気に入り状態をアプリ全体で共有するContext
├── data/
│   └── mealApi.ts            # TheMealDB へのfetchをまとめたAPI層
└── types/
    └── meal.ts                # APIレスポンス・propsで使う型定義
```

---

## 2. 画面とルーティング

`App.tsx` で `react-router` の `Routes` を定義している。

| パス | コンポーネント | 主な処理 |
|---|---|---|
| `/` | `SearchPage` | 名前/カテゴリ/地域検索、今日の一品 |
| `/meals/:id` | `MealDetailPage` | 詳細取得（useEffect）、お気に入り登録/解除 |
| `/favorites` | `FavoritesPage` | お気に入り一覧・削除 |

ヘッダー（`App.tsx`内）に常時 `Navigation` を表示し、`NavLink` で現在地に応じたアクティブ表示を行っている。

---

## 3. 検索画面（SearchPage）の処理 — 複合検索の仕組み

ここがポイント。**名前検索・カテゴリ検索・地域検索の3経路を、同じ `meals` state と同じ表示ロジックに集約している。**

```tsx
// SearchPage.tsx
const [meals, setMeals] = useState<MealSummary[]>([]);
const [status, setStatus] = useState<SearchStatus>("idle");

async function runSearch(fetcher: () => Promise<MealSummary[]>) {
  setStatus("loading");
  try {
    const result = await fetcher();
    setMeals(result);
    setStatus("success");
  } catch {
    setStatus("error");
  }
}

function handleSearch(query: string) {
  runSearch(() => searchMeals(query));            // 名前検索
}
function handleSelectCategory(category: string) {
  runSearch(() => filterMealsByCategory(category)); // カテゴリ検索
}
function handleSelectArea(area: string) {
  runSearch(() => filterMealsByArea(area));          // 地域検索
}
```

`runSearch` は「どのAPI関数を呼ぶか」だけを引数（関数）として受け取り、ローディング/成功/エラーの状態管理と `meals` への反映は共通化。3つの検索方法を同じ if 文の連なり（`status === "loading"` など）で表示できるのはこのため。

### なぜ `Meal` ではなく `MealSummary` を state の型にしたか

TheMealDB のエンドポイントごとに返ってくる情報量が違う。

| エンドポイント | 関数 | 返る情報 |
|---|---|---|
| `search.php` | `searchMeals` | フル情報（材料・作り方込み） |
| `random.php` | `getRandomMeals` | フル情報 |
| `filter.php` | `filterMealsByCategory` / `filterMealsByArea` | `idMeal` `strMeal` `strMealThumb` のみ |

一覧表示（`MealCard`）で使うのはこの3項目だけなので、`MealCard` / `MealList` の props 型を `Meal` ではなく軽量な `MealSummary` にした。`Meal` は `MealSummary` の全プロパティを含む上位互換の形なので、`searchMeals` や `getRandomMeals` が返す `Meal[]` はそのまま `MealSummary[]` として渡せる（TypeScriptの構造的部分型）。これにより **カード表示用のコンポーネントを1つに保ったまま**、検索結果・カテゴリ/地域絞り込み・今日の一品・お気に入り一覧のすべてで使い回せている。

### CategoryAreaFilter との連携

```tsx
<SearchForm onSearch={handleSearch} />
<CategoryAreaFilter
  onSelectCategory={handleSelectCategory}
  onSelectArea={handleSelectArea}
/>
```

`CategoryAreaFilter.tsx` 内部:
- マウント時に `useEffect` で `getCategories()` / `getAreas()`（`list.php?c=list` / `list.php?a=list`）を叩き、プルダウンの選択肢を作る
- カテゴリ側の `<select>` を選ぶと `onSelectCategory(value)` を呼びつつ、地域側のstateを空に戻す（同時に両方の条件で絞り込むUIにはしていない＝どちらか一方を選ぶ設計）
- 選択値は `useState` で管理する controlled select（`SearchForm` の入力欄と同じ考え方）

---

## 4. 詳細画面（MealDetailPage）の処理

```tsx
const { id } = useParams<{ id: string }>();
const [meal, setMeal] = useState<Meal | null>(null);
const [error, setError] = useState(false);
const [loadedId, setLoadedId] = useState<string | null>(null);

useEffect(() => {
  if (!id) return;
  let cancelled = false;
  getMealById(id)
    .then((result) => { if (!cancelled) { setMeal(result); setError(false); setLoadedId(id); } })
    .catch(() => { if (!cancelled) { setError(true); setLoadedId(id); } });
  return () => { cancelled = true; };
}, [id]);
```

- ローディング判定は `loadedId !== id` で行っている（`setStatus("loading")` をeffect本体で直接呼ぶと、ESLintの `react-hooks/set-state-in-effect` に引っかかったため、「まだ今のidの結果が来ていない」ことを既存stateの比較で表現する形に変更した）
- `cancelled` フラグで、idが切り替わったあとに古いレスポンスが遅れて届いてstateを上書きするのを防止

お気に入りボタンは `useFavorites()` から取得した関数で切り替え:

```tsx
const { addFavorite, removeFavorite, isFavorite } = useFavorites();
const favorited = isFavorite(meal.idMeal);
...
onClick={() => (favorited ? removeFavorite(meal.idMeal) : addFavorite(meal))}
```

---

## 5. お気に入り機能（Context）

`context/FavoritesContext.tsx`:

```tsx
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const addFavorite = (meal: Meal) => {
    setFavorites((current) =>
      current.some((f) => f.idMeal === meal.idMeal) ? current : [...current, meal]
    );
  };
  const removeFavorite = (id: string) => {
    setFavorites((current) => current.filter((f) => f.idMeal !== id));
  };
  const isFavorite = (id: string) => favorites.some((f) => f.idMeal === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) throw new Error("useFavoritesはFavoritesProviderの内側で使用してください。");
  return context;
}
```

- `addFavorite` は `some()` で重複チェックしてから追加するので、同じ料理を何度お気に入りに入れても増殖しない
- `main.tsx` で `BrowserRouter` の内側・`App` の外側に `FavoritesProvider` を配置しているので、`SearchPage` / `MealDetailPage` / `FavoritesPage` のどこからでも `useFavorites()` で同じ状態にアクセスできる（Context経由なのでpropsのバケツリレーが不要）

`FavoritesPage.tsx` はこのcontextから `favorites` と `removeFavorite` を取り出し、`MealList` に `onRemove={removeFavorite}` として渡すだけ。

### `MealCard` の削除ボタンとHTML構造

`MealCard` は本体を `<Link>` にしているが、`onRemove` が渡されたときだけ「お気に入り解除」ボタンを表示する。ボタンを `<Link>` の中に入れると `<a>` の中に `<button>` が入れ子になり不正なHTMLになる（クリックで意図せずページ遷移も起きる）ため、`<Link>` と `<button>` を兄弟要素として並べる構造にしている。

```tsx
<div className="meal-card">
  <Link to={`/meals/${meal.idMeal}`} className="meal-card__link">...</Link>
  {onRemove && <button onClick={() => onRemove(meal.idMeal)}>お気に入り解除</button>}
</div>
```

---

## 6. 今日の一品（TodaysPicks）

`mealApi.ts` の `getRandomMeals(count)` は、TheMealDBに「まとめてN件ランダム取得」するエンドポイントが無いため、`random.php` を `count` 回並列fetch（`Promise.all`）し、`idMeal` が重複した場合は除外する形にしている。

```tsx
export async function getRandomMeals(count: number): Promise<Meal[]> {
  const results = await Promise.all(Array.from({ length: count }, () => getRandomMeal()));
  const uniqueMeals: Meal[] = [];
  for (const meal of results) {
    if (meal === null) continue;
    if (uniqueMeals.some((m) => m.idMeal === meal.idMeal)) continue;
    uniqueMeals.push(meal);
  }
  return uniqueMeals;
}
```

`TodaysPicks` はマウント時に一度だけ `useEffect` でこれを呼び、結果を `MealList` に渡すだけの独立コンポーネント。`SearchPage` の検索結果とは別のstateなので、検索してもTodaysPicksの表示は変わらない。

---

## 7. props 受け渡し一覧

| 親 → 子 | props | 型 | 役割 |
|---|---|---|---|
| `SearchPage` → `SearchForm` | `onSearch` | `(query: string) => void` | 送信された料理名を親に通知 |
| `SearchPage` → `CategoryAreaFilter` | `onSelectCategory` / `onSelectArea` | `(value: string) => void` | 選択されたカテゴリ/地域を親に通知 |
| `SearchPage` / `FavoritesPage` / `TodaysPicks` → `MealList` | `meals` / `onRemove?` | `MealSummary[]` / `(id: string) => void` | 一覧描画、削除ボタンの有無を制御 |
| `MealList` → `MealCard` | `meal` / `onRemove?` | `MealSummary` / `(id: string) => void` | 1件分のカード表示 |
| `MealDetailPage` → `IngredientList` | `meal` | `Meal` | 材料整形表示 |

---

## 8. 型定義（`types/meal.ts`）の使い分け

| 型 | 用途 |
|---|---|
| `Meal` | 検索結果・詳細・ランダム取得で使う全項目入りの型 |
| `MealSummary` | カード表示に必要な最小限（`idMeal` `strMeal` `strMealThumb`）。カテゴリ/地域絞り込みの戻り値もこれ |
| `Ingredient` | `IngredientList` が組み立てる `{ name, measure }` の整形後データ |
| `MealSearchResponse` / `MealLookupResponse` / `MealFilterResponse` | 各APIレスポンスの `{ meals: ... }` 形をそのまま表現 |
| `CategoryListResponse` / `AreaListResponse` | `list.php` のレスポンス（`{ strCategory }[]` / `{ strArea }[]`） |

---

## 9. API層（`data/mealApi.ts`）とエンドポイント対応

| 関数 | エンドポイント | 呼び出し元 |
|---|---|---|
| `searchMeals` | `search.php?s=` | `SearchPage.handleSearch` |
| `getMealById` | `lookup.php?i=` | `MealDetailPage`（useEffect） |
| `getCategories` / `getAreas` | `list.php?c=list` / `list.php?a=list` | `CategoryAreaFilter`（useEffect） |
| `filterMealsByCategory` / `filterMealsByArea` | `filter.php?c=` / `filter.php?a=` | `SearchPage.handleSelectCategory/Area` |
| `getRandomMeals` | `random.php`（count回並列） | `TodaysPicks`（useEffect） |

fetch を叩く場所をこの1ファイルに集約しているので、画面側のコンポーネントは「どの関数を呼ぶか」だけを気にすればよい構成にしている。
