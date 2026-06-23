import { BDI_QUESTIONS, SCID_QUESTIONS } from "./assessmentData.js";

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
    order: 99,
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
  {
    id: "ypi1",
    order: 6,
    mailStep: "06",
    short: "YPI-1",
    title: "Inwentarz Osobowości Younga (YPI-1)",
    eyebrow: "Narzędzie licencjonowane",
    duration: "72 pozycje",
    image: "./assets/section-05.webp",
    available: false,
    licensed: true,
    sourceLabel: "Young / Schema Therapy",
    intro: "Kwestionariusz stylów i wzorców osobowości wykorzystany w materiale Wiktorii.",
    context: "Treść pozycji wymaga potwierdzenia uprawnień oraz wdrożenia w prywatnej wersji gabinetu.",
    questions: [],
  },
  {
    id: "ysq-s3",
    order: 7,
    mailStep: "07",
    short: "YSQ-S3",
    title: "Kwestionariusz Schematów Younga (YSQ-S3)",
    eyebrow: "Narzędzie licencjonowane",
    duration: "90 pozycji",
    image: "./assets/section-04.webp",
    available: false,
    licensed: true,
    sourceLabel: "Young / Schema Therapy",
    intro: "Kwestionariusz wczesnych nieadaptacyjnych schematów wykorzystany w materiale Wiktorii.",
    context: "Treść pozycji wymaga potwierdzenia uprawnień oraz wdrożenia w prywatnej wersji gabinetu.",
    questions: [],
  },
  {
    id: "smi-1-1",
    order: 8,
    mailStep: "08",
    short: "SMI 1.1",
    title: "Inwentarz Trybów Schematów (SMI 1.1)",
    eyebrow: "Narzędzie licencjonowane",
    duration: "124 pozycje",
    image: "./assets/section-03.webp",
    available: false,
    licensed: true,
    sourceLabel: "Schema Therapy",
    intro: "Kwestionariusz trybów schematów wykorzystany w materiale Wiktorii.",
    context: "Treść pozycji wymaga potwierdzenia uprawnień oraz wdrożenia w prywatnej wersji gabinetu.",
    questions: [],
  },
  {
    id: "who5",
    order: 9,
    mailStep: "09",
    short: "WHO-5",
    title: "Wskaźnik Dobrego Samopoczucia WHO-5",
    eyebrow: "Dobrostan psychiczny",
    duration: "około 2 minuty",
    image: "./assets/section-01.webp",
    sourceLabel: "World Health Organization, polska wersja 2024",
    sourceUrl: "https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01",
    licenseLabel: "CC BY-NC-SA 3.0",
    intro: "Wybierz odpowiedź, która najlepiej opisuje Twoje samopoczucie w ciągu ostatnich dwóch tygodni.",
    context: "WHO-5 mierzy dobrostan, a nie stawia diagnozy. Wyższy wynik oznacza lepsze samopoczucie; interpretację należy omówić ze specjalistą.",
    scale: [
      { value: 0, label: "Nigdy" },
      { value: 1, label: "Od czasu do czasu" },
      { value: 2, label: "Mniej niż połowę czasu" },
      { value: 3, label: "Więcej niż połowę czasu" },
      { value: 4, label: "Prawie cały czas" },
      { value: 5, label: "Cały czas" },
    ],
    questions: [
      {
        female: "Czułam się wesoła i w dobrym nastroju.",
        male: "Czułem się wesoły i w dobrym nastroju.",
        neutral: "Czułam się wesoła/Czułem się wesoły i w dobrym nastroju.",
      },
      {
        female: "Czułam się spokojna i odprężona.",
        male: "Czułem się spokojny i odprężony.",
        neutral: "Czułam się spokojna i odprężona/Czułem się spokojny i odprężony.",
      },
      {
        female: "Czułam się aktywna i energiczna.",
        male: "Czułem się aktywny i energiczny.",
        neutral: "Czułam się aktywna i energiczna/Czułem się aktywny i energiczny.",
      },
      {
        female: "Budziłam się z uczuciem świeżości i wypoczęta.",
        male: "Budziłem się z uczuciem świeżości i wypoczęty.",
        neutral: "Budziłam się z uczuciem świeżości i wypoczęta/Budziłem się z uczuciem świeżości i wypoczęty.",
      },
      "Moje życie codzienne było wypełnione interesującymi mnie sprawami.",
    ],
  },
  {
    id: "phq9",
    order: 10,
    mailStep: "10",
    short: "PHQ-9",
    title: "Kwestionariusz Zdrowia Pacjenta PHQ-9",
    eyebrow: "Katalog narzędzi",
    duration: "9 pozycji",
    image: "./assets/section-02.webp",
    available: false,
    sourceLabel: "Pfizer / PHQ Screeners",
    sourceUrl: "https://www.pfizer.com/contact/faqs",
    intro: "Krótkie narzędzie do przesiewowej oceny objawów depresyjnych i monitorowania zmiany.",
    context: "Przed aktywacją należy podłączyć zatwierdzoną polską wersję i procedurę bezpieczeństwa dla odpowiedzi dotyczących samouszkodzeń.",
    questions: [],
  },
  {
    id: "audit",
    order: 11,
    mailStep: "11",
    short: "AUDIT",
    title: "Alcohol Use Disorders Identification Test (AUDIT)",
    eyebrow: "Katalog narzędzi WHO",
    duration: "10 pozycji",
    image: "./assets/section-05.webp",
    available: false,
    sourceLabel: "World Health Organization",
    sourceUrl: "https://www.who.int/publications/i/item/audit-the-alcohol-use-disorders-identification-test-guidelines-for-use-in-primary-health-care",
    intro: "Narzędzie przesiewowe WHO dotyczące ryzykownego i szkodliwego używania alkoholu.",
    context: "Przed aktywacją potrzebna jest zweryfikowana polska wersja oraz gabinetowa procedura dalszego postępowania.",
    questions: [],
  },
  {
    id: "asrs-v1-1",
    order: 12,
    mailStep: "12",
    short: "ASRS-v1.1",
    title: "ASRS-v1.1 — wersja przesiewowa 6Q",
    eyebrow: "Katalog narzędzi ADHD",
    duration: "6 pozycji",
    image: "./assets/adhd-summary.webp",
    available: false,
    licensed: true,
    sourceLabel: "NYU / Harvard National Comorbidity Survey",
    sourceUrl: "https://www.hcp.med.harvard.edu/ncs/asrs.php",
    intro: "Sześciopytaniowe narzędzie przesiewowe objawów ADHD u osób dorosłych.",
    context: "Źródło zezwala na użycie wersji 6Q bez formalnej zgody pod warunkiem zachowania treści i algorytmu. Aktywacja czeka na zatwierdzoną polską wersję.",
    questions: [],
  },
  {
    id: "pcl5",
    order: 13,
    mailStep: "13",
    short: "PCL-5",
    title: "PTSD Checklist for DSM-5 (PCL-5)",
    eyebrow: "Katalog narzędzi PTSD",
    duration: "20 pozycji",
    image: "./assets/section-04.webp",
    available: false,
    sourceLabel: "U.S. Department of Veterans Affairs",
    sourceUrl: "https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp",
    intro: "Public-domainowe narzędzie do oceny nasilenia objawów PTSD i monitorowania zmiany.",
    context: "Interpretacja należy do wykwalifikowanego specjalisty. Aktywacja czeka na zweryfikowaną polską wersję i procedurę kliniczną.",
    questions: [],
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
        ownerId: "therapist-emilia",
        name: "Anna Kowalska",
        gender: "female",
        login: "anna.demo",
        password: "spokojny-start",
        email: "anna@example.test",
        phone: "+48 501 234 567",
        contactPreference: "email",
        notes: "Preferuje kontakt pisemny.",
        assignedAt: "18.06.2026",
        deadline: "25.06.2026",
        assignedTests: TESTS.filter((test) => !test.supplemental).map((test) => test.id),
        introAccepted: false,
        answers: Object.fromEntries(TESTS.map((test) => [test.id, {}])),
        completedTests: [],
      },
      {
        id: "marek-demo",
        ownerId: "therapist-emilia",
        name: "Marek Wiśniewski",
        gender: "male",
        login: "marek.demo",
        password: "jasny-plan",
        email: "marek@example.test",
        phone: "+48 502 345 678",
        contactPreference: "phone",
        notes: "",
        assignedAt: "16.06.2026",
        deadline: "23.06.2026",
        assignedTests: TESTS.filter((test) => !test.supplemental).map((test) => test.id),
        introAccepted: true,
        answers: completedAnswers,
        completedTests: TESTS.filter((test) => test.available !== false).map((test) => test.id),
      },
      {
        id: "julia-demo-client",
        ownerId: "therapist-julia",
        name: "Joanna Zielińska",
        gender: "female",
        login: "joanna.demo",
        password: "spokojny-ogrod",
        email: "joanna@example.test",
        phone: "+48 503 456 789",
        contactPreference: "text",
        notes: "Konto demonstracyjne przypisane do Julii.",
        assignedAt: "20.06.2026",
        deadline: "do ustalenia",
        assignedTests: ["who5", "gad7", "phq9"],
        introAccepted: false,
        answers: Object.fromEntries(TESTS.map((test) => [test.id, {}])),
        completedTests: [],
      },
      {
        id: "aleksandra-demo-client",
        ownerId: "therapist-aleksandra",
        name: "Piotr Lewandowski",
        gender: "male",
        login: "piotr.demo",
        password: "cieply-poranek",
        email: "piotr@example.test",
        phone: "+48 504 567 890",
        contactPreference: "email",
        notes: "Konto demonstracyjne przypisane do Aleksandry.",
        assignedAt: "21.06.2026",
        deadline: "30.06.2026",
        assignedTests: ["who5", "pcl5", "interview"],
        introAccepted: false,
        answers: Object.fromEntries(TESTS.map((test) => [test.id, {}])),
        completedTests: [],
      },
    ],
  };
}

