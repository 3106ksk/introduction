import aboutSvg from './docs/images/about.svg';
import hobbySvg from './docs/images/hobby.svg';
import trainingSvg from './docs/images/training.svg';
import worksSvg from './docs/images/works.svg';

const topics = [
  {
    id: 'about',
    label: 'ざっくり自己紹介',
    title: 'About me',
    body: [
      '広島の山あいで育って、中高はサッカー漬け。',
      '大学で京都に出て商社で1年働いたあと、イギリスで2年間バリスタをしてた。',
      '「どこでも生きていけるスキル＝プログラミング」を取りにいくため広島へ戻って学び直し中。',
      'RUNTEQには2025/11/22入学、75期Bクラスの一兵卒としてスタート。'
    ],
    image: aboutSvg
  },
  {
    id: 'hobby',
    label: '趣味とか、日常の話',
    title: 'Hobbies',
    body: [
      '身体を動かすのが好きでな。サッカー、フットサル、ボルダリング、キャンプ、サウナあたりは誘われたらだいたい行く。',
      '休みの日は飯を作って、サイファイ系のアニメや映画を観ながらビールを飲んでるときが「人生、まあ悪くないな」と思える瞬間だ。',
      'イギリス時代にパブ文化にどっぷり浸かってしまって、ビール好きはもはや職業病みたいなものだ。',
      '来年はソロキャンにも挑戦にも挑戦したい。'
    ],
    image: hobbySvg
  },
  {
    id: 'training',
    label: '日々の訓練',
    title: 'Training',
    body: [
      'トレーニングって言うと「筋トレです！ 自己ベスト更新です！」みたいな眩しい世界を想像するかもしれないが、俺の場合はもう少し雑多だ。',
      'サッカーしてた頃の名残で、いまだにHIITや自重トレーニングのような“身体いじめ”は好きだ。',
      '身体のトレーニングだけだとバランス悪いから、英会話や海外生活で「脳みそに負荷をかけるトレーニング」もやってきたつもりだ。',
      'オーストラリア、アメリカ、イギリス…と渡り歩いて、“度胸”だけはそこそこ鍛えられた。'
    ],
    image: trainingSvg
  },
  {
    id: 'works',
    label: '作成した作品',
    title: 'Projects',
    body: [
      '最初の作品は、大学時代にProgateで学びながら作った。今思えば、よくあれでドヤれたな、と過去の自分を軽く殴りたいレベルだ。',
      'そのあとはワーホリ中にフロント・バックエンド・DBのJavaScriptフルスタックの健康管理アプリを作った。'
    ],
    image: worksSvg
  }
];

const tabList = document.getElementById('tabList');
const panel = document.getElementById('panel');
const heroImage = document.getElementById('heroImage');
let typingInterval = null;
const TYPE_SPEED = 16; // ms per character

function renderTabs() {
  topics.forEach((topic, index) => {
    const item = document.createElement('li');
    item.className = 'tab';
    item.textContent = topic.label;
    item.dataset.id = topic.id;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', () => setActive(topic.id));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActive(topic.id);
      }
    });
    if (index === 0) item.classList.add('active');
    tabList.appendChild(item);
  });
}

function typePanel(topic) {
  clearInterval(typingInterval);
  panel.innerHTML = '';

  const titleEl = document.createElement('h3');
  titleEl.textContent = topic.title;
  panel.appendChild(titleEl);

  const textEl = document.createElement('div');
  textEl.className = 'type-area';
  panel.appendChild(textEl);

  const lines = [
    ...topic.body,
  ];
  textEl.innerHTML = lines.join('<br>');
}

function swapImage(topic) {
  heroImage.style.opacity = '0';
  heroImage.style.transform = 'scale(0.98)';
  heroImage.onload = () => {
    heroImage.style.opacity = '1';
    heroImage.style.transform = 'scale(1)';
  };
  heroImage.src = topic.image;
  heroImage.alt = `${topic.title} visual`;
}

function setActive(id) {
  tabList.querySelectorAll('.tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === id);
  });
  const topic = topics.find(t => t.id === id);
  if (!topic) return;
  typePanel(topic);
  swapImage(topic);
}

renderTabs();
setActive(topics[0].id);
