# Dokumentacja Funkcjonalności Aplikacji NeuroTrack

## 1. Uwierzytelnianie i Zarządzanie Kontem
*   **Rejestracja**: Możliwość założenia nowego konta użytkownika.
*   **Logowanie**: Bezpieczne logowanie za pomocą adresu email i hasła (z wykorzystaniem tokenów JWT).
*   **Wylogowanie**: Możliwość bezpiecznego zakończenia sesji.

## 2. Pulpit (Dashboard)
*   **Przegląd**: Główny widok aplikacji prezentujący najważniejsze informacje.
*   **Widget Pogodowy**: Wyświetlanie aktualnej pogody (temperatura, ciśnienie, wilgotność, warunki) na podstawie lokalizacji użytkownika (lub domyślnej).

## 3. Dziennik Migren (Śledzenie)
*   **Dodawanie Wpisów**: Formularz pozwalający na szczegółowe rejestrowanie napadów migreny.
    *   **Czas**: Data i godzina rozpoczęcia oraz czas trwania.
    *   **Intensywność**: Skala bólu.
    *   **Lokalizacja Bólu**: Wybór obszarów głowy objętych bólem.
    *   **Objawy**: Lista symptomów towarzyszących.
    *   **Wyzwalacze**: Czynniki, które mogły wywołać migrenę.
    *   **Leki**: Przyjęte medykamenty.
    *   **Metody Ulgi**: Zastosowane metody łagodzenia bólu.
    *   **Notatki**: Dodatkowe uwagi tekstowe.
*   **Automatyczne Dane Pogodowe**: Aplikacja automatycznie pobiera i zapisuje warunki pogodowe (ciśnienie, temperatura) w momencie dodawania wpisu, co pozwala na późniejszą analizę korelacji.
*   **Historia Wpisów**: Lista wszystkich zarejestrowanych migren z możliwością podglądu szczegółów.

## 4. Raporty i Statystyki
*   **Podsumowanie Liczbowe**:
    *   Całkowita liczba zarejestrowanych migren.
    *   Średnia intensywność bólu.
    *   Średni czas trwania napadu.
*   **Wykresy i Wizualizacje**:
    *   **Częstotliwość**: Wykres słupkowy liczby migren w poszczególnych miesiącach.
    *   **Wyzwalacze**: Wykres kołowy pokazujący najczęstsze przyczyny migren.
    *   **Intensywność**: Rozkład poziomów bólu (wykres kołowy).
    *   **Korelacja z Ciśnieniem**: Wykres badający związek między występowaniem migren a ciśnieniem atmosferycznym.
*   **Eksport Danych**: Możliwość pobrania pełnej historii migren do pliku CSV (`raport_migren.csv`) w celu własnej analizy lub przedstawienia lekarzowi.

## 5. Integracje Zewnętrzne
*   **API Pogodowe**: Integracja z zewnętrznym dostawcą danych pogodowych w celu pobierania aktualnych warunków atmosferycznych.
