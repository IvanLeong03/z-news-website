// src/data/articles.js

const articles = [
  {
    id: "001",
    title:{
      en: "China’s Xi meets international business reps as Beijing turns up the charm",
      'zh-Hant': "習近平會見國際商界代表，北京展現魅力",
      'zh-Hans': "习近平会见国际商界代表，北京展现魅力"
    },
    image: "/src/assets/university1.jpg",
    liberalPercent: 33,
    cPercent: 67,
    sources: 30,
    sentimentScore: -0.25,
    subjectivityScore: 0.75,
    location: {
      en: "Beijing, China",
      'zh-Hant': "中國北京",
      'zh-Hans': "中国北京"
    },
    firstReported: "28 March, 2025",
    published: "28 March, 2025 (updated 2 hours ago)",
    linked_articles: ['article 1', 'article 2', 'article 3']
  },
  {
    id: "002",
    title: {
      en: "‘Reverse Deng’: can Europe pull a role reversal and secure Chinese battery tech?",
      'zh-Hant': "「逆鄧」：歐洲能否扭轉局勢，獲取中國電池技術？",
      'zh-Hans': "「逆邓」：欧洲能否扭转局势，获取中国电池技术？"
    },
    image: "/src/assets/section-3-background-2.jpg",
    liberalPercent: 49,
    cPercent: 51,
    sources: 22,
    location: {
      en: "Earth",
      'zh-Hant': "地球",
      'zh-Hans': "地球"
    },
    firstReported: "30 March, 2025",
    published: "30 March, 2025 (updated 1 hour ago)",
    linked_articles: ['article 1', 'article 2']
  },
  {
    id: "003",
    title: {
      en: "Amid Trump uncertainty, is this ‘best time’ for China to win friends in Southeast Asia?",
      'zh-Hant': "在特朗普不確定性下，這是中國在東南亞結交朋友的最佳時機嗎？",
      'zh-Hans': "在川普不确定性下，这是中国在东南亚结交朋友的最佳时机吗？"
    },
    image: "/src/assets/university1.jpg",
    liberalPercent: 60,
    cPercent: 40,
    sources: 16,
    location: {
      en: "Earth",
      'zh-Hant': "地球",
      'zh-Hans': "地球"
    },
    firstReported: "30 March, 2025",
    published: "30 March, 2025 (updated 1 hour ago)",
    linked_articles: ['article 1', 'article 2', 'article 3', 'article 4']
  },
  {
    id: "004",
    title: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      'zh-Hant': "下定決心回復單身都不覺荒涼",
      'zh-Hans': "下定决心回复单身都不觉荒凉"
    },
    image: "/src/assets/university1.jpg",
    location: "Earth",
    firstReported: "30 March, 2025",
    published: "30 March, 2025 (updated 1 hour ago)",
    linked_articles: []
  },
  {
    id: "005",
    title: {
      en: "'Brilliant' Z News wins prestigious award for most innovative news platform in Hong Kong.",
      'zh-Hant': "此時的我強得可怕",
      'zh-Hans': "此时的我强得可怕"
    },
    sources: 7,
    sentimentScore: 0.99,
    subjectivityScore: 0.90,
    location: "Hong Kong",
    firstReported: "30 February, 2026",
    published: "30 February, 2026 (updated 1 hour ago)",
    linked_articles: []
  },
  {
    id: "006",
    title: {
      en: "AI breakthrough: New model sets record in language understanding",
      'zh-Hant': "人工智能突破：新模型創下語言理解新紀錄",
      'zh-Hans': "人工智能突破：新模型创下语言理解新纪录"
    },
    image: "/src/assets/ai-news.jpg",
    liberalPercent: 55,
    cPercent: 45,
    sources: 18,
    sentimentScore: 0.72,
    subjectivityScore: 0.60,
    location: {
      en: "San Francisco, USA",
      'zh-Hant': "美國舊金山",
      'zh-Hans': "美国旧金山"
    },
    firstReported: "1 April, 2025",
    published: "1 April, 2025 (updated 30 minutes ago)",
    linked_articles: ['article 2', 'article 5']
  },
   {
    id: "007",
    title: {
      en: "Xiaomi's automotive business expected to turn profitable in Q3-Q4 of this year",
      'zh-Hant': "小米汽車業務預計今年三四季度實現盈利",
      'zh-Hans': "小米汽车业务预计今年三四季度实现盈利"
    },
    image: "/src/assets/xiaomisu7u1.jpg",
    liberalPercent: 62,
    cPercent: 38,
    sources: 12,
    sentimentScore: 0.5,
    subjectivityScore: 0.84,
    location: {
      en: "China",
      'zh-Hant': "中國",
      'zh-Hans': "中国"
    },
    firstReported: "1 April, 2025",
    published: "1 April, 2025 (updated 30 minutes ago)",
    linked_articles: ['article 2', 'article 5']
  }
];

export default articles;