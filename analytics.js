(() => {
  const measurementId = 'G-EYX6409C61';
  const productionHost = 'www.gideonsystems.com.br';
  if (location.hostname !== productionHost || window.__gideonAnalyticsLoaded) return;
  window.__gideonAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tag);

  const service = document.body.dataset.service || '';
  const page = location.pathname;
  const event = (name, params = {}) => window.gtag('event', name, {page, ...(service ? {service} : {}), ...params});
  const kind = document.body.dataset.pageKind;
  if (kind === 'service') event('service_view');
  if (kind === 'case') event('case_view');

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const ctaLocation = link.dataset.ctaLocation || (link.closest('header') ? 'header' : 'content');
    if (link.hasAttribute('data-quote')) event('quote_request', {cta_location:ctaLocation});
    if (link.hasAttribute('data-quote') || link.hasAttribute('data-cta')) event('cta_click', {cta_location:ctaLocation, link_text:link.textContent.trim().slice(0,80)});
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(link.href)) {
      event('whatsapp_click', {cta_location:ctaLocation});
      event('contact', {method:'whatsapp', cta_location:ctaLocation});
    }
  });

  // A site form can call this only after receiving a successful server response.
  window.gideonTrackSuccessfulForm = function (formId) {
    event('form_submit', {form_id:formId});
    event('generate_lead', {form_id:formId});
  };
  const startedForms = new WeakSet();
  document.addEventListener('focusin', e => {
    const form = e.target.closest('form');
    if (form && !startedForms.has(form)) {
      startedForms.add(form);
      event('form_start', {form_id:form.id || 'contact'});
    }
  });
})();
