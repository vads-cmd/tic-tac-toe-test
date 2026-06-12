# Test Plan: Tic-Tac-Toe Single Page Application (SPA)

## 1. Document Control & Approvals
| Version | Date       | Author                 | Description of Changes                         |
|:--------|:-----------|:-----------------------|:-----------------------------------------------|
| v1.0    | 2026-06-10 | QA Automation Engineer | Initial structure definition and layout setup. |

---

## 2. Introduction & Scope
### 2.1 Objective
The purpose of this document is to outline the testing strategy, environment requirements, and test scenarios for the Tic-Tac-Toe Single Page Application (SPA). This plan focuses on automated end-to-end (E2E) testing.

### 2.2 In Scope
* **Authentication & User Management:** Registration, secure login, validation logic, and session maintenance on the Single Page Application.
* **Game Mechanics:** Core turn-based logic, grid interactions, win/loss/draw detection, and game state resets.
* **Profile & Statistics:** Updates to user profile metrics, accuracy of historical statistics, and persistence across user sessions.

### 2.3 Out of Scope
* Multiplayer networking performance or load/stress testing.
* Cross-browser and cross-version testing (testing is focused on Chrome version 149.0.7827.55)
* Cross-device mobile-native layout optimizations (testing is focused on modern desktop web viewports).
* Third-party tracking or external analytics platforms.
* SQL, JS & other injections, security checks for application & data validation.
* Localisation tests. It is important for the project and these tests should be added ASAP.

---

## 3. Test Strategy & Automation Approach
### 3.1 Behavior-Driven Development (BDD)
* User stories may be translated into executable Cucumber `.feature` files written in Gherkin syntax.
* These files may serve as the living documentation and the base for automated execution.

### 3.2 Automation Framework Design
* **Front-End Interaction:** Playwright (TypeScript) will be utilized to handle application mounting, state manipulation, and UI assertions.
* **Reporting tool:** Test run results will be added as specific files using///.

### 3.3 Automatic code check tools
* Usage of **automatic code check tools** (aka lints) like SonarLint during code submitting to repository may improve code quality and result in less errors.
---

## 4. Test Environment & Tools
* **Applications Under Test (AUT):** Tic-Tac-Toe SPA (Staging / Local Test Environment)
* **Automation Stacks Supported:** Playwright (Typescript)
* **Target Browsers:** Chrome (Chromium-driven) version 149.0.7827.55

---

## 5. Test Suite Structure & Severity Definitions
Test cases are explicitly categorized into focused functional flows and assigned a severity level based on user impact:
* **Critical:** Failure prevents basic operations. Core application value is entirely blocked (e.g., unable to authenticate, game board unresponsive).
* **Major:** Core functionality is impaired or reporting false information, but a partial workaround exists (e.g., stats miscalculating, updates not saving securely).
* **Minor:** User experience or visual presentation anomalies that do not block processing paths (e.g., style alignments, missing focus indicators).

---

## 6. Test Cases Framework (Templates to Populate)

### Flow A: Authentication & Registration (Auth)

| Test Case ID    | Scenario / Description                           | Severity        | Automation? | Status  |
|:----------------|:-------------------------------------------------|:----------------|:------------|:--------|
| **TC-AUTH-001** | *Player registration for new user*               | *Critical*      | Yes         | Pending |
| **TC-AUTH-002** | *Player login for registered user*               | *Critical*      | Yes         | Pending |
| **TC-AUTH-003** | *Switching between Registration and Login modes* | *Critical*      | Yes         | Pending |
| **TC-AUTH-004** | *Player registration for existing user*          | *Critical*      | Yes         | Pending |
| **TC-AUTH-005** | *Player login for unregistered user*             | *Critical*      | Yes         | Pending |
| **TC-AUTH-006** | *Player registration with [blank] name*          | *Major*         | No          | Pending |
| **TC-AUTH-007** | *Player login with [blank] name*                 | *Major*         | No          | Pending |
| **TC-AUTH-008** | *Player registration with name 1 symbol long*    | *Major*         | No          | Pending |
| **TC-AUTH-009** | *Player login with name name 1 symbol long*      | *Major*         | No          | Pending |
| **TC-AUTH-010** | *Player registration with name 2 symbol long*    | *Major*         | No          | Pending |
| **TC-AUTH-011** | *Player login with name name 2 symbol long*      | *Major*         | No          | Pending |
| **TC-AUTH-012** | *Player registration with name 256 symbol long*  | *Major*         | No          | Pending |
| **TC-AUTH-013** | *Player login with name name 257 symbol long*    | *Major*         | No          | Pending |

