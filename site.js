document.addEventListener('DOMContentLoaded', () => {
    // Mobiles Menü
    const toggle = document.getElementById('mobileNavToggle');
    const overlay = document.getElementById('mobileNavOverlay');
    const groupBtns = document.querySelectorAll('.group-btn');

    const setMenu = (open) => {
        if (!toggle || !overlay) return;
        toggle.classList.toggle('active', open);
        overlay.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
        document.body.classList.toggle('menu-open', open);
    };
    if (toggle && overlay) {
        toggle.addEventListener('click', () => setMenu(!overlay.classList.contains('active')));
        overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    }

    // Galerie-Dropdowns (Desktop + Mobil)
    const closeGroups = (except) => groupBtns.forEach(b => {
        if (b !== except) b.setAttribute('aria-expanded', 'false');
    });
    groupBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = btn.getAttribute('aria-expanded') !== 'true';
        closeGroups(btn);
        btn.setAttribute('aria-expanded', open);
    }));
    document.addEventListener('click', () => closeGroups());

    // Sticky-Button (nur wenn vorhanden): erscheint nach dem Hero
    const cta = document.getElementById('stickyCta');
    const hero = document.querySelector('.hero');
    if (cta && hero) {
        const onScroll = () => cta.classList.toggle('visible', window.scrollY > hero.offsetHeight * 0.6);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Lightbox (nur auf Galerie-Seiten)
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lbImg = lightbox.querySelector('img');
        document.querySelectorAll('.mosaic_item img').forEach(img => {
            img.addEventListener('click', () => { lbImg.src = img.src; lightbox.classList.add('active'); });
        });
        lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        closeGroups();
        setMenu(false);
        if (lightbox) lightbox.classList.remove('active');
    });
});
