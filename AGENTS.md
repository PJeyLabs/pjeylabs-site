<!-- FORGE_STUDIO_GLOBAL_START -->

## 1. Core Rules

* Inspect the relevant existing code before editing.
* Change only what is required for the current task. Do not remove, rewrite, or alter unrelated working behavior.
* Do not replace real functionality with placeholders, mocks, or simplified implementations.
* Fix the root cause where reasonably identifiable, not only the visible symptom.
* If something is unclear, make the safest reasonable assumption and mention it briefly in the final report.
* Do not hide errors, failed commands, warnings, or skipped steps.
* If an attempted change fails, investigate the cause instead of blindly reverting.
* Do not consider backward compatibility. Ignore legacy code / libraries
* Report only work actually completed. Claim tests or builds passed only when they were run and passed.

## 2. Language Rules

* Final reports to the user must be in Polish.
* Keep code, commands, file names, identifiers, package names, and technical comments in English.
* Follow the existing UI language, naming, branding, and labels unless the user requests a change.

## 3. Project Structure Rules

* Follow the existing project structure and architecture. Do not introduce duplicate systems or a new architecture unless required by the task.
* Extend existing controllers, services, widgets, helpers, and platform abstractions where practical.
* Keep changes limited to files and behavior required by the current task. Do not perform unrelated renaming, moving, deletion, formatting, or cleanup.
* Preserve existing public APIs, file names, class names, and project configuration unless changing them is required.
* Keep platform-specific logic in the existing platform-specific area.
* On Windows, do not assume Linux or WSL paths.
* Keep Android-specific Gradle, manifest, and native changes inside the Android area unless related Flutter or Dart changes are also required.

## 4. Versioning Rules

* Any project file change must increment the build number.
* Read the current version first and follow the project's existing version format.
* Increment only the build number unless the user explicitly requests another version change.
* Update every file where this project currently stores the version.
* Do not modify app, package, signing, payment, Firebase, AdMob, or store identifiers unless explicitly requested.
* Report the old and new version.

## 5. Build Rules

* Use the project's existing build system, Windows-native toolchains, configured paths, scripts, and output folders.
* Do not assume or use WSL unless the project explicitly requires it.
* Run only commands directly relevant to the task. Do not run full builds or broad test suites by default.
* Test an exact build command only when the task changes that command or its supporting script.
* Do not expand the task to fix unrelated environment or toolchain failures; report them briefly.
* Do not open external apps, terminals, windows, or additional application instances unless explicitly required.
* Do not replace embedded terminal or build behavior with external terminal behavior unless requested.

## 6. Testing, Git and Backup Rules

* Do not run analysis, tests, or builds by default. Run only checks directly relevant to the task or explicitly requested.
* Fix failures caused by your changes and briefly report unrelated existing failures.
* Do not overwrite or discard uncommitted user changes.
* Do not commit, push, create branches, or modify Git configuration unless requested.
* Do not delete or mass-rewrite files, user data, settings, databases, logs, keys, or configs unless explicitly requested.
* Never expose secrets or credentials.
* Do not run destructive commands unless explicitly requested.

## 7. UI Rules

* Preserve the existing visual style, theme, layout conventions, and working UI behavior unless the task requires changing them.
* Keep layouts usable across the project's supported window sizes and do not break dark theme styling.
* When an action does nothing or a widget has incorrect visibility, inspect the actual handler, widget, condition, and state flow instead of applying a cosmetic workaround.
* An embedded terminal must remain a real interactive terminal: clicking it must focus it, keyboard input must reach the running process, and common control keys should work where technically supported.
* Do not replace an embedded terminal with a fake terminal or external CMD unless explicitly requested.
* Keep AI Chat and terminal focus, keyboard handling, and state management separate.
* Verify UI changes in the actual widget tree and state flow. Leave final visual interaction testing to the user unless explicitly requested.

## 8. Final Reporting Rules

* The final report must be short, in Polish.
* Report only work actually completed.
* Include:

  * what changed
  * changed files
  * commands, tests, or builds actually run
  * remaining issues or failures
* If nothing was changed, state it clearly.
* If a check was skipped, failed, or could not be run, state the reason briefly.
* Do not paste long logs unless requested.

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
