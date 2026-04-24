# TREAL Tauri Desktop (Development)

This is a separate Tauri + Rust scaffold for TREAL, with a frontend that mirrors the Electron development design.

## Why separate?

Electron and Tauri are different desktop runtimes. They should be developed as separate apps while sharing UI ideas/components.

## Run

```bash
cd treal-tauri
npm install
npm run tauri:dev
```

## Included now

- Intro page with premium time display (mocked `28` days)
- Setup page (email, Bybit API key, TREAL access token)
- Trading page using TradeArea-inspired layout from your Next.js app
- Rust command stub (`get_premium_days_remaining`) ready for extension

## Planned later

- Rust WebSocket service
- Full-screen open when WS event arrives
- Secure credential storage (instead of browser localStorage)