export const THERAPISTS = [
  {
    id: "therapist-emilia",
    name: "Emilia Juszczyk",
    login: "emilia.juszczyk",
    credentialHash: "9d1141fc92125c84e5fd36dc389bdebf5acf4bd25f047bf9716cc3f970c5fbad",
    practice: "Pracownia Psychoterapii W RÓWNOWADZE",
  },
  {
    id: "therapist-julia",
    name: "Julia Gontarek",
    login: "julia.gontarek",
    credentialHash: "2eb49413a3e55c62bcfb6b1d3364be820bb774c7feccd5761690d163a831715b",
    practice: "Pracownia Psychoterapii W RÓWNOWADZE",
  },
  {
    id: "therapist-aleksandra",
    name: "Aleksandra Jasińska",
    login: "aleksandra.jasinska",
    credentialHash: "9a5a21506b1b5276b21c4b0dfbfb3ea508869dcc51ad2c23cb631cdf6f4c9b73",
    practice: "Pracownia Psychoterapii W RÓWNOWADZE",
  },
];

export const PSYCHOLOGIST = THERAPISTS[0];

export function getTestProgress(client, test) {
  if (test.available === false) {
    return {
      answerCount: 0,
      total: 0,
      percent: 0,
      completed: false,
      unavailable: true,
    };
  }
  const answers = client.answers?.[test.id] || {};
  const answerCount = test.questions.filter((_, index) => isAnswerComplete(test, answers[index])).length;
  return {
    answerCount,
    total: test.questions.length,
    percent: test.questions.length
      ? Math.round((answerCount / test.questions.length) * 100)
      : 0,
    completed: client.completedTests.includes(test.id),
  };
}

export function getAssignedTests(client) {
  const assignedIds = client.assignedTests
    || TESTS.filter((test) => !test.supplemental).map((test) => test.id);
  return TESTS.filter((test) => assignedIds.includes(test.id));
}

export function getClientProgress(client) {
  const assignedTests = getAssignedTests(client).filter((test) => test.available !== false);
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
  if (test.id === "who5") {
    return {
      value,
      max,
      interpretation: value < 13
        ? "Obniżony dobrostan — wynik do pogłębienia podczas konsultacji"
        : "Dobrostan powyżej progu przesiewowego WHO-5",
    };
  }
  return {
    value,
    max,
    interpretation: "Wynik roboczy do omówienia podczas konsultacji",
  };
}