### Flow B: Game Mechanics & Logic (Game)

| Test Case ID    | Scenario / Description                           | Severity   | Automation? | Status  |
|:----------------|:-------------------------------------------------|:-----------|:------------|:--------|
| **TC-GAME-001** | *Game win condition*                             | *Critical* | Yes         | Pending |
| **TC-GAME-002** | *Game loss condition*                            | *Critical* | Yes         | Pending |
| **TC-GAME-003** | *Tie game*                                       | *Critical* | Yes         | Pending |
| **TC-GAME-004** | *Changes of turn-state alteration in status bar* | *Major*    | No          | Pending |
| **TC-GAME-005** | *Cell overwrite prevention by player*            | *Critical* | Yes         | Pending |
| **TC-GAME-006** | *Cell overwrite prevention by computer*          | *Critical* | Yes         | Pending |
| **TC-GAME-007** | *Difficulty selection functionality*             | *Major*    | No          | Pending |
| **TC-GAME-008** | *Hint button functionality*                      | *Major*    | No          | Pending |
| **TC-GAME-009** | *Hint Deactivation*                              | *Major*    | No          | Pending |
| **TC-GAME-010** | *New game button functionality*                  | *Major*    | No          | Pending |
| **TC-GAME-011** | *Reset button functionality*                     | *Major*    | No          | Pending |

### Flow C: Profile & User Statistics (Data)

| Test Case ID    | Scenario / Description                         | Severity   | Automation? | Status  |
|:----------------|:-----------------------------------------------|:-----------|:------------|:--------|
| **TC-DATA-001** | *Update player name successfully*              | *Critical* | Yes         | Pending |
| **TC-DATA-002** | *Fail updating player name with 1 symbol name* | *Critical* | Yes         | Pending |
| **TC-DATA-003** | *Fail updating player name with [blank] name*  | *Critical* | Yes         | Pending |
| **TC-DATA-004** | *Real-time stat tracking (win/loss/draw)*      | *Critical* | Yes         | Pending |
| **TC-DATA-005** | *Profile data persistence on logout*           | *Critical* | Yes         | Pending |
| **TC-DATA-006** | *User creation data display*                   | *Minor*    | No          | Pending |
| **TC-DATA-007** | *History log verification*                     | *Major*    | No          | Pending |
| **TC-DATA-008** | *History chronological order*                  | *Minor*    | No          | Pending |
| **TC-DATA-009** | *Clear history button functionality*           | *Major*    | No          | Pending |

### Flow D: UI/UX & shared elements

| Test Case ID  | Scenario / Description                               | Severity   | Automation? | Status  |
|:--------------|:-----------------------------------------------------|:-----------|:------------|:--------|
| **TC-UI-001** | *User info display*                                  | *Major*    | No          | Pending |
| **TC-UI-002** | *Navigation: play button functionality*              | *Critical* | Yes         | Pending |
| **TC-UI-003** | *Navigation: profile button functionality*           | *Critical* | Yes         | Pending |
| **TC-UI-004** | *Navigation: history button functionality*           | *Critical* | Yes         | Pending |
| **TC-UI-005** | *Logout button functionality*                        | *Critical* | Yes         | Pending |
| **TC-UI-006** | *SPA name display*                                   | *Minor*    | No          | Pending |
| **TC-UI-007** | *SPA subcaption display*                             | *Minor*    | No          | Pending |
| **TC-UI-008** | *Language dropdown functionality*                    | *Major*    | No          | Pending |
| **TC-UI-009** | *Dark/Light mode button functionality without login* | *Minor*    | No          | Pending |
| **TC-UI-010** | *Dark/Light mode button functionality with login*    | *Minor*    | No          | Pending |
---

## 7. Execution & Exit Criteria
### 7.1 Entry Criteria
1. The SPA test build is fully deployed to the staging environment. Index.html file is included into project
2. (Optional) Cucumber `.feature` files are reviewed and accepted by stakeholders.

### 7.2 Exit Criteria
1. 100% of all **Critical** and **Major** designated tests execute with a "Pass" status.
2. Automation scripts are fully checked into the code repository.