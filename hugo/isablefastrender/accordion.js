class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('.component-summary');
    // Ensure the content div has the class "content"
    this.content = el.querySelector('.component-content');
    // Get the plus and minus icons
    this.plusIcon = this.summary.querySelector('.plus-icon');
    this.minusIcon = this.summary.querySelector('.minus-icon');

    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;

    this.summary.addEventListener('click', (e) => this.onClick(e));

    // Initial state of the icons
    if (this.el.open) {
      this.showMinus();
    } else {
      this.showPlus();
    }
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }

    // Toggle icons immediately on click
    if (this.el.open) { // If it's currently open (meaning it will shrink)
        this.showPlus();
    } else { // If it's currently closed (meaning it will expand)
        this.showMinus();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    // The end height for shrinking needs to account for the HR as well if it's dynamic
    // In our case, the HR is *inside* details but *before* content, so summary.offsetHeight should include it implicitly.
    const endHeight = `${this.summary.offsetHeight + 2 + 2}px`; // summary height + 2px margin top + 2px margin bottom from HR

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 400,
        easing: 'ease-out'
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height: summary height + HR height/margins + content height
    const endHeight = `${this.summary.offsetHeight + 2 + 2 + this.content.offsetHeight}px`; // Add HR margins back

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 400,
        easing: 'ease-out'
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }

  // Helper methods to toggle icons
  showPlus() {
    if (this.plusIcon) this.plusIcon.style.opacity = '1';
    if (this.minusIcon) this.minusIcon.style.opacity = '0';
  }

  showMinus() {
    if (this.plusIcon) this.plusIcon.style.opacity = '0';
    if (this.minusIcon) this.minusIcon.style.opacity = '1';
  }
}

// Initialize all accordions on the page
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.component-details').forEach((el) => {
    new Accordion(el);
  });
});
