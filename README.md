# Tasks – frontend

Aplikacja React do zarządzania zadaniami (frontend rekrutacyjny).

## Uruchomienie projektu (dla rekrutera)

### 1. Pobranie repozytorium

```bash
git clone https://github.com/Grave-Dave/QuickTasks-frontend.git
cd tasks-fe
```

### 2. Instalacja zależności

```bash
npm install
```

### 3. Konfiguracja zmiennych środowiskowych

Skopiuj plik `.env.example` do `.env` i uzupełnij wartości:

```bash
# Windows (PowerShell)
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Następnie edytuj plik `.env`. Przykładowa zawartość:

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_API_BASE_PATH=/api
```

- **VITE_API_URL** – adres URL backendu (np. `http://127.0.0.1:8000` przy lokalnym API).
- **VITE_API_BASE_PATH** – ścieżka bazowa API (domyślnie `/api`).

### 4. Uruchomienie aplikacji

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem wyświetlonym w terminalu (zazwyczaj `http://localhost:5173`).

---

**Uwaga:** Aplikacja wymaga działającego backendu pod adresem wskazanym w `VITE_API_URL`. Upewnij się, że backend jest uruchomiony przed testowaniem funkcji wymagających API.
