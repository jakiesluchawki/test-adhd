import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  FileText,
  LockKeyhole,
  LogOut,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import {
  GENDER_OPTIONS,
  PSYCHOLOGIST,
  TESTS,
  createInitialWorkspace,
  getClientProgress,
  getGenderLabel,
  getQuestionText,
  getScore,
  getTestProgress,
} from "./data.js";

const STORAGE_KEY = "wrownowadze-testy-demo-v1";

function loadWorkspace() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return createInitialWorkspace();
    const workspace = JSON.parse(stored);
    return {
      ...workspace,
      clients: workspace.clients.map((client) => ({
        ...client,
        gender: client.gender
          || (client.id === "anna-demo" ? "female" : client.id === "marek-demo" ? "male" : "neutral"),
      })),
    };
  } catch {
    return createInitialWorkspace();
  }
}

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        W
      </span>
      <span className="brand-copy">
        <strong>W RÓWNOWADZE</strong>
        {!compact && <small>Panel testów</small>}
      </span>
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="demo-notice" role="note">
      <ShieldCheck size={16} aria-hidden="true" />
      <span>
        Tryb demonstracyjny. Dane są fikcyjne i zapisują się wyłącznie w tej
        przeglądarce.
      </span>
    </div>
  );
}

function StatusPill({ status }) {
  const labels = {
    completed: "Ukończono",
    progress: "W trakcie",
    waiting: "Nie rozpoczęto",
  };
  return <span className={`status-pill status-${status}`}>{labels[status]}</span>;
}

function AppHeader({ session, onLogout, children }) {
  return (
    <header className="app-header">
      <Brand compact />
      {children}
      <div className="header-user">
        <span className="header-user-name">
          {session.role === "psychologist" ? PSYCHOLOGIST.name : session.name}
        </span>
        <button className="icon-button" onClick={onLogout} aria-label="Wyloguj">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

function LoginScreen({ workspace, onLogin, onReset }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setError("");
    const result = onLogin(login.trim(), password);
    if (!result) setError("Nieprawidłowy login lub hasło. Wybierz konto demo poniżej.");
  };

  const useDemo = (role) => {
    if (role === "psychologist") {
      setLogin(PSYCHOLOGIST.login);
      setPassword(PSYCHOLOGIST.password);
      return;
    }
    const client = workspace.clients.find((item) => item.id === "anna-demo");
    setLogin(client.login);
    setPassword(client.password);
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <Brand />
        <div className="login-content">
          <p className="eyebrow">PRZESTRZEŃ DO SPOKOJNEJ PRACY</p>
          <h1>Testy przed konsultacją.</h1>
          <p className="login-lead">
            Zaloguj się danymi przekazanymi przez psychologa. Zobaczysz tylko
            materiały przypisane do Twojego konta.
          </p>

          <form className="login-form" onSubmit={submit} noValidate>
            <label>
              <span>Login</span>
              <input
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                autoComplete="username"
                placeholder="np. anna.demo"
              />
            </label>
            <label>
              <span>Hasło</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                type="password"
                placeholder="Wpisz hasło"
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary button-wide" type="submit">
              Zaloguj się
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="demo-logins" aria-label="Konta demonstracyjne">
            <p>Wersja demonstracyjna</p>
            <div className="demo-login-actions">
              <button className="text-button" onClick={() => useDemo("client")}>
                <UserRound size={16} />
                Uzupełnij dane klienta
              </button>
              <button
                className="text-button"
                onClick={() => useDemo("psychologist")}
              >
                <UsersRound size={16} />
                Uzupełnij dane psychologa
              </button>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <LockKeyhole size={15} />
          <span>Prawdziwa wersja będzie chroniona logowaniem i politykami dostępu.</span>
          <button className="quiet-link" onClick={onReset}>
            <RotateCcw size={14} /> Reset demo
          </button>
        </div>
      </section>
      <figure className="login-art">
        <img
          src="./assets/adhd-hero.webp"
          alt="Abstrakcyjna postać z geometryczną konstrukcją symbolizującą proces myślenia"
        />
        <figcaption>Odpowiedzi nabierają sensu dopiero w rozmowie.</figcaption>
      </figure>
    </main>
  );
}

function WelcomeScreen({ client, onAccept, onLogout }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="welcome-shell">
      <AppHeader session={{ role: "client", name: client.name }} onLogout={onLogout} />
      <DemoNotice />
      <main className="welcome-layout">
        <section className="welcome-copy">
          <p className="eyebrow">ZANIM ZACZNIESZ</p>
          <h1>Dzień dobry, {client.name.split(" ")[0]}.</h1>
          <p className="welcome-lead">
            Ten zestaw pomoże uporządkować informacje przed konsultacją. Nie
            musisz robić wszystkiego za jednym razem.
          </p>
          <div className="welcome-points">
            <article>
              <span>01</span>
              <div>
                <h2>Odpowiadaj po swojemu</h2>
                <p>Nie ma odpowiedzi dobrych ani oczekiwanych przez psychologa.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h2>Możesz zrobić przerwę</h2>
                <p>Postęp zapisuje się po każdym pytaniu w tej przeglądarce.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h2>Wynik to początek rozmowy</h2>
                <p>Kwestionariusze nie stanowią samodzielnej diagnozy.</p>
              </div>
            </article>
          </div>
          <label className="consent-row">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
            />
            <span>
              Rozumiem cel materiałów i wiem, że mogę przerwać pracę w dowolnym
              momencie.
            </span>
          </label>
          <button
            className="button button-primary"
            disabled={!confirmed}
            onClick={onAccept}
          >
            Przejdź do zestawu
            <ArrowRight size={18} />
          </button>
        </section>
        <figure className="welcome-art">
          <img src="./assets/adhd-summary.webp" alt="Abstrakcyjna postać porządkująca elementy" />
        </figure>
      </main>
    </div>
  );
}

