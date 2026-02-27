# barcodeScanner (ScanRecord) — Warehouse Shelf Scan Logger (Electron)

A lightweight **desktop barcode scanning logger** built for warehouse/store operations to quickly **assign products to locations** (shelves/bins) using a barcode scanner — with a simple rule:

- **Scan product → scan location → it saves**
- **Scan the same product again (duplicate scan) → it removes / marks as removed**

This project was originally built for a high-volume store + warehouse workflow to reduce manual entry and keep shelf-location tracking fast.

## Key Features

- **Fast scan workflow**: capture product payload and location with minimal clicks.
- **Duplicate-scan removal**: scanning the same product payload again triggers a removal action (useful for moving goods off a shelf).  
- **Local persistence** using **RxDB + LevelDB (Pouch adapters)** (offline-friendly).  
- **Export scan logs**:
  - Export page content to **Word (.doc)**  
  - Export scan table to **Excel (.xls)**  
- Simple UI with scan console + scan record table.

## How It Works (Workflow)

1. The app focuses a hidden/active input (`textarea`) and continuously listens for scanner keystrokes.
2. A **product scan** is detected when the string contains `*` and splits into 3 parts (e.g., `SKU*LOT*PALLET`).
3. The next scan (without `*`) is treated as the **location**.
4. The app appends a row into the table and stores the record locally.
5. If the same product payload is scanned again, the app removes that entry and logs a “removed” row in red.

> Note: The UI is optimized for “hands-off” scanning (auto-focus keeps returning to the input field).

## Tech Stack

- **Electron** (desktop app shell)
- **JavaScript / HTML**
- **RxDB** with **PouchDB adapters + LevelDB** for local storage  
- Small helper scripts for simulating scan input (Python)

## Project Structure

- `main.js` — Electron main process (creates window, menu, loads HTML)
- `mainWindow.html` — UI shell (buttons + scan table)
- `app.js` — front-end logic: scan parsing, table updates, export to Word/Excel
- `database/`
  - `db.js` — RxDB database + schema definition
  - `db-func.js` — CRUD helpers (update/add, remove, list)
- `usbar/usb_test.py` — simple scan simulator (prints product payload + location)

## Getting Started

### Prerequisites
- Node.js + npm installed

### Install
```
npm install
npm start
```

## Usage (Warehouse Workflow)

1. Click **START SCAN** to begin scanning mode.
2. Scan the product label (expected format: `SKU*LOT*PALLET`).
3. Scan the corresponding **location code** (shelf/bin ID).
4. Repeat the process for additional items.
5. To remove an item from a shelf:  
   → Scan the same product payload again (duplicate scan triggers removal).
6. Export daily logs using:
   - **SAVE TO WORD**
   - **SAVE TO EXCEL**

---

## Data Model (Simplified)

Each stored record contains:

- `colA` — Product Identifier (e.g., SKU)
- `colB` — Lot Number
- `colC` — Pallet Identifier
- `location` — Shelf / Bin / Storage Location Code

All records are stored locally in an **RxDB database (`testdb`)**  
with indexed fields for efficient retrieval.

---

## Notes / Known Limitations

- The current implementation is optimized for the original warehouse workflow and may require minor UI/UX refinements for broader deployment.
- Export functionality is generated client-side using:
  - HTML-to-Word conversion
  - HTML table-to-Excel conversion

---

## Future Improvements / Roadmap

- Implement full **Search functionality** (by SKU, Lot, Pallet, or Location).
- Add a proper **“move item” flow** with historical tracking of location changes.
- Add **CSV export** and printable daily scan sheets.
- Improve schema design:
  - Use a compound unique key (`SKU + LOT + PALLET`)
  - Separate location history into its own collection/table.
- Package distributable builds for Windows and macOS using **electron-builder**.
