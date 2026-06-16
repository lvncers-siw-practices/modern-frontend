import { z } from "zod";

// Zod でバリデーションルールを定義
export const formSchema = z.object({
  name: z.string().min(1, "氏名を入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  grade: z.enum(["1年生", "2年生", "3年生", "4年生"]),
  course: z.enum(["フロントエンド", "バックエンド", "インフラ", "デザイン"]),
  reason: z
    .string()
    .min(1, "参加理由を入力してください")
    .min(10, "参加理由は10文字以上で入力してください"),
});

// フォームの型を定義
export type FormValues = z.infer<typeof formSchema>;

// デフォルト値を定義
export const defaultValues: FormValues = {
  name: "",
  email: "",
  grade: "4年生",
  course: "フロントエンド",
  reason: "",
};
