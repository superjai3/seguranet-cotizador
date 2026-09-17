# seguranet-cotizador

Cotizador de seguros de auto de [Seguranet](https://github.com/superjai3/Seguranet).
Dos cosas conviven acá:

- **`docs/`** — el cotizador en sí: HTML, CSS y JavaScript, sin nada del lado del
  servidor. Arma las listas de año, marca, modelo y versión pidiéndoselas a
  APIs públicas (MercadoLibre, NHTSA y fueleconomy.gov) y calcula el premio de
  los cuatro planes en el navegador.
- **`SeguranetAPI`** (la solución .NET 8 de la raíz) — la API que habla con
  MercadoLibre con credenciales propias y cachea en Redis. Hoy el cotizador de
  `docs/` **no la usa**: pega directo contra las APIs públicas.

## Verlo en línea

**https://superjai3.github.io/seguranet-cotizador/**

Se publica con *Settings → Pages → Deploy from a branch*, rama `main`, carpeta
`/docs`. Como el cotizador es estático, no hace falta levantar la API para que
funcione.

La carpeta se llama `docs/` —y no `CotizadorSeguros/`, como antes— porque Pages
sólo sabe publicar desde la raíz del repositorio o desde `/docs`, y publicar la
raíz serviría por HTTP todo lo demás: el código de la API, `bin/`, `obj/`,
`node_modules/` y la carpeta `certs/`.

## Ojo con `certs/`

`certs/private-key.pem` es una clave privada y está versionada en un
repositorio público. Habría que sacarla del historial y volver a emitir el
certificado; mientras tanto, no la uses para nada real.

## Correrlo local

Alcanza con abrir `docs/index.html` en el navegador, o servir esa carpeta con
cualquier servidor estático:

```
python3 -m http.server --directory docs 8000
```

La API, si la querés levantar aparte:

```
dotnet run --project SeguranetAPI.csproj
```

Necesita las credenciales de MercadoLibre en `appsettings.json`, donde hoy hay
marcadores (`%CLIENT_ID%`, `%CLIENT_SECRET%`, `%REDIRECT_URI%`).
