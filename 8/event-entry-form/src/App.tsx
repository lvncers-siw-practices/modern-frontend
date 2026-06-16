import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, type FormValues, formSchema } from "./schema";

// バリデーションライブラリ （Zod + react-hook-formの業界標準ï）

// ┌─────────────┐        ┌──────────────────┐        ┌─────────────┐
// │ Zod         │        │ @hookform/resolvers/zod   |react-hook-form │
// │ (schema.ts) │────▶   │                  │────▶   │            │
// │ バリデーションルール定義   │  橋渡し役          │        │  フォーム管理 │
// └─────────────┘        └──────────────────┘        └─────────────┘

// ------------------------------送信の流れ------------------------------
// ユーザーが「送信する」クリック
// → handleSubmit が Zod で検証
//   → 失敗: errors にメッセージが入る（result-card は出ない）
//   → 成功: onSubmit(data) が呼ばれ、submittedData に保存

// 参考: https://qiita.com/Yasushi-Mo/items/798f6c1b155382e44dbc

function App() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // ここが一番大事な部分！
  //
  // 引数
  // FormValues: schema.ts の型
  // zodResolver(formSchema): 「送信時に formSchema で検証してね」という 関数
  // formSchema: バリデーションルールの定義
  // defaultValues: デフォルト値
  //
  // 返り値
  // register: input とフォームを紐づけ（value / onChange を自動管理）
  //           各 input にスプレッドするため、以前の useState + onChange が不要
  // handleSubmit: 高階関数。送信時に formSchema で検証
  //               event.preventDefault(); を実行して、デフォルトの挙動をキャンセル
  // formState:
  //               { errors }: バリデーション失敗時のエラーメッセージ
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Zod と接続
    defaultValues,
  });

  function onSubmit(data: FormValues) {
    setSubmittedData(data);
  }

  return (
    <main className="app">
      <h1>イベント参加申込フォーム</h1>

      <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="name">氏名</label>
          <input
            id="name"
            type="text"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p className="error-message" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p className="error-message" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="grade">学年</label>
          <select
            id="grade"
            aria-invalid={errors.grade ? true : undefined}
            {...register("grade")}
          >
            <option value="1年生">1年生</option>
            <option value="2年生">2年生</option>
            <option value="3年生">3年生</option>
            <option value="4年生">4年生</option>
          </select>
          {errors.grade && (
            <p className="error-message" role="alert">
              {errors.grade.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="course">希望コース</label>
          <select
            id="course"
            aria-invalid={errors.course ? true : undefined}
            {...register("course")}
          >
            <option value="フロントエンド">フロントエンド</option>
            <option value="バックエンド">バックエンド</option>
            <option value="インフラ">インフラ</option>
            <option value="デザイン">デザイン</option>
          </select>
          {errors.course && (
            <p className="error-message" role="alert">
              {errors.course.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="reason">参加理由</label>
          <textarea
            id="reason"
            aria-invalid={errors.reason ? true : undefined}
            {...register("reason")}
          />
          {errors.reason && (
            <p className="error-message" role="alert">
              {errors.reason.message}
            </p>
          )}
        </div>

        <button type="submit">送信する</button>
      </form>

      {submittedData && (
        <div className="result-card">
          <h2>送信内容</h2>

          <div className="result-item">
            <strong>氏名：</strong>
            {submittedData.name}
          </div>

          <div className="result-item">
            <strong>メールアドレス：</strong>
            {submittedData.email}
          </div>

          <div className="result-item">
            <strong>学年：</strong>
            {submittedData.grade}
          </div>

          <div className="result-item">
            <strong>希望コース：</strong>
            {submittedData.course}
          </div>

          <div className="result-item">
            <strong>参加理由：</strong>
            {submittedData.reason}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
