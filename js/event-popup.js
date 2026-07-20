(function () {
    /* Colloque International de Paléontologie — 21-22 juillet 2026 */
    var EVENT_START = new Date('2026-07-21T00:00:00');
    var EVENT_END = new Date('2026-07-22T23:59:59');

    var overlay = document.getElementById('event-popup-overlay');
    if (!overlay) return;

    function shouldShow() {
        var now = new Date();
        return now <= EVENT_END;
    }

    function badgeText() {
        var now = new Date();
        var startDay = new Date(EVENT_START.getFullYear(), EVENT_START.getMonth(), EVENT_START.getDate());
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var diffDays = Math.round((startDay - today) / 86400000);

        if (now >= EVENT_START && now <= EVENT_END) return 'Événement en cours';
        if (diffDays === 1) return 'C\'est demain !';
        if (diffDays === 0) return 'Aujourd\'hui';
        if (diffDays > 1) return 'Dans ' + diffDays + ' jours';
        return 'Événement à venir';
    }

    function openPopup() {
        var badge = document.getElementById('event-popup-badge');
        if (badge) badge.textContent = badgeText();

        overlay.classList.add('show');
        document.body.classList.add('event-popup-open');
        requestAnimationFrame(function () {
            overlay.classList.add('visible');
        });
    }

    function closePopup() {
        overlay.classList.remove('visible');
        document.body.classList.remove('event-popup-open');
        setTimeout(function () {
            overlay.classList.remove('show');
        }, 350);
    }

    overlay.querySelectorAll('[data-event-popup-close]').forEach(function (el) {
        el.addEventListener('click', closePopup);
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup();
    });

    if (shouldShow()) {
        window.addEventListener('load', function () {
            setTimeout(openPopup, 600);
        });
    }
})();
