:root {
  --bg: #eef0f5;
  --paper: #f7f5f1;
  --panel: rgba(250, 249, 246, 0.94);
  --panel-strong: #fbfaf7;
  --panel-blue: #e8edf5;
  --panel-purple: #ede9f2;
  --ink: #293143;
  --ink-soft: #465064;
  --muted: #737b8b;
  --line: #cfd3dc;
  --line-strong: #9299a8;
  --work: #596f9d;
  --work-dark: #42577f;
  --work-soft: #e4eaf4;
  --fun: #776b92;
  --fun-dark: #5f5478;
  --fun-soft: #ebe6f1;
  --rose: #a97986;
  --sage: #82958a;
  --green: #5f7f70;
  --yellow: #9a7b4f;
  --sidebar: #333b52;
  --sidebar-soft: #404861;
  --shadow: 0 18px 44px rgba(49, 56, 78, 0.08);
  --shadow-hover: 0 22px 52px rgba(49, 56, 78, 0.13);
  --radius: 14px;
  --radius-small: 9px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--ink);
  background-color: var(--bg);
  background-image:
    linear-gradient(rgba(89, 111, 157, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(119, 107, 146, 0.045) 1px, transparent 1px),
    radial-gradient(circle at 78% 8%, rgba(119, 107, 146, 0.13), transparent 28%),
    radial-gradient(circle at 24% 92%, rgba(89, 111, 157, 0.12), transparent 30%);
  background-size: 28px 28px, 28px 28px, auto, auto;
  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
}

button,
input,
textarea {
  font: inherit;
}

button,
label {
  -webkit-tap-highlight-color: transparent;
}

button {
  cursor: pointer;
}

button:focus-visible,
input:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 3px solid rgba(89, 111, 157, 0.28);
  outline-offset: 2px;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  width: 286px;
  padding: 22px 16px;
  overflow-y: auto;
  color: #f4f3f7;
  background:
    linear-gradient(160deg, rgba(119, 107, 146, 0.34), transparent 42%),
    linear-gradient(180deg, var(--sidebar), #2c3348 72%);
  border-right: 1px solid rgba(255, 255, 255, 0.13);
  box-shadow: 12px 0 34px rgba(31, 37, 54, 0.12);
}

