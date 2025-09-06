// --- Mobile Menu Toggle functionality ---
const menuToggle = document.getElementById("menuToggle");
const navControlsContainer = document.getElementById("navLinks"); // The element with id="navLinks"

if (menuToggle && navControlsContainer) {
    menuToggle.addEventListener('click', function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        navControlsContainer.classList.toggle("show"); // Toggles the mobile menu visibility
        this.classList.toggle("active"); // Toggles the hamburger icon animation
        this.setAttribute("aria-expanded", String(!isExpanded)); // Convert boolean to string for aria-expanded

        // Toggle no-scroll class on body to prevent background scrolling
        document.body.classList.toggle('no-scroll', !isExpanded);
    });
}

// --- Dropdown Menu Toggle functionality ---
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior for dropdown toggles
        e.stopPropagation(); // Stop propagation to prevent document click from closing immediately

        const parentDropdown = this.closest('.dropdown');
        const isActive = parentDropdown.classList.contains('show');

        // Close all other open dropdowns
        document.querySelectorAll('.dropdown.show').forEach(openDropdown => {
            if (openDropdown !== parentDropdown) {
                openDropdown.classList.remove('show');
                openDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle the clicked dropdown
        parentDropdown.classList.toggle('show', !isActive);
        this.setAttribute('aria-expanded', String(!isActive)); // Convert boolean to string
    });
});

// --- Close Dropdowns/Mobile Menu when clicking outside ---
document.addEventListener('click', e => {
    // Close dropdowns if click is outside any dropdown
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.show').forEach(drop => {
            drop.classList.remove('show');
            drop.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
    }

    // Close mobile menu if click is outside the menu and toggle button
    const isMobileMenuOpen = navControlsContainer && navControlsContainer.classList.contains('show');
    const clickedInsideMenu = navControlsContainer && navControlsContainer.contains(e.target);
    const clickedToggle = menuToggle && menuToggle.contains(e.target);

    if (isMobileMenuOpen && !clickedInsideMenu && !clickedToggle) {
        navControlsContainer.classList.remove('show');
        if (menuToggle) menuToggle.classList.remove('active'); // Ensure menuToggle exists before manipulating
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll'); // Re-enable scroll
    }
});

// --- Navigation Link Smooth Scroll with Offset (UPDATED) ---
document.querySelectorAll('.nav-links-list a').forEach(link => { // Target all links in the main nav list
    link.addEventListener('click', function (event) {
        // Do not close if it's a dropdown toggle (handled by its own logic)
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }

        const href = this.getAttribute('href');

        // Check if the link is an internal anchor link (starts with # and is not just '#')
        if (href && href.startsWith('#') && href.length > 1) {
            const targetId = href.substring(1); // Get the ID without the '#'
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault(); // Prevent default instant jump for smooth scroll

                // Get the height of your fixed header.
                const headerHeight = document.querySelector('.main-header').offsetHeight;

                // Calculate the target scroll position with a reduced offset.
                // Changed from +10 to +0. You can adjust this number (e.g., +5, +2)
                // if you want a tiny bit of space, or even a negative number if you
                // want the section to scroll slightly *under* the header.
                const offset = headerHeight + 0;

                const targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        }

        // Close mobile menu if currently open, regardless of link type (after potential scroll)
        const isMobileMenuOpen = navControlsContainer && navControlsContainer.classList.contains('show');
        if (isMobileMenuOpen) {
            navControlsContainer.classList.remove('show');
            if (menuToggle) menuToggle.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll'); // Re-enable scroll
        }
        // Close any open dropdowns
        document.querySelectorAll('.dropdown.show').forEach(drop => {
            drop.classList.remove('show');
            drop.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
    });
});


//banner
document.addEventListener('DOMContentLoaded', function() {
    // Get all the slides and navigation buttons
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Initialize the current slide index based on which slide has the 'active' class
    let currentSlide = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentSlide = index;
        }
    });

    // Function to show a specific slide
    function showSlide(index) {
        // Remove 'active' class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        // Add 'active' class to the specified slide
        slides[index].classList.add('active');
    }

    // Event listener for the "Next" button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Calculate the next slide index, looping back to 0 at the end
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Event listener for the "Previous" button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            // Calculate the previous slide index, looping to the end if at the start
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
});