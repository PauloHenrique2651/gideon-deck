(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-panel');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        menuButton.focus();
      }
    });
  }
  document.querySelector('[data-language-switch]')?.addEventListener('change', event => {
    location.href = event.target.value;
  });

  const navigator = document.querySelector('[data-solution-navigator]');
  if (navigator) {
    const options = [...navigator.querySelectorAll('[data-navigator-option]')];
    const label = navigator.querySelector('[data-navigator-label]');
    const title = navigator.querySelector('[data-navigator-title]');
    const text = navigator.querySelector('[data-navigator-text]');
    const cta = navigator.querySelector('[data-navigator-cta]');
    const canvas = navigator.querySelector('[data-navigator-canvas]');
    const panel = navigator.querySelector('#navigator-panel');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = 0;

    const choose = index => {
      active = (index + options.length) % options.length;
      const option = options[active];
      options.forEach((item, itemIndex) => {
        const selected = itemIndex === active;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      label.textContent = option.dataset.label;
      title.textContent = option.dataset.title;
      text.textContent = option.dataset.text;
      cta.href = option.dataset.href;
      panel.setAttribute('aria-labelledby', option.id);
      navigator.dataset.active = String(active);
    };

    options.forEach((option, index) => {
      option.addEventListener('click', () => choose(index));
      option.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1);
        choose(next);
        options[active].focus();
      });
    });

    if (canvas) {
      const context = canvas.getContext('2d');
      let width = 0;
      let height = 0;
      let frame = 0;
      let pointer = { x: .5, y: .5 };
      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = Math.max(1, bounds.width);
        height = Math.max(1, bounds.height);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      };
      const draw = time => {
        const palette = [['#dce9f8', '#214c84', '#ffffff'], ['#e1e8f0', '#18345b', '#ffffff'], ['#e8edf4', '#002fa7', '#ffffff']][active];
        context.clearRect(0, 0, width, height);
        const cx = width * (.5 + (pointer.x - .5) * .06);
        const cy = height * (.5 + (pointer.y - .5) * .06);
        const radius = Math.min(width, height) * .35;
        const background = context.createRadialGradient(cx, cy, radius * .06, cx, cy, radius * 1.75);
        background.addColorStop(0, palette[2]);
        background.addColorStop(.42, palette[0]);
        background.addColorStop(1, '#f7f7f8');
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
        for (let ring = 0; ring < 3; ring++) {
          context.beginPath();
          context.strokeStyle = `${palette[1]}${ring === 0 ? '35' : '20'}`;
          context.lineWidth = 1;
          context.ellipse(cx, cy, radius * (1 + ring * .25), radius * (.48 + ring * .14), -0.48 + ring * .14, 0, Math.PI * 2);
          context.stroke();
        }
        const t = reducedMotion ? 0 : time * .00045;
        for (let dot = 0; dot < 18; dot++) {
          const angle = t * (dot % 2 ? 1 : -1) + dot * 1.37;
          const orbit = radius * (.65 + (dot % 4) * .16);
          const x = cx + Math.cos(angle) * orbit;
          const y = cy + Math.sin(angle) * orbit * .52;
          context.beginPath();
          context.fillStyle = dot % 5 === 0 ? palette[1] : '#ffffff';
          context.arc(x, y, dot % 5 === 0 ? 3 : 1.4, 0, Math.PI * 2);
          context.fill();
        }
        context.beginPath();
        context.strokeStyle = palette[1];
        context.lineWidth = 1.5;
        context.arc(cx, cy, radius * .42, 0, Math.PI * 2);
        context.stroke();
        if (!reducedMotion) frame = requestAnimationFrame(draw);
      };
      resize();
      draw(0);
      window.addEventListener('resize', () => {
        resize();
        if (frame) cancelAnimationFrame(frame);
        draw(performance.now());
      }, { passive: true });
      navigator.addEventListener('pointermove', event => {
        const bounds = navigator.getBoundingClientRect();
        pointer = { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height };
      }, { passive: true });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && frame) cancelAnimationFrame(frame);
        if (!document.hidden && !reducedMotion) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
      });
    }
  }
})();
