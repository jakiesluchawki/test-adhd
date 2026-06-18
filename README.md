# Test ADHD

Interaktywny prototyp panelu do przeprowadzania testów przed konsultacją psychologiczną. Zawiera dwa kompletne przepływy:

- klient: logowanie, wprowadzenie, zapis postępu, pytania zamknięte i opisowe, skróty numeryczne oraz przegląd odpowiedzi;
- psycholog: lista klientów, statusy, tworzenie kont demo z wyborem formy językowej pytań i skonsolidowany raport z drukiem do PDF.

## Demo

```text
Klient
login: anna.demo
hasło: spokojny-start

Psycholog
login: emilia.demo
hasło: panel-demo
```

To są wyłącznie publiczne dane demonstracyjne. Odpowiedzi zapisują się w `localStorage` i nie wolno używać tej wersji do prawdziwych danych pacjentów.

## Lokalnie

```bash
npm install
npm run dev
```

Otwórz `http://127.0.0.1:4173/test-adhd/`.

## GitHub Pages

Projekt używa bazowej ścieżki `/test-adhd/`. Po zbudowaniu katalog `dist/` można publikować przez GitHub Pages.

## Droga do wersji produkcyjnej

Frontend jest przygotowany do zastąpienia lokalnego store prawdziwym API. Minimalny bezpieczny wariant to:

- Supabase Auth dla kont klientów i psychologów;
- PostgreSQL z Row Level Security;
- osobne role `client` i `psychologist`;
- szyfrowanie połączenia, log audytowy i polityka retencji;
- hosting frontendu niezależny od bazy;
- formalna analiza RODO i umowa powierzenia przed użyciem danych zdrowotnych.

Szkic modelu i polityk znajduje się w `supabase/schema.sql`.

## Formularze

Demo zawiera GAD-7, autorski materiał startowy ADHD oraz przykładowy wywiad rozwojowy. Nie publikuje komercyjnych lub licencjonowanych formularzy BDI-II, SCID ani innych narzędzi. Silnik można zasilić formularzami, do których poradnia ma prawo użycia.
