// Opens any link to a Youform form (app.youform.com/forms/<id>) as a pop-up on the same page,
// using Youform's embed snippet. Without JavaScript the link still opens the form normally.
(() => {
  const BASE = 'https://app.youform.com';
  const FORM = /^https:\/\/app\.youform\.com\/forms\/([A-Za-z0-9_-]+)\/?$/;
  let dlg;

  function build() {
    const style = document.createElement('style');
    style.textContent = `
      .yf-dialog { width: min(640px, 94vw); max-height: 92vh; padding: 0; border: 0; border-radius: 12px; background: #fff; overflow: hidden; }
      .yf-dialog::backdrop { background: rgba(0, 0, 0, .6); }
      .yf-body { height: min(760px, 88vh); overflow: auto; -webkit-overflow-scrolling: touch; }
      .yf-close { position: absolute; top: 6px; right: 8px; z-index: 1; width: 36px; height: 36px; border: 0; border-radius: 50%;
        background: rgba(0, 0, 0, .65); color: #fff; font: 22px/36px sans-serif; cursor: pointer; }
      .yf-close:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }`;
    document.head.append(style);
    dlg = document.createElement('dialog');
    dlg.className = 'yf-dialog';
    dlg.setAttribute('aria-label', 'Registration form');
    dlg.innerHTML = '<button class="yf-close" type="button" aria-label="Close form">×</button><div class="yf-body"></div>';
    dlg.querySelector('.yf-close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => { dlg.querySelector('.yf-body').replaceChildren(); });
    document.body.append(dlg);
  }

  function open(id) {
    if (!dlg) build();
    const body = dlg.querySelector('.yf-body');
    const box = document.createElement('div');
    box.setAttribute('data-youform-embed', '');
    box.setAttribute('data-form', id);
    box.setAttribute('data-base-url', BASE);
    box.setAttribute('data-width', '100%');
    box.setAttribute('data-height', '700');
    // The embed script looks for these divs when it runs, so add a fresh copy each time the form opens.
    const script = document.createElement('script');
    script.src = BASE + '/embed.js';
    script.async = true;
    body.replaceChildren(box, script);
    dlg.showModal();
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    const m = a && FORM.exec(a.href);
    if (!m || typeof HTMLDialogElement === 'undefined') return;
    e.preventDefault();
    open(m[1]);
  });
})();
