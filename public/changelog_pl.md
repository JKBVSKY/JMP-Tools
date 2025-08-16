---

# Witamy w JMP-Tools!
# Co nowego?

---
## [0.4.0] - 2025-08-16

### Dodano

- **Dodaj nowy wpis w historii wyników:** Użytkownik może teraz ręcznie dodać dane i zapisać je bezpośrednio w historii wyników!

- **Nowy zegar:** Aby ułatwić synchronizację czasu rozpoczęcia załadunku ciężarówek.

- **Możesz teraz usuwać wpisy w zakładce załadunku ciężarówek.**

- **Ustawienia:** Możesz teraz wybrać język, powiadomienia oraz tryb ciemny lub jasny w menu ustawień!

- **Powiadomienia:** Powiadomienia push-up o aktualnym wyniku (włącz w ustawieniach).

- **Jasny/Ciemny tryb:** Dwa motywy wizualne dla aplikacji (wybierz w ustawieniach).

### Naprawiono

- **Język:** Rejestr zmian i zakładka historii wyników są teraz w pełni przetłumaczone!

### Zmieniono

- **Czcionka:** Zmieniono czcionkę globalną.

- **Projekt:** Zmieniono styl aplikacji.

- **Wybór języka przeniesiono do menu ustawień.**

## [0.3.0] JUŻ DOSTĘPNE! - 2025-05-14

### Dodano

**Historia wyników:** Bardzo przydatna funkcja, która pozwoli użytkownikowi monitorować swoją efektywność pracy. Pozwala ona użytkownikowi zapisać wynik z każdego dnia roboczego, a następnie obliczyć i wyświetlić średni miesięczny wynik użytkownika.

### Naprawiono

- Naprawiono błąd, w wyniku którego funkcja „47 pal/h o” wyświetlała błędną godzinę, jeśli użytkownik skorygował swój czas przed wyłączeniem obliczeń.

- Naprawiono błąd, w wyniku którego zakładka podsumowania wyświetlała błędną wartość „Wyłączono o”, jeśli użytkownik skorygował swój czas przed wyłączeniem obliczeń.

- Naprawiono problemy z responsywnością głównego wyświetlacza kalkulatora wyników.

### Przeprojektowano

- Zmieniono styl menu (zrezygnowano z menu hamburgerowego – teraz wygląda po prostu lepiej).

- Zmieniono styl głównego wyświetlacza obliczeń – bardziej przejrzysty widok, lepsza organizacja, przyciski znajdują się teraz wewnątrz wyświetlacza.

- Nawigacja korzysta teraz ze ścieżek – brak przekierowania do strony głównej po odświeżeniu.

### Planowane w przyszłości

- **Historia wyników:** [GOTOWE]

- **Poziomy:** Użytkownik będzie mógł na bieżąco śledzić swój poziom wyników oraz przybliżoną wysokość premii.

- **Konwerter czasu:** Proste narzędzie umożliwiające konwersję wartości czasu dziesiętnego na czas normalny.

- **Przewidywacz palet:** Przydatne narzędzie pomagające przewidzieć liczbę palet pozostałych do wyprodukowania przez pracownika pakowania.

- **Kalkulator wyników sekcji pakowania:** Kalkulator wyników sekcji pakowania.

- **Więcej statystyk dla licznika wyników:** [GOTOWE]

- **Wartości regulowane:** Dla lepszej synchronizacji wyników.

## [0.2.1] - 2025-01-31

### Dodano

- **Nowe statystyki:**

- **Czas rozpoczęcia:** Wyświetla czas rozpoczęcia obliczeń.

- **47 palet/h przy:** Wyświetla dokładny czas, w którym wynik użytkownika osiągnie 47 palet na godzinę (co jest wynikiem maksymalnym).

- **Regulowany czas:** Użytkownik może teraz dostosować czas, który upłynął, aby lepiej synchronizować wyniki.

---

## [0.2.0] - 2025-01-23

### Dodano