function ProgressBar({ value, label }) {
  return (
    <div className="progress-block" aria-label={label}>
      <div className="progress-meta">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ClientHome({ client, onOpenTest }) {
  const overall = getClientProgress(client);
  return (
    <main className="client-main page-width">
      <section className="client-hero">
        <div>
          <p className="eyebrow">TWÓJ ZESTAW</p>
          <h1>Materiały przed konsultacją</h1>
          <p>
            Trzy części, około 25 minut łącznie. Zacznij od dowolnej i wracaj do
            przerwanych odpowiedzi, kiedy potrzebujesz.
          </p>
        </div>
        <div className="overall-progress">
          <span>Cały zestaw</span>
          <strong>{overall.answered} z {overall.total}</strong>
          <ProgressBar value={overall.percent} label="Udzielone odpowiedzi" />
        </div>
      </section>

      <section className="assignment-list" aria-labelledby="assignment-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">PRZYDZIELONE MATERIAŁY</p>
            <h2 id="assignment-title">Wybierz kolejny krok</h2>
          </div>
          <p>Termin orientacyjny: {client.deadline}</p>
        </div>
        {TESTS.map((test, index) => {
          const progress = getTestProgress(client, test);
          const status = progress.completed
            ? "completed"
            : progress.answerCount
              ? "progress"
              : "waiting";
          return (
            <button
              className="assignment-row"
              key={test.id}
              onClick={() => onOpenTest(test.id)}
            >
              <span className="assignment-number">0{index + 1}</span>
              <span className="assignment-copy">
                <span className="assignment-title-line">
                  <strong>{test.title}</strong>
                  <StatusPill status={status} />
                </span>
                <span>{test.intro}</span>
                <span className="assignment-meta">
                  <Clock3 size={15} /> {test.duration}
                  <span>{progress.answerCount} z {progress.total} odpowiedzi</span>
                </span>
              </span>
              <span className="assignment-progress" aria-hidden="true">
                <span style={{ width: `${progress.percent}%` }} />
              </span>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          );
        })}
      </section>

      <aside className="privacy-note">
        <LockKeyhole size={20} />
        <div>
          <strong>Twoje odpowiedzi są prywatne</strong>
          <p>
            W tej demonstracji pozostają tylko na tym urządzeniu. W wersji
            produkcyjnej zobaczy je wyłącznie przypisany psycholog.
          </p>
        </div>
      </aside>
    </main>
  );
}

function TestFlow({ client, test, onAnswer, onComplete, onClose }) {
  const answers = client.answers[test.id] || {};
  const firstOpen = test.questions.findIndex(
    (_, index) => answers[index] === undefined || answers[index] === "",
  );
  const [stage, setStage] = useState("intro");
  const [index, setIndex] = useState(firstOpen === -1 ? 0 : firstOpen);
  const answer = answers[index];
  const progress = getTestProgress(client, test);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage, index, test.id]);

  useEffect(() => {
    if (stage !== "questions" || !test.scale) return undefined;
    const handleNumberKey = (event) => {
      const target = event.target;
      if (
        event.altKey
        || event.ctrlKey
        || event.metaKey
        || (target instanceof HTMLInputElement && target.type !== "radio")
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || target?.isContentEditable
      ) return;
      const option = test.scale.find((item) => String(item.value) === event.key);
      if (!option) return;
      event.preventDefault();
      onAnswer(test.id, index, option.value);
    };
    window.addEventListener("keydown", handleNumberKey);
    return () => window.removeEventListener("keydown", handleNumberKey);
  }, [stage, index, test, onAnswer]);

  const goNext = () => {
    if (index < test.questions.length - 1) setIndex(index + 1);
    else setStage("review");
  };

  if (stage === "intro") {
    return (
      <main className="test-intro page-width">
        <button className="back-link" onClick={onClose}>
          <ArrowLeft size={18} /> Wróć do zestawu
        </button>
        <div className="test-intro-grid">
          <section>
            <p className="eyebrow">{test.eyebrow}</p>
            <h1>{test.title}</h1>
            <p className="test-lead">{test.intro}</p>
            <div className="context-panel">
              <ShieldCheck size={22} />
              <div>
                <strong>Po co to robimy</strong>
                <p>{test.context}</p>
              </div>
            </div>
            <dl className="test-facts">
              <div><dt>Czas</dt><dd>{test.duration}</dd></div>
              <div><dt>Pytania</dt><dd>{test.questions.length}</dd></div>
              <div><dt>Postęp</dt><dd>{progress.answerCount ? `${progress.answerCount} zapisanych` : "Jeszcze nie rozpoczęto"}</dd></div>
            </dl>
            <button className="button button-primary" onClick={() => setStage("questions")}>
              {progress.answerCount ? "Kontynuuj" : "Rozpocznij"}
              <ArrowRight size={18} />
            </button>
          </section>
          <figure>
            <img src={test.image} alt="Abstrakcyjna ilustracja towarzysząca testowi" />
          </figure>
        </div>
      </main>
    );
  }

  if (stage === "review") {
    const complete = test.questions.every(
      (_, questionIndex) =>
        answers[questionIndex] !== undefined && answers[questionIndex] !== "",
    );
    return (
      <main className="review-page page-width">
        <button className="back-link" onClick={() => setStage("questions")}>
          <ArrowLeft size={18} /> Wróć do pytań
        </button>
        <div className="review-heading">
          <div>
            <p className="eyebrow">SPRAWDŹ PRZED ZAPISANIEM</p>
            <h1>{test.title}</h1>
            <p>Możesz wrócić do każdej odpowiedzi i ją zmienić.</p>
          </div>
          <span className="review-count">{progress.answerCount} / {test.questions.length}</span>
        </div>
        <div className="review-list">
          {test.questions.map((question, questionIndex) => {
            const value = answers[questionIndex];
            const questionText = getQuestionText(question, client.gender);
            const display = test.scale
              ? test.scale.find((item) => item.value === Number(value))?.label
              : value;
            return (
              <button
                className="review-row"
                key={`${test.id}-${questionIndex}`}
                onClick={() => {
                  setIndex(questionIndex);
                  setStage("questions");
                }}
              >
                <span>{String(questionIndex + 1).padStart(2, "0")}</span>
                <span><strong>{questionText}</strong><small>{display || "Brak odpowiedzi"}</small></span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
        {!complete && (
          <p className="form-error">Uzupełnij wszystkie odpowiedzi, aby zakończyć tę część.</p>
        )}
        <button
          className="button button-primary"
          disabled={!complete}
          onClick={() => onComplete(test.id)}
        >
          <Check size={18} /> Zapisz i zakończ część
        </button>
      </main>
    );
  }

  return (
    <main className="question-page">
      <div className="question-topbar page-width">
        <button className="back-link" onClick={onClose}>
          <ArrowLeft size={18} /> Zapisz i wyjdź
        </button>
        <ProgressBar
          value={Math.round(((index + 1) / test.questions.length) * 100)}
          label={`Pytanie ${index + 1} z ${test.questions.length}`}
        />
      </div>
      <div className="question-layout page-width">
        <aside className="question-context">
          <p className="eyebrow">{test.eyebrow}</p>
          <h2>{test.title}</h2>
          <p>{test.intro}</p>
          <img src={test.image} alt="" />
        </aside>
        <section className="question-stage" aria-labelledby="question-title">
          <span className="question-number">{String(index + 1).padStart(2, "0")}</span>
          <h1 id="question-title">{getQuestionText(test.questions[index], client.gender)}</h1>
          {test.scale ? (
            <fieldset className="answer-options">
              <legend>
                <span>Wybierz jedną odpowiedź</span>
                <span className="keyboard-hint">
                  Klawiatura: {test.scale.map((option) => option.value).join(" · ")}
                </span>
              </legend>
              {test.scale.map((option) => (
                <label
                  className={`answer-option ${Number(answer) === option.value ? "selected" : ""}`}
                  key={option.value}
                >
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value={option.value}
                    checked={Number(answer) === option.value}
                    onChange={() => onAnswer(test.id, index, option.value)}
                  />
                  <span className="option-value">{option.value}</span>
                  <span>{option.label}</span>
                  <CheckCircle2 size={20} aria-hidden="true" />
                </label>
              ))}
            </fieldset>
          ) : (
            <label className="long-answer">
              <span>Twoja odpowiedź</span>
              <textarea
                value={answer || ""}
                onChange={(event) => onAnswer(test.id, index, event.target.value)}
                rows="8"
                placeholder="Napisz własnymi słowami. Konkretne przykłady są mile widziane."
              />
              <small>Odpowiedź zapisuje się automatycznie.</small>
            </label>
          )}
          <div className="question-actions">
            <button
              className="button button-secondary"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              <ArrowLeft size={18} /> Poprzednie
            </button>
            <button
              className="button button-primary"
              disabled={answer === undefined || answer === ""}
              onClick={goNext}
            >
              {index === test.questions.length - 1 ? "Sprawdź odpowiedzi" : "Dalej"}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function ClientPortal({ client, setWorkspace, onLogout }) {
  const [activeTestId, setActiveTestId] = useState(null);
  const activeTest = TESTS.find((test) => test.id === activeTestId);

  const updateClient = (transform) => {
    setWorkspace((current) => ({
      ...current,
      clients: current.clients.map((item) =>
        item.id === client.id ? transform(item) : item,
      ),
    }));
  };

  if (!client.introAccepted) {
    return (
      <WelcomeScreen
        client={client}
        onLogout={onLogout}
        onAccept={() => updateClient((item) => ({ ...item, introAccepted: true }))}
      />
    );
  }

  return (
    <div className="portal-shell">
      <AppHeader session={{ role: "client", name: client.name }} onLogout={onLogout}>
        <span className="header-context">Panel klienta</span>
      </AppHeader>
      <DemoNotice />
      {activeTest ? (
        <TestFlow
          key={activeTest.id}
          client={client}
          test={activeTest}
          onClose={() => setActiveTestId(null)}
          onAnswer={(testId, questionIndex, value) =>
            updateClient((item) => ({
              ...item,
              answers: {
                ...item.answers,
                [testId]: { ...item.answers[testId], [questionIndex]: value },
              },
            }))
          }
          onComplete={(testId) => {
            updateClient((item) => ({
              ...item,
              completedTests: item.completedTests.includes(testId)
                ? item.completedTests
                : [...item.completedTests, testId],
            }));
            setActiveTestId(null);
          }}
        />
      ) : (
        <ClientHome client={client} onOpenTest={setActiveTestId} />
      )}
    </div>
  );
}

function ClientIndex({ clients, selectedId, onSelect, onCreate }) {
  return (
    <aside className="client-index">
      <div className="client-index-heading">
        <div>
          <p className="eyebrow">KLIENCI</p>
          <h2>Przydzielone zestawy</h2>
        </div>
        <button className="icon-button icon-button-primary" onClick={onCreate} aria-label="Dodaj klienta">
          <Plus size={18} />
        </button>
      </div>
      <div className="client-index-list">
        {clients.map((client) => {
          const progress = getClientProgress(client);
          const status = progress.completed ? "completed" : progress.answered ? "progress" : "waiting";
          return (
            <button
              key={client.id}
              className={`client-index-row ${selectedId === client.id ? "active" : ""}`}
              onClick={() => onSelect(client.id)}
            >
              <span className="avatar">{client.name.split(" ").map((part) => part[0]).join("")}</span>
              <span>
                <strong>{client.name}</strong>
                <small>{progress.percent}% zestawu</small>
              </span>
              <StatusPill status={status} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function TestReport({ client, test }) {
  const answers = client.answers[test.id] || {};
  const score = getScore(test, answers);
  return (
    <section className="report-section">
      <header className="report-section-heading">
        <div>
          <p className="eyebrow">{test.eyebrow}</p>
          <h1>{test.title}</h1>
          <p>{test.intro}</p>
        </div>
        {score && (
          <div className="report-score">
            <span>Wynik</span>
            <strong>{score.value} / {score.max}</strong>
            <p>{score.interpretation}</p>
          </div>
        )}
      </header>
      <img className="report-art" src={test.image} alt="" />
      <div className="report-answers">
        {test.questions.map((question, index) => {
          const raw = answers[index];
          const questionText = getQuestionText(question, client.gender);
          const value = test.scale
            ? test.scale.find((option) => option.value === Number(raw))?.label
            : raw;
          return (
            <article key={`${test.id}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{questionText}</strong>
                <p>{value || "Brak odpowiedzi"}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ReportSummary({ client }) {
  const overall = getClientProgress(client);
  return (
    <section className="report-summary">
      <div className="report-hero-copy">
        <p className="eyebrow">MATERIAŁY DO KONSULTACJI</p>
        <h1>Diagnoza w kierunku ADHD</h1>
        <p>
          Skonsolidowany zestaw odpowiedzi. Każda część zachowuje wynik,
          pełne brzmienie pytań i kontekst odpowiedzi klienta.
        </p>
        <dl>
          <div><dt>Klient</dt><dd>{client.name}</dd></div>
          <div><dt>Forma pytań</dt><dd>{getGenderLabel(client.gender)}</dd></div>
          <div><dt>Przydzielono</dt><dd>{client.assignedAt}</dd></div>
          <div><dt>Status</dt><dd>{overall.completed ? "Ukończono" : `W trakcie, ${overall.percent}%`}</dd></div>
        </dl>
      </div>
      <img src="./assets/adhd-summary.webp" alt="Abstrakcyjna postać porządkująca informacje" />
      <aside className="report-disclaimer">
        <p className="eyebrow">WAŻNE</p>
        <strong>
          Materiał wspiera konsultację. Nie stanowi samodzielnej diagnozy ani
          interpretacji klinicznej.
        </strong>
      </aside>
      <div className="report-results">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">PODSUMOWANIE</p>
            <h2>Przebieg i wyniki</h2>
          </div>
        </div>
        {TESTS.map((test) => {
          const progress = getTestProgress(client, test);
          const score = getScore(test, client.answers[test.id]);
          return (
            <article key={test.id}>
              <p>{test.short}</p>
              <strong>{score ? `${score.value} / ${score.max}` : `${progress.answerCount} / ${progress.total}`}</strong>
              <span>{score?.interpretation || (progress.completed ? "Odpowiedzi opisowe ukończone" : "Materiał w trakcie")}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ReportView({ client }) {
  const [section, setSection] = useState("summary");
  useEffect(() => setSection("summary"), [client.id]);
  return (
    <main className="report-view">
      <div className="report-toolbar">
        <nav aria-label="Sekcje raportu">
          <button className={section === "summary" ? "active" : ""} onClick={() => setSection("summary")}>Podsumowanie</button>
          {TESTS.map((test) => (
            <button key={test.id} className={section === test.id ? "active" : ""} onClick={() => setSection(test.id)}>{test.short}</button>
          ))}
        </nav>
        <button className="button button-secondary print-button" onClick={() => window.print()}>
          <Printer size={17} /> Drukuj / PDF
        </button>
      </div>
      <div className="report-paper">
        {section === "summary" ? (
          <ReportSummary client={client} />
        ) : (
          <TestReport client={client} test={TESTS.find((test) => test.id === section)} />
        )}
      </div>
    </main>
  );
}

function CreateClient({ onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [created, setCreated] = useState(null);
  const [copied, setCopied] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const normalized = name.trim().toLocaleLowerCase("pl-PL").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\s]/g, "");
    const parts = normalized.split(/\s+/).filter(Boolean);
    const login = `${parts[0] || "klient"}.${parts.at(-1)?.[0] || "x"}${Math.floor(10 + Math.random() * 90)}`;
    const password = `spokojny-${Math.floor(1000 + Math.random() * 9000)}`;
    const client = {
      id: `${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      gender,
      login,
      password,
      assignedAt: new Date().toLocaleDateString("pl-PL"),
      deadline: "do ustalenia",
      introAccepted: false,
      answers: Object.fromEntries(TESTS.map((test) => [test.id, {}])),
      completedTests: [],
    };
    onCreate(client);
    setCreated(client);
  };

  const copyCredentials = async () => {
    await navigator.clipboard.writeText(`Login: ${created.login}\nHasło: ${created.password}`);
    setCopied(true);
  };

  if (created) {
    return (
      <main className="create-client-page">
        <section className="create-success">
          <CheckCircle2 size={32} />
          <p className="eyebrow">KONTO DEMO UTWORZONE</p>
          <h1>{created.name}</h1>
          <p>Przekaż klientowi dane innym kanałem niż zaproszenie z linkiem.</p>
          <dl className="credentials-box">
            <div><dt>Login</dt><dd>{created.login}</dd></div>
            <div><dt>Hasło</dt><dd>{created.password}</dd></div>
            <div><dt>Forma pytań</dt><dd>{getGenderLabel(created.gender)}</dd></div>
          </dl>
          <button className="button button-primary" onClick={copyCredentials}>
            <Copy size={17} /> {copied ? "Skopiowano" : "Kopiuj dane"}
          </button>
          <button className="button button-secondary" onClick={onCancel}>Wróć do klientów</button>
        </section>
      </main>
    );
  }

  return (
    <main className="create-client-page">
      <section className="create-form-panel">
        <button className="back-link" onClick={onCancel}><ArrowLeft size={18} /> Anuluj</button>
        <p className="eyebrow">NOWY KLIENT</p>
        <h1>Przydziel zestaw testów</h1>
        <p>W demo konto i odpowiedzi pozostaną wyłącznie w tej przeglądarce.</p>
        <form onSubmit={submit}>
          <label><span>Imię i nazwisko</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="np. Aleksandra Nowak" /></label>
          <label><span>E-mail</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="aleksandra@example.com" /></label>
          <fieldset className="gender-fieldset">
            <legend>Płeć i forma językowa pytań</legend>
            <p>Ustawienie zmienia wyłącznie odmianę treści, nie wpływa na wynik.</p>
            <div className="gender-options">
              {GENDER_OPTIONS.map((option) => (
                <label className={`gender-option ${gender === option.value ? "selected" : ""}`} key={option.value}>
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={gender === option.value}
                    onChange={() => setGender(option.value)}
                    required
                  />
                  <span><strong>{option.label}</strong><small>{option.description}</small></span>
                  <CheckCircle2 size={18} aria-hidden="true" />
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Przydzielone części</legend>
            {TESTS.map((test) => <label className="checked-test" key={test.id}><input type="checkbox" checked readOnly /><span><strong>{test.title}</strong><small>{test.duration}</small></span></label>)}
          </fieldset>
          <button className="button button-primary" type="submit"><Plus size={18} /> Utwórz konto demo</button>
        </form>
      </section>
      <img src="./assets/section-05.webp" alt="Abstrakcyjna kompozycja symbolizująca rozpoczęcie procesu" />
    </main>
  );
}

function PsychologistPortal({ workspace, setWorkspace, onLogout }) {
  const [selectedId, setSelectedId] = useState(workspace.clients[1]?.id || workspace.clients[0]?.id);
  const [creating, setCreating] = useState(false);
  const selected = workspace.clients.find((client) => client.id === selectedId) || workspace.clients[0];

  return (
    <div className="psych-shell">
      <AppHeader session={{ role: "psychologist" }} onLogout={onLogout}>
        <span className="header-context">Panel psychologa</span>
      </AppHeader>
      <DemoNotice />
      <div className="psych-layout">
        <ClientIndex
          clients={workspace.clients}
          selectedId={creating ? null : selectedId}
          onCreate={() => setCreating(true)}
          onSelect={(id) => { setSelectedId(id); setCreating(false); }}
        />
        {creating ? (
          <CreateClient
            onCancel={() => setCreating(false)}
            onCreate={(client) => {
              setWorkspace((current) => ({ ...current, clients: [...current.clients, client] }));
              setSelectedId(client.id);
            }}
          />
        ) : (
          <ReportView client={selected} />
        )}
      </div>
    </div>
  );
}

export function App() {
  const [workspace, setWorkspace] = useState(loadWorkspace);
  const [session, setSession] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
  }, [workspace]);

  const sessionClient = useMemo(
    () => workspace.clients.find((client) => client.id === session?.clientId),
    [workspace.clients, session],
  );

  const login = (loginValue, passwordValue) => {
    if (loginValue === PSYCHOLOGIST.login && passwordValue === PSYCHOLOGIST.password) {
      setSession({ role: "psychologist" });
      return true;
    }
    const client = workspace.clients.find(
      (item) => item.login === loginValue && item.password === passwordValue,
    );
    if (!client) return false;
    setSession({ role: "client", clientId: client.id, name: client.name });
    return true;
  };

  const resetDemo = () => {
    const fresh = createInitialWorkspace();
    setWorkspace(fresh);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setSession(null);
  };

  if (!session) {
    return <LoginScreen workspace={workspace} onLogin={login} onReset={resetDemo} />;
  }

  if (session.role === "client" && sessionClient) {
    return (
      <ClientPortal
        client={sessionClient}
        setWorkspace={setWorkspace}
        onLogout={() => setSession(null)}
      />
    );
  }

  return (
    <PsychologistPortal
      workspace={workspace}
      setWorkspace={setWorkspace}
      onLogout={() => setSession(null)}
    />
  );
}
