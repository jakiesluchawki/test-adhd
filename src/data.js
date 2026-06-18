export const TESTS = [
  {
    id: "adhd-start",
    short: "ADHD start",
    title: "Kwestionariusz startowy ADHD",
    eyebrow: "Materiał wstępny",
    duration: "około 5 minut",
    image: "./assets/section-01.webp",
    intro:
      "Pytania dotyczą codziennego funkcjonowania w ostatnich sześciu miesiącach. Pomagają uporządkować obszary, o których warto porozmawiać podczas konsultacji.",
    context:
      "To autorski zestaw demonstracyjny, nie standaryzowane narzędzie diagnostyczne. Odpowiadaj zgodnie z tym, jak jest najczęściej, a nie jak bywa w najlepszym dniu.",
    scale: [
      { value: 0, label: "Nigdy" },
      { value: 1, label: "Rzadko" },
      { value: 2, label: "Czasami" },
      { value: 3, label: "Często" },
      { value: 4, label: "Bardzo często" },
    ],
    questions: [
      "Trudno mi zacząć zadanie, nawet gdy wiem, że jest ważne.",
      "Gubię wątek podczas rozmowy lub czytania dłuższego tekstu.",
      "Odkładam drobne obowiązki, aż stają się pilne.",
      "Potrzebuję zewnętrznego systemu, aby pamiętać o terminach i ustaleniach.",
      "Łatwo przerywam rozpoczęte zadanie, gdy pojawia się nowy bodziec lub pomysł.",
      "Po intensywnym skupieniu potrzebuję dużo czasu, aby odzyskać energię.",
    ],
  },
  {
    id: "gad7",
    short: "GAD-7",
    title: "GAD-7",
    eyebrow: "Kwestionariusz przesiewowy",
    duration: "około 3 minuty",
    image: "./assets/section-02.webp",
    intro:
      "Oceń, jak często w ciągu ostatnich dwóch tygodni dokuczały Ci opisane objawy.",
    context:
      "Wynik pomaga ocenić nasilenie objawów lękowych. Nie jest samodzielną diagnozą i zawsze wymaga omówienia w kontekście Twojej sytuacji.",
    scale: [
      { value: 0, label: "Wcale nie" },
      { value: 1, label: "Kilka dni" },
      { value: 2, label: "Więcej niż połowę dni" },
      { value: 3, label: "Niemal codziennie" },
    ],
    questions: [
      "Czuł(a) się Pan(i) podenerwowany(a), niespokojny(a), mocno spięty(a).",
      "Nie mógł(a) Pan(i) przestać się martwić albo zapanować nad tym.",
      "Za bardzo się Pan(i) martwił(a) różnymi rzeczami.",
      "Miał(a) Pan(i) trudności z relaksowaniem się.",
      "Był(a) Pan(i) tak niespokojny(a), że nie mógł(a) usiedzieć na miejscu.",
      "Łatwo stawał(a) się Pan(i) rozdrażniony(a) lub poirytowany(a).",
      "Obawiał(a) się Pan(i), tak jakby miało się stać coś strasznego.",
    ],
  },
  {
    id: "interview",
    short: "Wywiad",
    title: "Wywiad rozwojowy",
    eyebrow: "Odpowiedzi opisowe",
    duration: "około 15 minut",
    image: "./assets/section-04.webp",
    intro:
      "Ta część zbiera informacje o dzieciństwie, edukacji, relacjach i sposobach radzenia sobie. Możesz pisać własnymi słowami.",
    context:
      "Nie szukamy idealnych odpowiedzi. Konkretne przykłady są zwykle bardziej pomocne niż ogólna ocena. Postęp zapisuje się po każdym pytaniu.",
    questions: [
      "Jak wspominasz swoje funkcjonowanie w szkole podstawowej i średniej?",
      "Co najczęściej pomagało Ci w nauce, organizacji i kończeniu zadań?",
      "Jak bliscy opisywali Twój temperament i zachowanie w dzieciństwie?",
      "Jak wyglądały Twoje ważne relacje rodzinne i przyjacielskie?",
      "Jak dziś organizujesz pracę, obowiązki i odpoczynek?",
      "Czy jest jeszcze coś, co psycholog powinien wiedzieć przed spotkaniem?",
    ],
  },
];

