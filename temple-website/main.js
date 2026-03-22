// main.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Glass Navbar Scroll Effect
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Countdown Timer (Next Festival)
    // Set a date for the next festival (April 5)
    let festivalYear = new Date().getFullYear();
    if (new Date() > new Date(festivalYear, 3, 5, 6, 0, 0, 0)) {
        festivalYear++;
    }
    const festivalDate = new Date(festivalYear, 3, 5, 6, 0, 0, 0); // April 5, 6 AM

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = festivalDate.getTime() - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<div class='time-box'><span>00</span></div><div class='time-box'><span>00</span></div><div class='time-box'><span>00</span></div><div class='time-box'><span>00</span></div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    // Update the count down every 1 second
    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // 4. Offerings Search/Filter functionality
    const searchInput = document.getElementById('vazhipaduSearch');
    const cards = document.querySelectorAll('.offering-card');

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const desc = card.querySelector('.desc').textContent.toLowerCase();
                
                if(title.includes(term) || desc.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
// Image Lightbox 
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
             // Extract url from background-image
             const bgImage = window.getComputedStyle(item).backgroundImage;
             // bgImage might look like: linear-gradient(...), url("images/...") 
             const urlRegex = /url\(["']?([^"']*)["']?\)/;
             const match = bgImage.match(urlRegex);
             
             if(match && match[1]) {
                 lightboxImg.src = match[1];
                 const spanText = item.querySelector('span') ? item.querySelector('span').innerText : '';
                 lightboxCaption.innerText = spanText !== '*' ? spanText : 'Gallery Image';
                 lightbox.style.display = 'block';
                 // Prevent scrolling on body
                 document.body.style.overflow = 'hidden'; 
             }
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
