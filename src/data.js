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
  if (question.text) return getQuestionText(question.text, gender);
  return question[gender] || question.neutral || question.female || question.male;
}

export function getOptionLabel(option, gender = "neutral") {
  return getQuestionText(option.label, gender);
}

export function getQuestionOptions(test, question) {
  return question?.options || test.scale || null;
}

export function isAnswerComplete(test, answer) {
  if (test.answerType === "yesNoWithNote") {
    if (answer?.value === 0) return true;
    return answer?.value === 1 && Boolean(answer.note?.trim());
  }
  return answer !== undefined && answer !== "";
}

export const TESTS = [
  {
    id: "adhd-start",
    order: 6,
    supplemental: true,
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
    order: 0,
    mailStep: "01A",
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
    id: "bdi2",
    order: 1,
    mailStep: "01B",
    short: "BDI-II",
    title: "Inwentarz Depresji Becka (BDI-II)",
    eyebrow: "Kwestionariusz nastroju",
    duration: "około 10 minut",
    image: "./assets/section-03.webp",
    intro:
      "Przy każdej grupie wybierz jedno stwierdzenie, które najlepiej opisuje Twoje samopoczucie w ciągu ostatnich dwóch tygodni.",
    context:
      "Wynik pomaga uporządkować informacje o nasileniu objawów depresyjnych. Nie jest samodzielną diagnozą i wymaga omówienia ze specjalistą.",
    safetyQuestion: 8,
    questions: BDI_QUESTIONS,
  },
  {
    id: "scid",
    order: 2,
    mailStep: "02",
    short: "SCID",
    title: "Kwestionariusz SCID",
    eyebrow: "Pytania TAK / NIE",
    duration: "około 25 minut",
    image: "./assets/section-05.webp",
    intro:
      "Pytania TAK/NIE. Każdą odpowiedź TAK klient powinien uzupełnić konkretnym przykładem lub uzasadnieniem.",
    context:
      "Odpowiadaj w odniesieniu do tego, jak zwykle czujesz się i zachowujesz w ostatnich kilku latach. Jeśli pytanie jest niejasne, możesz zapisać postęp i omówić je z psychologiem.",
    answerType: "yesNoWithNote",
    scale: [
      { value: 0, label: "Nie" },
      { value: 1, label: "Tak" },
    ],
    questions: SCID_QUESTIONS,
  },
  {
    id: "interview",
    order: 3,
    mailStep: "03",
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
  {
    id: "aq",
    order: 4,
    mailStep: "04",
    short: "AQ",
    title: "AQ — wynik testu online",
    eyebrow: "Kwestionariusz zewnętrzny",
    duration: "około 10 minut",
    image: "./assets/section-03.webp",
    externalUrl: "https://phzdrowia.pl/test-czynnika-aq-autism-spectrum-quotient/",
    intro:
      "Rozwiąż test AQ na wskazanej stronie, a następnie wpisz tutaj uzyskany wynik.",
    context:
      "Wynik jest informacją pomocniczą do omówienia podczas konsultacji. Sam test przesiewowy nie stanowi diagnozy.",
    questions: [
      "Wpisz wynik AQ uzyskany w teście online.",
    ],
  },
  {
    id: "childhood-materials",
    order: 5,
    mailStep: "05",
    short: "Dzieciństwo",
    title: "Materiały z dzieciństwa",
    eyebrow: "Materiały uzupełniające",
    duration: "około 5 minut",
    image: "./assets/section-01.webp",
    intro:
      "Zbierz informacje o materiałach z pierwszych lat szkoły. Nie musisz mieć wszystkich wymienionych rzeczy.",
    context:
      "Wiadomość Emilii wskazuje opisy ze świadectw klas 1–3, dzienniczki uwag oraz ewentualne nagrania. W publicznym demo zapisujemy wyłącznie opis, bez przesyłania prywatnych plików.",
    questions: [
      "Jakie opisy lub uwagi znajdują się na świadectwach z klas 1–3?",
      "Czy zachowały się dzienniczki uwag? Jeśli tak, opisz najważniejsze wpisy.",
      "Czy istnieją nagrania lub inne materiały z tego okresu? Napisz, co można przekazać psychologowi.",
    ],
  },
].sort((first, second) => first.order - second.order);

const completedAnswers = {
  gad7: { 0: 2, 1: 1, 2: 2, 3: 2, 4: 0, 5: 2, 6: 1 },
  bdi2: Object.fromEntries(BDI_QUESTIONS.map((_, index) => [index, 0])),
  scid: Object.fromEntries(SCID_QUESTIONS.map((_, index) => [index, { value: 0, note: "" }])),
  interview: {
    0: "Lubiłem naukę, szczególnie przedmioty ścisłe. Trudniej było mi utrzymać uwagę przy zadaniach powtarzalnych.",
    1: "Własne notatki, jasno zapisane terminy i praca w krótkich blokach.",
    2: "Byłem ciekawy, aktywny i samodzielny. Często brałem na siebie dużo rzeczy jednocześnie.",
    3: "Miałem niewielu bliskich przyjaciół, ale relacje były długie i ważne.",
    4: "Korzystam z kalendarza, list zadań i stałych rytuałów. To działa, ale kosztuje dużo energii.",
    5: "Największym problemem jest przeciążenie po dłuższym okresie intensywnej pracy.",
  },
  aq: { 0: "34" },
  "childhood-materials": {
    0: "Na świadectwach powtarzają się informacje o dużej samodzielności, aktywności i bardzo dobrych wynikach w nauce.",
    1: "Nie zachowały się dzienniczki uwag.",
    2: "Nie mam nagrań. Mogę spróbować odnaleźć pojedyncze dokumenty i zdjęcia.",
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
        assignedTests: TESTS.filter((test) => !test.supplemental).map((test) => test.id),
        introAccepted: false,
        answers: Object.fromEntries(TESTS.map((test) => [test.id, {}])),
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
        assignedTests: TESTS.filter((test) => !test.supplemental).map((test) => test.id),
        introAccepted: true,
        answers: completedAnswers,
        completedTests: TESTS.filter((test) => test.available !== false).map((test) => test.id),
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
  const answers = client.answers?.[test.id] || {};
  const answerCount = test.questions.filter((_, index) => isAnswerComplete(test, answers[index])).length;
  return {
    answerCount,
    total: test.questions.length,
    percent: Math.round((answerCount / test.questions.length) * 100),
    completed: client.completedTests.includes(test.id),
  };
}

export function getAssignedTests(client) {
  const assignedIds = client.assignedTests
    || TESTS.filter((test) => !test.supplemental).map((test) => test.id);
  return TESTS.filter((test) => assignedIds.includes(test.id));
}

export function getClientProgress(client) {
  const assignedTests = getAssignedTests(client);
  const answered = assignedTests.reduce(
    (sum, test) => sum + getTestProgress(client, test).answerCount,
    0,
  );
  const total = assignedTests.reduce((sum, test) => sum + test.questions.length, 0);
  return {
    answered,
    total,
    percent: total ? Math.round((answered / total) * 100) : 0,
    completed: Boolean(total) && assignedTests.every((test) => client.completedTests.includes(test.id)),
  };
}

export function getScore(test, answers = {}) {
  if (!test.scale && test.id !== "bdi2") return null;
  if (test.answerType === "yesNoWithNote") return null;
  const values = Object.values(answers).map((answer) => Number(answer));
  if (!values.length) return null;
  const value = values.reduce((sum, current) => sum + current, 0);
  const max = test.id === "bdi2"
    ? 63
    : test.questions.length * Math.max(...test.scale.map((item) => item.value));
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
  if (test.id === "bdi2") {
    const interpretation = value < 12
      ? "Brak depresji według progów z formularza"
      : value < 20
        ? "Możliwość łagodnej depresji"
        : value < 26
          ? "Umiarkowane nasilenie objawów depresyjnych"
          : "Wynik w zakresie ciężkiej depresji";
    return {
      value,
      max,
      interpretation,
      alert: Number(answers[test.safetyQuestion]) > 0,
    };
  }
  return {
    value,
    max,
    interpretation: "Wynik roboczy do omówienia podczas konsultacji",
  };
}
import { BDI_QUESTIONS, SCID_QUESTIONS } from "./assessmentData.js";
