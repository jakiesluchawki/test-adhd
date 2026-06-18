# Audyt funkcji zarządzania klientami

## Wynik przed zmianami

Panel dobrze prowadził przez testy i raport, ale nie spełniał podstawowych potrzeb operacyjnych gabinetu. Ocena obszaru zarządzania przed zmianami: **7/20, słabo**. Po wdrożeniu i kontroli przepływów: **17/20, dobrze**.

| Priorytet | Brak | Wpływ | Status |
|---|---|---|---|
| P1 | Brak edycji danych klienta | Literówki i zmiany kontaktu wymagały utworzenia nowego konta | Naprawione |
| P1 | Brak bezpiecznego usuwania klienta | Nie można było wycofać błędnie utworzonego konta ani usunąć odpowiedzi | Naprawione |
| P1 | Brak danych kontaktowych w kartotece i raporcie | Psycholog musiał prowadzić drugi rejestr poza panelem | Naprawione |
| P1 | Brak zmiany zakresu testów po utworzeniu konta | Pomyłka w przydziale była nieodwracalna | Naprawione |
| P2 | Brak ponownego dostępu do loginu i hasła | Dane można było skopiować tylko bezpośrednio po utworzeniu konta | Naprawione |
| P2 | Brak regeneracji hasła | Utracone hasło wymagało nowego konta | Naprawione |
| P2 | Brak wyszukiwania klientów | Lista przestawałaby być użyteczna po dodaniu większej liczby osób | Naprawione |
| P2 | Brak preferowanego kanału kontaktu i terminu | Informacje organizacyjne pozostawały poza systemem | Naprawione |
| P2 | Brak pustego stanu po usunięciu wszystkich klientów | Interfejs zakładał, że zawsze istnieje co najmniej jeden rekord | Naprawione |
| P2 | Brak kontroli duplikatów kontaktu i loginu | Można było przypadkiem utworzyć dwie kartoteki tej samej osoby | Naprawione |

## Zakres wdrożenia

- kartoteka klienta z kontaktem, preferowanym kanałem, terminem i notatką organizacyjną;
- edycja imienia, formy językowej oraz zakresu formularzy;
- wyszukiwanie po imieniu, e-mailu i telefonie;
- ponowne kopiowanie wiadomości i danych dostępowych;
- generowanie nowego hasła z obowiązkiem zapisania zmiany;
- dwuetapowe, wbudowane w stronę potwierdzenie usunięcia klienta;
- pusty stan umożliwiający odbudowanie listy po usunięciu wszystkich rekordów.
- kontrola powtórzonych adresów e-mail, telefonów i loginów.

## Pozostałe zadania produkcyjne

- P1: zastąpienie `localStorage` bazą danych z rolami i politykami dostępu;
- P1: rejestrowanie historii zmian oraz operacji na danych zdrowotnych;
- P2: miękkie usunięcie, okres retencji i późniejsza anonimizacja zamiast natychmiastowego kasowania;
- P2: filtry statusu i stronicowanie po przekroczeniu kilkudziesięciu kartotek.

## Ograniczenie demonstracji

Dane nadal są zapisywane wyłącznie w `localStorage`. Produkcyjne usuwanie powinno korzystać z kontroli uprawnień, logu audytowego, polityki retencji i miękkiego usunięcia przed trwałą anonimizacją.