const completedAnswers = {
  "adhd-start": { 0: 3, 1: 2, 2: 4, 3: 4, 4: 3, 5: 3 },
  gad7: { 0: 2, 1: 1, 2: 2, 3: 2, 4: 0, 5: 2, 6: 1 },
  interview: {
    0: "Lubiłem naukę, szczególnie przedmioty ścisłe. Trudniej było mi utrzymać uwagę przy zadaniach powtarzalnych.",
    1: "Własne notatki, jasno zapisane terminy i praca w krótkich blokach.",
    2: "Byłem ciekawy, aktywny i samodzielny. Często brałem na siebie dużo rzeczy jednocześnie.",
    3: "Miałem niewielu bliskich przyjaciół, ale relacje były długie i ważne.",
    4: "Korzystam z kalendarza, list zadań i stałych rytuałów. To działa, ale kosztuje dużo energii.",
    5: "Największym problemem jest przeciążenie po dłuższym okresie intensywnej pracy.",
  },
};

export function createInitialWorkspace() {
  return {
    clients: [
      {
        id: "anna-demo",
        name: "Anna Kowalska",
        login: "anna.demo",
        password: "spokojny-start",
        email: "anna@example.test",
        assignedAt: "18.06.2026",
        deadline: "25.06.2026",
        introAccepted: false,
        answers: { "adhd-start": { 0: 3, 1: 2 }, gad7: {}, interview: {} },
        completedTests: [],
      },
      {
        id: "marek-demo",
        name: "Marek Wiśniewski",
        login: "marek.demo",
        password: "jasny-plan",
        email: "marek@example.test",
        assignedAt: "16.06.2026",
        deadline: "23.06.2026",
        introAccepted: true,
        answers: completedAnswers,
        completedTests: TESTS.map((test) => test.id),
      },
    ],
  };
}

export const PSYCHOLOGIST = {
  id: "psych-demo",
  name: "Emilia Juszczyk",
  login: "emilia.demo",
  password: "panel-demo",
  practice: "Pracownia Psychoterapii W RÓWNOWADZE",
};

export function getTestProgress(client, test) {
  const answerCount = Object.keys(client.answers?.[test.id] || {}).filter(
    (key) => client.answers[test.id][key] !== "",
  ).length;
  return {
    answerCount,
    total: test.questions.length,
    percent: Math.round((answerCount / test.questions.length) * 100),
    completed: client.completedTests.includes(test.id),
  };
}

export function getClientProgress(client) {
  const answered = TESTS.reduce(
    (sum, test) => sum + getTestProgress(client, test).answerCount,
    0,
  );
  const total = TESTS.reduce((sum, test) => sum + test.questions.length, 0);
  return {
    answered,
    total,
    percent: Math.round((answered / total) * 100),
    completed: client.completedTests.length === TESTS.length,
  };
}

export function getScore(test, answers = {}) {
  if (!test.scale) return null;
  const values = Object.values(answers).map(Number);
  if (!values.length) return null;
  const value = values.reduce((sum, current) => sum + current, 0);
  const max = test.questions.length * Math.max(...test.scale.map((item) => item.value));
  if (test.id === "gad7") {
    const interpretation =
      value < 5
        ? "Minimalne nasilenie objawów"
        : value < 10
          ? "Łagodne nasilenie objawów"
          : value < 15
            ? "Umiarkowane nasilenie objawów"
            : "Znaczne nasilenie objawów";
    return { value, max, interpretation };
  }
  return {
    value,
    max,
    interpretation: "Wynik roboczy do omówienia podczas konsultacji",
  };
}