- Trzy nowe przyciski na pasku nawigacyjnym: „Strona główna”, „Aplikacja kalkulatora” i „Historia wyników”

- Strona główna pokazująca nowości w aplikacji.

- Menu hamburgerowe

- **Obliczenia ważone:** Aplikacja kalkulatora obsługuje teraz obliczenia ważone!

- **Zakładki:** Wprowadzono interfejs z zakładkami dla lepszej nawigacji i organizacji.

- **Zakładka Główne obliczenia**: Wyświetla szczegółowe obliczenia.

- **Zakładka Załadowane ciężarówki**: Dedykowana zakładka do śledzenia załadowanych ciężarówek.

- **Karta Podsumowanie**: Zawiera podsumowanie obliczeń.

### Naprawiono

- Naprawiono błąd, który powodował, że czas ładowania mógł być wartością ujemną.

- Usunięto możliwość nieoczekiwanego zachowania podczas dodawania czasu przerwy.

### Zmieniono

- Funkcja pauzy została całkowicie przeprojektowana. Użytkownik może teraz wybrać czas przerwy. Funkcja ta jest zgodna z zasadami systemu „punktowania pauzy” magazynu JMP.

- Przyciski debugowania są teraz ukryte i wyświetlane dopiero po naciśnięciu przycisku „Włącz debugowanie”.

- Nieznacznie zmieniono wygląd przycisków.

- Zmieniono rozmiar i styl czcionki nagłówka.

### Usunięto

- Stara funkcja pauzy, która nie była praktyczna.

### Zaktualizowano

- Tłumaczenia są teraz aktualne!

---

## [0.1.0] - 2025-01-06

### Dodano

- Pierwsza stabilna wersja aplikacji.

- W pełni funkcjonalna funkcja wstrzymywania i wznawiania.

- Trwałe stany dzięki localStorage.

- Dokładne obliczanie stawki paletowej nawet podczas przerw.

- Synchronizacja interwałów zapewniająca płynne obliczanie stawki po wznowieniu.

- Ulepszony interfejs użytkownika z tłumaczeniami przycisków i etykiet za pomocą funkcji t().

- Dodano przycisk języka, który dynamicznie otwiera komponent do wyboru języka. Użytkownicy mogą teraz płynnie zmieniać języki.

- Wprowadzono prostą sekcję „jak to zrobić”, wyjaśniającą funkcjonalność i sposób użytkowania aplikacji.

### Projekt i interfejs użytkownika

- Wprowadzono atrakcyjne wizualnie tło SVG z podstawowym stylem.

- Podstawowa responsywność

- Zapewniono kompatybilność aplikacji z różnymi rozmiarami ekranów, choć planowane są dalsze ulepszenia w przyszłych aktualizacjach.

- Obecny projekt koncentruje się na prostocie, z planami przyszłych ulepszeń.

### Naprawiono

- Rozwiązano problemy powodujące nieprawidłowe obliczanie szybkości palet podczas przejść między pauzą a wznowieniem.

- Naprawiono błędy, w których wartość pauseTimer nieprawidłowo zwiększała się po odświeżeniu.

- Rozwiązano problemy z synchronizacją między interwałami i stanami.

### Zmieniono

- Przebudowano funkcjonalność pauzy, aby była w całości sterowana stanem pauzy, co zmniejsza złożoność.

- Uproszczono logikę przycisków dla lepszej obsługi.

### Funkcje debugowania

- Przyciski debugowania są nadal dostępne w celach programistycznych. Rozważane jest potencjalne przełączanie stanu debugowania w celu usprawnienia tej funkcjonalności.

### Znane ograniczenia

- Responsywność może nie być idealna na wszystkich urządzeniach i zostanie udoskonalona w przyszłych aktualizacjach.

### Uwagi

- To jest początkowa wersja, w której aplikacja jest w pełni funkcjonalna i stabilna. Przyszłe aktualizacje będą zgodne z wytycznymi semantycznego wersjonowania.