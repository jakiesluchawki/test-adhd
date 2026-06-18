export const GENDER_OPTIONS = [
  { value: "female", label: "Kobieta", description: "żeńska forma pytań" },
  { value: "male", label: "Mężczyzna", description: "męska forma pytań" },
  { value: "neutral", label: "Bez wskazania", description: "neutralna forma pytań" },
];

export function getGenderLabel(gender) {
  return GENDER_OPTIONS.find((option) => option.value === gender)?.description
    || GENDER_OPTIONS.at(-1).description;
}

export function getQuestionText(question, gender = "neutral") {
  if (typeof question === "string") return question;
  return question[gender] || question.neutral || question.female || question.male;
}

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
      {
        female: "Czułaś się podenerwowana, niespokojna lub mocno spięta.",
        male: "Czułeś się podenerwowany, niespokojny lub mocno spięty.",
        neutral: "Pojawiało się u Ciebie zdenerwowanie, niepokój lub silne napięcie.",
      },
      {
        female: "Nie mogłaś przestać się martwić albo zapanować nad zamartwianiem się.",
        male: "Nie mogłeś przestać się martwić albo zapanować nad zamartwianiem się.",
        neutral: "Trudno było Ci przestać się martwić albo zapanować nad zamartwianiem się.",
      },
      {
        female: "Za bardzo martwiłaś się różnymi rzeczami.",
        male: "Za bardzo martwiłeś się różnymi rzeczami.",
        neutral: "Martwienie się różnymi rzeczami stawało się nadmierne.",
      },
      {
        female: "Miałaś trudności z relaksowaniem się.",
        male: "Miałeś trudności z relaksowaniem się.",
        neutral: "Trudno było Ci się zrelaksować.",
      },
      {
        female: "Byłaś tak niespokojna, że nie mogłaś usiedzieć na miejscu.",
        male: "Byłeś tak niespokojny, że nie mogłeś usiedzieć na miejscu.",
        neutral: "Niepokój utrudniał Ci pozostanie w miejscu.",
      },
      {
        female: "Łatwo stawałaś się rozdrażniona lub poirytowana.",
        male: "Łatwo stawałeś się rozdrażniony lub poirytowany.",
        neutral: "Łatwo pojawiało się u Ciebie rozdrażnienie lub poirytowanie.",
      },
      {
        female: "Obawiałaś się, jakby miało się stać coś strasznego.",
        male: "Obawiałeś się, jakby miało się stać coś strasznego.",
        neutral: "Pojawiała się obawa, że może się stać coś strasznego.",
      },
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
        gender: "female",
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
        gender: "male",
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
