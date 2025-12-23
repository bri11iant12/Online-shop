export function initTooltips() {
  if (typeof tippy === 'undefined') {
    console.warn('Tippy.js не загружен');
    return;
  }
  
  const tooltipButtons = document.querySelectorAll('.tooltip-trigger');
  
  tooltipButtons.forEach(button => {
    const contentEl = button.closest('.tooltip')?.querySelector('.tooltip__content');
    if (contentEl) {
      const contentClone = contentEl.cloneNode(true);
      
      tippy(button, {
        content: contentClone,
        allowHTML: false,
        interactive: true,
        theme: 'light',
      });
    }
  });
}
