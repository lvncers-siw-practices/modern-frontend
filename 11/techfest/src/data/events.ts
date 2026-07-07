export type TechEvent = {
  id: string;
  icon: string;
  category: string;
  title: string;
  catchCopy: string;
  time: string;
  place: string;
  target: string;
  description: string;
  contents: string[];
};

export const events: TechEvent[] = [
  {
    id: "ai-workshop",
    icon: "🤖",
    category: "生成AI",
    title: "生成AI体験ワークショップ",
    catchCopy: "AIを使って、アイデアを形にする。",
    time: "10:00〜11:00",
    place: "A棟 301教室",
    target: "中学生・高校生",
    description:
      "生成AIを使いながら、アイデア出しから画像・文章の作成までを体験するワークショップです。初めてAIに触れる方でも参加できます。",
    contents: [
      "生成AIでできることを知る",
      "プロンプトを工夫してみる",
      "AIを使ってイベント用バナーを作る",
    ],
  },
  {
    id: "web-workshop",
    icon: "💻",
    category: "Web制作",
    title: "Webサイト制作体験",
    catchCopy: "はじめてのWebページを作ろう。",
    time: "11:20〜12:20",
    place: "A棟 302教室",
    target: "中学生・高校生",
    description:
      "HTMLとCSSを使って、自分だけのプロフィールページを作成します。文字や色を変更しながら、Webページができあがる仕組みを学びます。",
    contents: [
      "HTMLでページの内容を作る",
      "CSSで色やレイアウトを整える",
      "完成したページをブラウザで確認する",
    ],
  },
  {
    id: "game-workshop",
    icon: "🎮",
    category: "ゲーム開発",
    title: "ゲーム開発体験",
    catchCopy: "JavaScriptで動くゲームを作る。",
    time: "13:00〜14:00",
    place: "B棟 201教室",
    target: "中学生・高校生",
    description:
      "JavaScriptを使って、ボタンを押すとスコアが増えるミニゲームを作成します。プログラムによって画面が変化する楽しさを体験できます。",
    contents: [
      "JavaScriptの役割を知る",
      "クリックイベントを設定する",
      "スコアが変化するゲームを作る",
    ],
  },
  {
    id: "app-workshop",
    icon: "📱",
    category: "アプリ開発",
    title: "スマホアプリ企画体験",
    catchCopy: "毎日の困りごとをアプリで解決する。",
    time: "14:20〜15:20",
    place: "B棟 202教室",
    target: "高校生",
    description:
      "身近な困りごとを解決するスマートフォンアプリを考えます。利用者、機能、画面構成を整理し、アプリ企画書を作成します。",
    contents: [
      "利用者の困りごとを考える",
      "必要な機能を整理する",
      "アプリ画面のアイデアを作る",
    ],
  },
  {
    id: "career-talk",
    icon: "🎤",
    category: "キャリア",
    title: "卒業生キャリアトーク",
    catchCopy: "IT業界で働く卒業生の話を聞く。",
    time: "15:40〜16:20",
    place: "A棟 401ホール",
    target: "保護者・中学生・高校生",
    description:
      "IT企業で働く卒業生が、学生時代に学んだことや現在の仕事について紹介します。進路選択や就職活動の参考になるセッションです。",
    contents: [
      "卒業生の現在の仕事",
      "学生時代に取り組んだこと",
      "IT業界を目指す方へのメッセージ",
    ],
  },
];