.sidebar::after {
  content: "BLUE HOUR / PERSONAL STUDIO";
  display: block;
  margin: 30px 12px 8px;
  color: rgba(244, 243, 247, 0.35);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.brand {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 8px 10px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.brand-mark {
  display: grid;
  width: 43px;
  height: 43px;
  flex: 0 0 43px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 13px;
  color: #2f3850;
  background: linear-gradient(145deg, #dce5f2, #c8bdd6);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 8px 22px rgba(20, 25, 40, 0.18);
  font-size: 17px;
  font-weight: 900;
}

.brand strong,
.brand small,
.mode-button strong,
.mode-button small {
  display: block;
}

.brand strong {
  letter-spacing: 0.03em;
}

.brand small,
.mode-button small {
  margin-top: 3px;
  color: rgba(244, 243, 247, 0.58);
  font-size: 11px;
  letter-spacing: 0.04em;
}

.mode-nav {
  display: grid;
  gap: 10px;
  padding-top: 20px;
}

.nav-group {
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 13px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.nav-group.is-open {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.045);
}

.mode-button,
.child-button {
  width: 100%;
  border: 0;
  text-align: left;
  color: inherit;
}

.mode-button {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 11px 12px;
  border-radius: 12px;
  background: transparent;
  transition: background 0.18s ease, transform 0.18s ease;
}

.mode-button:hover {
  background: rgba(255, 255, 255, 0.07);
  transform: translateX(2px);
}

.mode-button.is-active {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.mode-dot {
  width: 7px;
  height: 34px;
  flex: 0 0 7px;
  border-radius: 999px;
  box-shadow: 0 0 18px currentColor;
}

.work-dot {
  color: #9fb2d7;
  background: #9fb2d7;
}

.fun-dot {
  color: #b7a6c8;
  background: #b7a6c8;
}

.child-nav {
  display: none;
  padding: 4px 10px 12px 39px;
}

.nav-group.is-open .child-nav {
  display: grid;
  gap: 4px;
  animation: menu-reveal 0.18s ease-out;
}

@keyframes menu-reveal {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.child-button {
  position: relative;
  min-height: 36px;
  padding: 7px 12px;
  border-radius: 9px;
  color: rgba(244, 243, 247, 0.67);
  background: transparent;
  transition: color 0.18s ease, background 0.18s ease, padding-left 0.18s ease;
}

.child-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  transform: translateY(-50%);
  opacity: 0.45;
}

.child-button:hover,
.child-button.is-active {
  padding-left: 16px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.child-button.is-active::before {
  width: 6px;
  height: 6px;
  opacity: 1;
}

.main {
  width: calc(100% - 286px);
  max-width: 1540px;
  min-height: 100vh;
  margin-left: 286px;
  padding: 34px clamp(22px, 4vw, 58px) 64px;
}

.topbar {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
  padding: 2px 2px 19px;
  border-bottom: 1px solid rgba(41, 49, 67, 0.18);
}

.topbar::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 82px;
  height: 3px;
  background: linear-gradient(90deg, var(--work), var(--fun));
}

.topbar p,
.topbar h1 {
  margin: 0;
}

.topbar p {
  color: var(--work-dark);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.topbar h1 {
  margin-top: 7px;
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.status-pill,
.label,
.state {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.04em;
}

.status-pill {
  min-height: 38px;
  border: 1px solid var(--line-strong);
  color: var(--ink-soft);
  background: rgba(250, 249, 246, 0.78);
  box-shadow: 3px 3px 0 rgba(89, 111, 157, 0.13);
  white-space: nowrap;
}

.status-pill::before {
  content: "";
  width: 7px;
  height: 7px;
  margin-right: 7px;
  border-radius: 50%;
  background: var(--sage);
  box-shadow: 0 0 0 4px rgba(130, 149, 138, 0.13);
}

.dashboard-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
  margin-bottom: 22px;
}

.dashboard-strip article {
  position: relative;
  min-height: 118px;
  overflow: hidden;
  padding: 17px 19px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: 4px 4px 0 rgba(89, 111, 157, 0.09);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.dashboard-strip article:nth-child(2) {
  background: linear-gradient(145deg, var(--panel), var(--panel-purple));
}

.dashboard-strip article:nth-child(3) {
  background: linear-gradient(145deg, var(--panel), #e9efeb);
}

.dashboard-strip article::after {
  content: "";
  position: absolute;
  top: -28px;
  right: -22px;
  width: 88px;
  height: 88px;
  border: 1px solid rgba(89, 111, 157, 0.22);
  border-radius: 50%;
}

.dashboard-strip article:hover {
  transform: translateY(-2px);
  box-shadow: 6px 7px 0 rgba(89, 111, 157, 0.1);
}

.dashboard-strip span,
.dashboard-strip small {
  position: relative;
  z-index: 1;
  display: block;
  color: var(--muted);
  font-size: 12px;
}

.dashboard-strip span {
  font-weight: 800;
  letter-spacing: 0.06em;
}

.dashboard-strip strong {
  position: relative;
  z-index: 1;
  display: block;
  margin: 9px 0 4px;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  line-height: 0.9;
}

.panel {
  display: none;
}

.panel.is-active {
  display: block;
  animation: panel-in 0.25s ease-out;
}

@keyframes panel-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.workbench {
  display: grid;
  gap: 18px;
}

.two-column {
  grid-template-columns: minmax(310px, 0.82fr) minmax(0, 1.45fr);
  align-items: stretch;
}

.task-card,
.result-card,
.schedule-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
}

.task-card::before,
.result-card::before,
.schedule-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: linear-gradient(90deg, var(--work), var(--fun), var(--rose));
  opacity: 0.72;
}

.task-card {
  background: linear-gradient(160deg, rgba(250, 249, 246, 0.98), rgba(232, 237, 245, 0.86));
}

.result-card,
.schedule-card {
  background: linear-gradient(160deg, rgba(250, 249, 246, 0.98), rgba(237, 233, 242, 0.7));
}

.task-card.compact {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  box-shadow: 4px 4px 0 rgba(89, 111, 157, 0.09);
}

.card-head {
  margin-bottom: 19px;
}

.card-head h2 {
  margin: 9px 0 6px;
  font-size: 20px;
  line-height: 1.28;
  letter-spacing: -0.02em;
}

.card-head p {
  max-width: 58ch;
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.label {
  border: 1px solid rgba(89, 111, 157, 0.22);
  color: var(--work-dark);
  background: var(--work-soft);
  text-transform: uppercase;
}

.label.fun {
  border-color: rgba(119, 107, 146, 0.23);
  color: var(--fun-dark);
  background: var(--fun-soft);
}

.upload-box {
  display: grid;
  gap: 5px;
  min-height: 122px;
  place-items: center;
  padding: 20px;
  margin-bottom: 13px;
  border: 1px dashed var(--line-strong);
  border-radius: 12px;
  color: var(--work-dark);
  background:
    linear-gradient(rgba(89, 111, 157, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(89, 111, 157, 0.04) 1px, transparent 1px),
    rgba(250, 249, 246, 0.72);
  background-size: 18px 18px;
  transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
}

.upload-box:hover {
  border-color: var(--work);
  background-color: var(--work-soft);
  transform: translateY(-1px);
}

.fun-upload {
  color: var(--fun-dark);
}

.fun-upload:hover {
  border-color: var(--fun);
  background-color: var(--fun-soft);
}

.upload-box input {
  display: none;
}

.upload-box span {
  font-weight: 850;
}

.upload-box small {
  max-width: 100%;
  overflow: hidden;
  color: var(--muted);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.field {
  display: block;
  width: 100%;
  min-height: 46px;
  margin-bottom: 12px;
  padding: 11px 13px;
  border: 1px solid var(--line);
  border-radius: 10px;
  outline: none;
  color: var(--ink);
  background: rgba(251, 250, 247, 0.9);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.field::placeholder {
  color: #969baa;
}

textarea.field {
  min-height: 116px;
  resize: vertical;
}

.field:focus {
  border-color: var(--work);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(89, 111, 157, 0.12);
}

.primary-button,
.fun-button,
.secondary-button,
.plain-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 17px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-weight: 850;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.primary-button,
.fun-button {
  width: 100%;
  color: #ffffff;
  box-shadow: 3px 4px 0 rgba(41, 49, 67, 0.18);
}

.primary-button {
  background: linear-gradient(135deg, var(--work), var(--work-dark));
}

.fun-button {
  background: linear-gradient(135deg, var(--fun), var(--fun-dark));
}

.primary-button:hover,
.fun-button:hover {
  transform: translateY(-2px);
  box-shadow: 4px 6px 0 rgba(41, 49, 67, 0.16);
}

.primary-button:active,
.fun-button:active {
  transform: translateY(0);
  box-shadow: 2px 2px 0 rgba(41, 49, 67, 0.18);
}

.secondary-button,
.plain-button {
  width: 100%;
  margin-top: 10px;
  border-color: var(--line-strong);
  color: var(--ink);
  background: rgba(250, 249, 246, 0.9);
}

.secondary-button:hover,
.plain-button:hover {
  background: var(--panel-blue);
  transform: translateY(-1px);
}

.fit {
  width: auto;
  white-space: nowrap;
}

.result-card {
  min-height: 430px;
}

.empty-result {
  display: grid;
  min-height: 365px;
  padding: 24px;
  place-items: center;
  border: 1px dashed var(--line-strong);
  border-radius: 12px;
  color: var(--muted);
  background: rgba(250, 249, 246, 0.48);
  text-align: center;
}

.result-section {
  padding: 17px 0;
  border-top: 1px solid var(--line);
}

.result-section:first-child {
  padding-top: 0;
  border-top: 0;
}

.result-section h3 {
  margin: 0 0 10px;
  font-size: 16px;
}

.result-section p,
.result-section li {
  color: var(--ink-soft);
  line-height: 1.78;
}

.result-section ol,
.result-section ul {
  margin: 0;
  padding-left: 20px;
}

.result-section p {
  margin: 0 0 8px;
}

.copy-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.copy-row .plain-button {
  width: auto;
  margin-top: 0;
}

.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  gap: 14px;
}

.list-item {
  position: relative;
  display: grid;
  gap: 8px;
  min-height: 154px;
  padding: 17px;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: 13px;
  background: var(--panel);
  box-shadow: 3px 4px 0 rgba(89, 111, 157, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.list-item:nth-child(3n + 2) {
  background: linear-gradient(145deg, var(--panel), var(--panel-blue));
}

.list-item:nth-child(3n) {
  background: linear-gradient(145deg, var(--panel), var(--panel-purple));
}

.list-item:hover {
  transform: translateY(-3px);
  box-shadow: 5px 7px 0 rgba(89, 111, 157, 0.09);
}

.list-item strong {
  font-size: 17px;
}

.list-item span,
.list-item p,
.schedule-item span,
.schedule-item small {
  color: var(--muted);
}

.list-item p {
  margin: 0;
  line-height: 1.66;
}

.novel-card {
  min-height: auto;
  gap: 7px;
}

.novel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.novel-rank {
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.novel-rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px 10px;
  border: 1px solid rgba(154, 123, 79, 0.2);
  border-radius: 999px;
  color: #80633e !important;
  background: #eee6d8;
  font-size: 12px;
  font-weight: 750;
}

.novel-author {
  color: var(--muted);
  font-size: 13px;
}

.novel-summary {
  display: -webkit-box;
  overflow: hidden;
  color: var(--ink-soft) !important;
  font-size: 13px;
  line-height: 1.72 !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.novel-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  color: var(--work-dark);
  font-size: 13px;
  font-weight: 750;
  text-decoration: none;
}

.novel-link:hover {
  text-decoration: underline;
}

.novel-controls {
  margin: 4px 0;
}

.novel-checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--muted);
  font-size: 12px;
  cursor: pointer;
}

.novel-checkbox-label input {
  margin: 0;
  accent-color: var(--work);
}

.schedule-list {
  display: grid;
  gap: 10px;
}

.schedule-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: rgba(250, 249, 246, 0.82);
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.schedule-item:hover {
  border-color: var(--line-strong);
  transform: translateX(2px);
}

.schedule-item strong,
.schedule-item small {
  display: block;
}

.schedule-actions {
  display: flex;
  gap: 8px;
}

.icon-button {
  min-width: 36px;
  min-height: 36px;
  border: 1px solid var(--line-strong);
  border-radius: 9px;
  color: var(--ink);
  background: var(--panel-strong);
  font-weight: 850;
}

.icon-button:hover {
  background: var(--panel-blue);
}

.state {
  color: var(--yellow);
  background: #ece4d7;
}

.state.done {
  color: var(--green);
  background: #e0e9e4;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 50;
  max-width: min(420px, calc(100vw - 32px));
  padding: 11px 15px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  color: #ffffff;
  background: #30374d;
  box-shadow: 0 16px 44px rgba(32, 38, 56, 0.26);
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 20px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.toast.is-visible {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media (max-width: 1080px) {
  .two-column {
    grid-template-columns: minmax(290px, 0.9fr) minmax(0, 1.1fr);
  }
}

@media (max-width: 900px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    position: sticky;
    top: 0;
    z-index: 30;
    width: 100%;
    min-height: auto;
    padding: 12px 14px;
    overflow: visible;
    box-shadow: 0 10px 30px rgba(31, 37, 54, 0.14);
  }

  .sidebar::after,
  .brand small,
  .mode-button small,
  .mode-dot {
    display: none;
  }

  .brand {
    padding: 2px 4px 10px;
    border-bottom: 0;
  }

  .brand-mark {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
    border-radius: 10px;
  }

  .mode-nav {
    display: flex;
    gap: 7px;
    padding-top: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .mode-nav::-webkit-scrollbar {
    display: none;
  }

  .nav-group,
  .nav-group.is-open {
    display: contents;
    border: 0;
    background: transparent;
  }

  .mode-button {
    min-width: max-content;
    min-height: 38px;
    padding: 7px 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .child-nav,
  .nav-group.is-open .child-nav {
    display: flex;
    gap: 5px;
    padding: 0;
  }

  .child-button {
    width: auto;
    min-width: max-content;
    min-height: 38px;
    padding: 7px 11px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .child-button::before {
    display: none;
  }

  .child-button:hover,
  .child-button.is-active {
    padding-left: 11px;
  }

  .main {
    width: 100%;
    margin-left: 0;
    padding: 26px 18px 52px;
  }

  .two-column,
  .dashboard-strip {
    grid-template-columns: 1fr;
  }

  .result-card {
    min-height: 320px;
  }

  .task-card.compact,
  .topbar {
    display: grid;
  }

  .status-pill {
    width: max-content;
  }
}

@media (max-width: 560px) {
  body {
    background-size: 22px 22px, 22px 22px, auto, auto;
  }

  .main {
    padding: 22px 13px 44px;
  }

  .topbar {
    gap: 14px;
  }

  .topbar h1 {
    font-size: 29px;
  }

  .dashboard-strip article {
    min-height: 104px;
  }

  .task-card,
  .result-card,
  .schedule-card {
    padding: 18px;
    border-radius: 12px;
  }

  .task-card.compact {
    align-items: stretch;
  }

  .task-card.compact .fit {
    width: 100%;
  }

  .schedule-item {
    grid-template-columns: 1fr;
  }

  .schedule-actions {
    justify-content: flex-start;
  }

  .list-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
