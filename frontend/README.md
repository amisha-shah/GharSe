# GharSe Frontend — Vite + React 18 + React Router

Minimal frontend. **No Tailwind, no Axios, no other libraries.** Plain CSS + native `fetch`.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Opens at http://localhost:5173. Backend expected at `http://localhost:8080` (configurable in `.env`).

## Spring Boot CORS

Add to your `SecurityConfig.java`:

```java
@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration c = new CorsConfiguration();
    c.setAllowedOrigins(List.of("http://localhost:5173"));
    c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    c.setAllowedHeaders(List.of("*"));
    c.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
    src.registerCorsConfiguration("/**", c);
    return src;
}
```
And in your security chain: `http.cors(Customizer.withDefaults())...`

## Endpoints used
- `POST /auth/register` — `{ email, password, role }`
- `POST /auth/login` — `{ email, password }`
- `POST /provider/profile/{userId}` — `{ name, phone, whatsapp, latitude, longitude }`
- `GET  /providers/nearby?lat=&lng=&radius=`

## Build
```bash
npm run build && npm run preview
```
