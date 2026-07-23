const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('a[href^="http"]').forEach((link) => {
  if (link.origin === window.location.origin) return;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    mobileMenu.classList.toggle('open', opening);
  });
}

function goToSection(id, focus = true) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  if (focus) target.focus({ preventScroll: true });
  closeMenu();
}

document.querySelectorAll('[data-scroll]').forEach((control) => {
  control.addEventListener('click', () => goToSection(control.dataset.scroll));
});

if (window.location.hash) {
  const legacyTarget = window.location.hash.slice(1);
  if (document.getElementById(legacyTarget)) {
    requestAnimationFrame(() => goToSection(legacyTarget, false));
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }
}

const buildPage = document.querySelector('.build-page');
const stageLabel = document.querySelector('[data-stage-label]');
const steps = [...document.querySelectorAll('.build-step')];
const persistentPage = document.querySelector('.hero-preview');
const buildSection = document.querySelector('.build');
const sourcesSection = document.querySelector('.sources');
const layerLabels = {
  security: 'Layer 01 surfaced',
  reliability: 'Layer 02 surfaced',
  subprocessors: 'Layer 03 surfaced',
  resources: 'Layer 04 surfaced',
  complete: 'Page complete'
};

if (buildPage && reduceMotion.matches) {
  buildPage.dataset.active = 'complete';
  if (stageLabel) stageLabel.textContent = layerLabels.complete;
}

let scrollFrame;
function updatePersistentPage() {
  scrollFrame = undefined;
  if (!persistentPage || !buildSection || !sourcesSection || window.innerWidth <= 850 || reduceMotion.matches) {
    persistentPage?.classList.remove('is-pinned');
    return;
  }
  const buildTop = buildSection.getBoundingClientRect().top;
  const buildBottom = buildSection.getBoundingClientRect().bottom;
  const sourcesTop = sourcesSection.getBoundingClientRect().top;
  const buildHasEntered = buildTop < window.innerHeight;
  const buildHasReachedFocus = buildTop <= window.innerHeight * .5;
  const pageShouldPin = buildHasEntered && buildBottom > 0 && sourcesTop > 0;
  const exitOffset = Math.min(0, sourcesTop - window.innerHeight);
  persistentPage.style.setProperty('--page-exit', `${exitOffset}px`);
  persistentPage.classList.toggle('is-pinned', pageShouldPin);
  if (!buildHasReachedFocus && buildPage) {
    buildPage.dataset.active = 'complete';
    if (stageLabel) stageLabel.textContent = 'Page complete';
  }
  if (buildHasReachedFocus && buildBottom > 0) {
    // Change the example when the incoming copy reaches the upper focus zone,
    // rather than waiting until it has passed the very top of the viewport.
    const marker = window.innerHeight * .22;
    const activeStep = steps.find((step) => {
      const rect = step.getBoundingClientRect();
      return rect.top <= marker && rect.bottom > marker;
    }) || steps.find((step) => step.getBoundingClientRect().bottom > 0);
    if (activeStep && buildPage) {
      const layer = activeStep.dataset.layer;
      buildPage.dataset.active = layer;
      if (stageLabel) stageLabel.textContent = layerLabels[layer];
    }
  }
}

function queuePersistentPageUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updatePersistentPage);
}

window.addEventListener('scroll', queuePersistentPageUpdate, { passive: true });
window.addEventListener('resize', queuePersistentPageUpdate);
updatePersistentPage();

const billingButtons = document.querySelectorAll('[data-billing-option]');
const price = document.querySelector('[data-price]');
const period = document.querySelector('[data-period]');
const billing = document.querySelector('[data-billing]');
const saving = document.querySelector('[data-saving]');

billingButtons.forEach((button) => button.addEventListener('click', () => {
  const annual = button.dataset.billingOption === 'annual';
  billingButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  price.textContent = annual ? '£290' : '£29';
  period.textContent = annual ? 'per year' : 'per month';
  billing.textContent = annual ? 'Billed annually. Two months free.' : 'Billed monthly. Cancel any time.';
  saving.hidden = !annual;
}));
