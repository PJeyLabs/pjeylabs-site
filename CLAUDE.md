<!-- FORGE_STUDIO_GLOBAL_START -->

## 1. Core Rules

* Inspect only the code needed for the current task. When the task lists files, open only those. Do not grep or scan the repository, and never read .pj_forge/logs/ or .pj_forge/debug_logs/.
* Do not re-read a file you already read in this task. Do not re-run a check that already passed.
* Do not delegate to exploration subagents; read files directly.
* If a fix or a check does not succeed after two attempts, stop and report the blocker instead of iterating further. Do not add debug prints to production code to diagnose; if diagnosis is needed, describe what you would check and report it.
* Change only what the current task requires. Do not remove, rewrite, or alter unrelated working behavior. No unrelated renaming, moving, formatting, or cleanup.
* Do not add improvements, refactors, tests, or files the task did not ask for. If you notice something worth changing, mention it in one line in the report instead of doing it.
* Do not replace real functionality with placeholders, mocks, or simplified implementations.
* Fix the root cause where reasonably identifiable, not only the visible symptom.
* If something is unclear, make the safest reasonable assumption and mention it briefly in the final report.
* Do not hide errors, failed commands, warnings, or skipped steps. If a change fails, investigate instead of blindly reverting.
* Do not consider backward compatibility. Ignore legacy code and libraries.
* Report only work actually completed. Claim tests or builds passed only when they were run and passed.

## 2. Language Rules

* Final reports to the user must be in Polish. Keep code, commands, file names, identifiers, and technical comments in English. Follow the existing UI language and labels unless asked otherwise.

## 3. Project Structure Rules

* Follow the existing structure and architecture; extend existing controllers, services, widgets, and platform abstractions instead of adding parallel systems.
* Preserve existing public APIs, file names, class names, and configuration unless the task requires changing them.
* Keep platform-specific logic in its existing platform area. On Windows, do not assume Linux or WSL paths.

## 4. Versioning Rules

* Any project file change increments the build number. The version is stored ONLY in pubspec.yaml — do not search for or edit version strings anywhere else. Report old and new version.
* Do not modify app, package, signing, payment, Firebase, AdMob, or store identifiers unless explicitly requested.

## 5. Build & Test Rules

* Do not run analysis, tests, or builds by default. Run only checks directly relevant to the task or explicitly requested; prefer single test files over suites.
* Run at most the checks named in the task. Do not add extra verification passes.
* For UI/widget changes prefer cheap smoke tests (renders, tappable) over geometry assertions.
* Use the project's existing build system and Windows-native toolchains. Do not expand the task to fix unrelated environment failures; report them briefly.
* Do not open external apps, terminals, or windows unless explicitly required.

## 6. Git and Safety Rules

* Do not commit, push, create branches, or modify Git configuration unless requested.
* Do not overwrite uncommitted user changes. Do not delete or mass-rewrite files, settings, databases, logs, keys, or configs unless explicitly requested. Never expose secrets.

## 7. UI Rules

* Preserve the existing visual style, theme, and working UI behavior unless the task requires changing them. Do not break dark theme styling.
* When an action does nothing or visibility is wrong, inspect the actual handler, widget, and state flow instead of applying a cosmetic workaround. Leave final visual verification to the user unless requested.
* An embedded terminal must remain a real interactive terminal; do not replace it with a fake or external one. Keep AI Chat and terminal focus/keyboard handling separate.

## 8. Final Reporting Rules

* The final report is short, in Polish: what changed, changed files, commands actually run, remaining issues. If nothing changed or a check was skipped, say so. No long logs unless requested.

Raport końcowy musi używać:

START:
Poczatek Raportu.

FORMAT:
Zmienione:

Pliki:

Sprawdzone:

Uwagi:

END:
Koniec Raportu.

<!-- FORGE_STUDIO_GLOBAL_END -->
