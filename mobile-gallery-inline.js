(function() {
    // Inline Lightbox für mobile Gallery (WhatsApp iOS/Android Support)
    function initInlineLightbox() {
        const heroImg = document.querySelector('.hero__photo');
        if (!heroImg) return;

        heroImg.addEventListener('click', function(e) {
            e.stopPropagation();
            var lightbox = document.createElement("div");
            lightbox.id = "lightbox-overlay-mobile";
            lightbox.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0s linear;";

            var imgSrc = heroImg.src.replace(/\.jpg$/i, '.png');
            lightbox.innerHTML = "<img src='" + imgSrc + "' alt='Vorschau senden' style='max-width:100%;max-height:85vh;'>";

            document.body.appendChild(lightbox);

            var infoOverlay = document.createElement("div");
            infoOverlay.id = "lightbox-info-overlay-mobile";
            infoOverlay.style.cssText = "position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);background:#c5a059;color:white;padding:0.75rem 1.5rem;border-radius:0.5rem;font-family:'Cormorant Garamond',serif;text-align:center;max-width:90%;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
            infoOverlay.innerHTML = "<strong>[Streicharbeit Vorschau]</strong><br><a href='https://wa.me/?text=Schauen%20Sie%20sich%20die%20Malerarbeit%20an' style='color:inherit;text-decoration:none;'>Auf WhatsApp teilen</a>";
            document.body.appendChild(infoOverlay);

            // Lightbox anzeigen
            setTimeout(function() { lightbox.style.opacity = "1"; lightbox.style.transition = "opacity 0.3s ease"; }, 50);

            // Entfernen beim Klick außerhalb des Bildes
            lightbox.addEventListener('click', function(ev) {
                var target = ev.target;
                if (target.id !== "lightbox-overlay-mobile" && target.dataset.noClose !== "true") {
                    var overlay = document.getElementById("lightbox-overlay-mobile");
                    if (overlay) overlay.style.opacity = "0";
                    setTimeout(function() { 
                        if (overlay) overlay.remove(); 
                        if (infoOverlay) infoOverlay.remove(); 
                    }, 300);
                }
            });

            // Esc ausblenden
            window.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    var overlay = document.getElementById("lightbox-overlay-mobile");
                    if (overlay) overlay.style.opacity = "0";
                    setTimeout(function() { 
                        if (overlay) overlay.remove(); 
                        if (infoOverlay) infoOverlay.remove(); 
                    }, 300);
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initInlineLightbox);
})();