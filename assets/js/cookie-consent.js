(() => {
  "use strict";

  const STORAGE_KEY = "pjeylabs_cookie_consent";
  const CONSENT_VERSION = 1;
  const CONSENT_MAX_AGE = 365 * 24 * 60 * 60 * 1000;
  const CATEGORIES = ["functional", "analytics", "marketing"];
  let lastFocusedElement = null;

  function readConsent() {
    try {
      const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      const savedAt = Date.parse(value?.savedAt || "");
      if (
        value?.version !== CONSENT_VERSION ||
        !Number.isFinite(savedAt) ||
        Date.now() - savedAt > CONSENT_MAX_AGE
      ) {
        return null;
      }

      return {
        necessary: true,
        functional: value.functional === true,
        analytics: value.analytics === true,
        marketing: value.marketing === true,
        version: CONSENT_VERSION,
        savedAt: value.savedAt,
      };
    } catch {
      return null;
    }
  }

  function activateConsentedScripts(consent) {
    document.querySelectorAll('script[type="text/plain"][data-cookie-category]').forEach((blockedScript) => {
      const category = blockedScript.dataset.cookieCategory;
      if (!consent?.[category] || blockedScript.dataset.activated === "true") {
        return;
      }

      const script = document.createElement("script");
      [...blockedScript.attributes].forEach(({ name, value }) => {
        if (!["type", "data-cookie-category", "data-src", "data-activated"].includes(name)) {
          script.setAttribute(name, value);
        }
      });
      if (blockedScript.dataset.src) {
        script.src = blockedScript.dataset.src;
      } else {
        script.textContent = blockedScript.textContent;
      }
      blockedScript.dataset.activated = "true";
      blockedScript.after(script);
    });
  }

  function saveConsent(selections) {
    const previousConsent = readConsent();
    const consent = {
      necessary: true,
      functional: selections.functional === true,
      analytics: selections.analytics === true,
      marketing: selections.marketing === true,
      version: CONSENT_VERSION,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // The choice still applies for this page view if browser storage is unavailable.
    }

    activateConsentedScripts(consent);
    window.dispatchEvent(new CustomEvent("pjeylabs:consent-updated", { detail: consent }));
    const requiresReload = CATEGORIES.some(
      (category) => previousConsent?.[category] === true && consent[category] === false
    );
    return { consent, requiresReload };
  }

  function createButton(label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function makeCategory(id, title, description, necessary = false) {
    const wrapper = document.createElement("div");
    wrapper.className = "cookie-category";

    const copy = document.createElement("div");
    const heading = document.createElement("h3");
    heading.id = `cookie-category-${id}`;
    heading.textContent = title;
    const paragraph = document.createElement("p");
    paragraph.textContent = description;
    copy.append(heading, paragraph);

    if (necessary) {
      const status = document.createElement("span");
      status.className = "cookie-category-status";
      status.textContent = "Always active";
      status.setAttribute("aria-labelledby", heading.id);
      wrapper.append(copy, status);
    } else {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = `cookie-consent-${id}`;
      input.dataset.consentCategory = id;
      input.setAttribute("aria-labelledby", heading.id);
      wrapper.append(copy, input);
    }

    return wrapper;
  }

  function buildInterface() {
    const banner = document.createElement("section");
    banner.id = "cookie-consent-banner";
    banner.className = "cookie-consent-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-labelledby", "cookie-consent-title");
    banner.hidden = true;

    const title = document.createElement("h2");
    title.id = "cookie-consent-title";
    title.textContent = "Your privacy choices";
    const copy = document.createElement("p");
    copy.append("We use necessary storage to operate this site and remember your choice. Optional technologies are off unless you consent. Read our ");
    const policyLink = document.createElement("a");
    policyLink.href = "/cookie-policy/";
    policyLink.textContent = "Cookie Policy";
    copy.append(policyLink, ".");

    const actions = document.createElement("div");
    actions.className = "cookie-consent-actions";

    const backdrop = document.createElement("div");
    backdrop.className = "cookie-settings-backdrop";
    backdrop.hidden = true;

    const dialog = document.createElement("section");
    dialog.className = "cookie-settings-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "cookie-settings-title");

    const header = document.createElement("div");
    header.className = "cookie-settings-header";
    const headerCopy = document.createElement("div");
    const settingsTitle = document.createElement("h2");
    settingsTitle.id = "cookie-settings-title";
    settingsTitle.textContent = "Cookie Settings";
    const settingsIntro = document.createElement("p");
    settingsIntro.textContent = "Choose which optional categories this site may use. You can change or withdraw consent at any time.";
    headerCopy.append(settingsTitle, settingsIntro);

    function closeSettings() {
      backdrop.hidden = true;
      document.body.style.removeProperty("overflow");
      lastFocusedElement?.focus?.();
      lastFocusedElement = null;
    }

    const close = createButton("×", "cookie-settings-close", closeSettings);
    close.setAttribute("aria-label", "Close Cookie Settings");
    header.append(headerCopy, close);

    const categories = document.createElement("div");
    categories.append(
      makeCategory("necessary", "Necessary", "Required for core operation, security and remembering your privacy choice.", true),
      makeCategory("functional", "Functional", "Optional features that remember choices or provide enhanced functionality."),
      makeCategory("analytics", "Analytics", "Optional measurement that helps understand how the website is used."),
      makeCategory("marketing", "Marketing", "Optional advertising, conversion measurement or cross-site tracking.")
    );

    const settingsActions = document.createElement("div");
    settingsActions.className = "cookie-settings-actions";

    function setCheckboxes(consent) {
      CATEGORIES.forEach((category) => {
        const input = dialog.querySelector(`[data-consent-category="${category}"]`);
        if (input) input.checked = consent?.[category] === true;
      });
    }

    function hideBanner() {
      banner.hidden = true;
    }

    function applyChoice(selections) {
      const { consent, requiresReload } = saveConsent(selections);
      setCheckboxes(consent);
      hideBanner();
      closeSettings();
      if (requiresReload) {
        window.location.reload();
      }
    }

    function openSettings() {
      lastFocusedElement = document.activeElement;
      setCheckboxes(readConsent());
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
      close.focus();
    }

    const acceptAll = createButton("Accept All", "cookie-consent-button", () => {
      applyChoice({ functional: true, analytics: true, marketing: true });
    });
    const reject = createButton("Reject Non-Essential", "cookie-consent-button secondary", () => {
      applyChoice({ functional: false, analytics: false, marketing: false });
    });
    const settings = createButton("Cookie Settings", "cookie-consent-button secondary", openSettings);
    actions.append(acceptAll, reject, settings);
    banner.append(title, copy, actions);

    const saveSelected = createButton("Save Selected", "cookie-consent-button", () => {
      const selections = {};
      CATEGORIES.forEach((category) => {
        selections[category] = dialog.querySelector(`[data-consent-category="${category}"]`)?.checked === true;
      });
      applyChoice(selections);
    });
    const settingsReject = createButton("Reject Non-Essential", "cookie-consent-button secondary", () => {
      applyChoice({ functional: false, analytics: false, marketing: false });
    });
    const settingsAccept = createButton("Accept All", "cookie-consent-button secondary", () => {
      applyChoice({ functional: true, analytics: true, marketing: true });
    });
    settingsActions.append(saveSelected, settingsReject, settingsAccept);
    dialog.append(header, categories, settingsActions);
    backdrop.append(dialog);

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closeSettings();
    });
    document.addEventListener("keydown", (event) => {
      if (backdrop.hidden) return;
      if (event.key === "Escape") {
        closeSettings();
        return;
      }
      if (event.key === "Tab") {
        const focusable = [...dialog.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])')]
          .filter((element) => !element.disabled && element.getClientRects().length > 0);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-cookie-settings]");
      if (trigger) {
        event.preventDefault();
        openSettings();
      }
    });

    document.body.append(banner, backdrop);
    return { banner };
  }

  function initialise() {
    const { banner } = buildInterface();
    const consent = readConsent();
    if (consent) {
      activateConsentedScripts(consent);
    } else {
      banner.hidden = false;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();
