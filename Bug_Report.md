# 🐛 BUG: Computer opponent overwrites player cell

## 📝 Description
On Hard difficulty when a player clicks a cell, computer may override his move. 

## 💻 Environment
- **URL:** Local / `file://.../index.html`
- **OS:** macOS Sonoma 14.4
- **Browser:** Chromium (Playwright headless/headed)
- **Version/Commit:** `v1.2.4-beta` / commit `a1b2c3d`

## 🔴 Severity
- **CRITICAL**

## 🕹️ Steps to Reproduce
1. Launch the Tic-Tac-Toe application.
2. Log into it and start a game
3. Click the center cell (Index 4) to place an `X`.
4. Wait for the computer turn routine to initiate.

## 🎯 Expected Behavior
Computer player cannot rewrite state of the cell

## ❌ Actual Behavior
The computer's marker overwrites the cell clicked by the player.
## 📸 Evidence & Logs

### Console Logs
```text
[GameEngine] Player placed X at index 4
[GameEngine] Computer calculating turn...
[GameEngine] Computer selected free cell index 4
[UI] Rendered O at index 4
[GameEngine] ERROR: Cell state corrupted. Current board: ['','','','','O','','','','']
```
---
# 🐛 BUG: Get Hint button may highlight cell that is already occupied

## 📝 Description
Pressing Get Hint button may highlight cell that is already occupied.

## 💻 Environment
- **URL:** Local / `file://.../index.html`
- **OS:** macOS Sonoma 14.4
- **Browser:** Chromium (Playwright headless/headed)
- **Version/Commit:** `v1.2.4-beta` / commit `a1b2c3d`

## 🔴 Severity
- **MAJOR**

## 🕹️ Steps to Reproduce
1. Launch the Tic-Tac-Toe application.
2. Log into it and start a game
3. Play a game for a while.
4. Press Get Hint button.

## 🎯 Expected Behavior
An empty cell is highlighted.

## ❌ Actual Behavior
A cell that is already occupied is highlighted.
## 📸 Evidence & Logs

### Console Logs
```text
[UI] Rendered Hint Highlight at index 2
[GameEngine] ERROR: Cell state corrupted. Current board: ['X','O','X','X','O','','O','X','X']
```
---

# 🐛 BUG: Display of messages on username change is inconsistent

## 📝 Description
During username change in Profile page, success/error messages are displayed in different ways. Error messages are shown as a popup while success message is displayed in a toast notification.

## 💻 Environment
- **URL:** Local / `file://.../index.html`
- **OS:** macOS Sonoma 14.4
- **Browser:** Chromium (Playwright headless/headed)
- **Version/Commit:** `v1.2.4-beta` / commit `a1b2c3d`

## 🔴 Severity
- **MINOR**

## 🕹️ Steps to Reproduce
1. Launch the Tic-Tac-Toe application.
2. Log into it and navigate to Profile page.
3. Change username.
4. Press Save Changes button.

## 🎯 Expected Behavior
All messages are displayed in a toast notification.

## ❌ Actual Behavior
Error messages are displayed as a popup while success message is displayed in a toast notification.

---

# 🐛 BUG/IMPROVEMENT: Start New Game and Reset buttons do the same

## 📝 Description
Start New Game and Reset buttons do the same. Both reset current game status and clear game board.

## 💻 Environment
- **URL:** Local / `file://.../index.html`
- **OS:** macOS Sonoma 14.4
- **Browser:** Chromium (Playwright headless/headed)
- **Version/Commit:** `v1.2.4-beta` / commit `a1b2c3d`

## 🔴 Severity
- **TRIVIAL/IMPROVEMENT**

## 🕹️ Steps to Reproduce
1. Launch the Tic-Tac-Toe application.
2. Log into it and start a game.
3. Play a bit.
4. Press Start New Game button.
5. Play a bit.
6. Press Reset button.

## 🎯 Expected Behavior
Start new game button saves current game as unfinished. Reset restarts game without making changes to history and stats.

## ❌ Actual Behavior
tart New Game and Reset buttons restarts game in the same way.

---


