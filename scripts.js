// Add sticky header when scrolling down
/*
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const placeholder = document.createElement("div");
    placeholder.style.height = `${header.offsetHeight}px`;
    placeholder.style.display = "none";
    header.parentNode.insertBefore(placeholder, header); // Place it before header

    const stickyThreshold = 60;

    window.addEventListener("scroll", () => {
        if (window.scrollY > stickyThreshold) {
            header.classList.add("sticky");
            placeholder.style.display = "block";
        } else {
            header.classList.remove("sticky");
            placeholder.style.display = "none";
        }
    });
});
*/

// Project page link highlight

document.addEventListener("DOMContentLoaded", function () {
    // Get the current page URL path
    const currentPage = window.location.pathname;

    // Reference the navigation links by ID
    const workLink = document.getElementById("work-link");
    const aboutLink = document.getElementById("about-link");
    const contactLink = document.getElementById("contact-link");

    // Check if current page is under 'Work' section
    if (currentPage.includes("/work/")) {
        workLink.classList.add("active");
    } else if (currentPage.includes("/about.html")) {
        aboutLink.classList.add("active");
    } else if (currentPage.includes("/contact.html")) {
        contactLink.classList.add("active");
    }
});

// Carousel

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    let scrollSpeed = 0.5; // Adjust speed as needed (higher = faster)

    function startInfiniteScroll() {
        // Clone the track contents to create seamless looping
        const trackContent = track.innerHTML;
        track.innerHTML += trackContent;

        let scrollAmount = 0;

        function scrollLoop() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= track.scrollWidth / 2) {
                scrollAmount = 0; // Reset without snapping
            }
            track.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scrollLoop);
        }

        scrollLoop();
    }

    startInfiniteScroll();
});

// Video playback

document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumbnail => {
        const videos = thumbnail.querySelectorAll(".mockup-video");

        thumbnail.addEventListener("mouseenter", () => {
            videos.forEach(video => {
                video.currentTime = 0;  // Start from the beginning
                video.play();           // Play the video
                video.onended = () => {
                    video.currentTime = video.duration;  // Stop on the last frame
                };
            });
        });

        thumbnail.addEventListener("mouseleave", () => {
            videos.forEach(video => {
                video.pause();           // Pause the video
                video.currentTime = 0;    // Reset to start
            });
        });
    });
});

// Slider

document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".vertical-carousel-track");

    columns.forEach(column => {
        setupInfiniteScroll(column, getScrollSpeed(column)); // Start scrolling
    });

    // Function to determine the scroll speed based on column class
    function getScrollSpeed(column) {
        if (column.classList.contains("column-1")) return 0.7; // Slow scroll
        if (column.classList.contains("column-2")) return 1;   // Medium scroll
        if (column.classList.contains("column-3")) return 0.5; // Fast scroll
        return 1; // Default speed
    }

    function setupInfiniteScroll(column, speed) {
        const content = column.innerHTML;
        column.innerHTML += content; // Duplicate content once

        let scrollPosition = 0;
        const totalHeight = column.scrollHeight / 2; // Half content height

        function scroll() {
            scrollPosition += speed;
            column.style.transform = `translateY(-${scrollPosition}px)`;

            // If scrolled past one full loop, reset invisibly
            if (scrollPosition >= totalHeight) {
                scrollPosition = 0; // Reset back to start
                column.style.transform = `translateY(0)`;
            }

            requestAnimationFrame(scroll);
        }

        scroll(); // Start the loop
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0; // Index of the current slide
    const slideDuration = 3000; // 3 seconds per slide
    const fadeDuration = 500; // 0.5 seconds fade duration

    // Initialize the slides with proper styles
    function initializeSlides() {
        slides.forEach((slide, index) => {
            slide.style.position = "absolute";
            slide.style.top = 0;
            slide.style.left = 0;
            slide.style.width = "100%";
            slide.style.height = "100%";
            slide.style.opacity = index === 0 ? 1 : 0; // Show the first slide
            slide.style.zIndex = index === 0 ? 1 : 0; // Keep the first slide on top
            slide.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
        });
    }

    // Function to fade to the next slide
    function fadeToNextSlide() {
        const previousSlide = currentSlide;
        currentSlide = (currentSlide + 1) % slides.length; // Move to the next slide

        slides[previousSlide].style.opacity = 0; // Fade out the previous slide
        slides[previousSlide].style.zIndex = 0; // Move it to the back

        slides[currentSlide].style.opacity = 1; // Fade in the current slide
        slides[currentSlide].style.zIndex = 1; // Bring it to the front
    }

    // Start the slider
    function startSlider() {
        initializeSlides(); // Set up initial styles
        setInterval(fadeToNextSlide, slideDuration); // Cycle through slides
    }

    startSlider(); // Initialize and start the slider
});

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".animated");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let delay = entry.target.dataset.delay || 0; // Use delay from HTML, default to 0ms

                if (entry.target.classList.contains("slide-up")) {
                    entry.target.style.animation = `slideInUp 1s cubic-bezier(.06,.47,.08,.99) ${delay}ms forwards`;
                } else if (entry.target.classList.contains("slide-left")) {
                    entry.target.style.animation = `slideInLeft 1s cubic-bezier(.06,.47,.08,.99) ${delay}ms forwards`;
                } else if (entry.target.classList.contains("slide-right")) {
                    entry.target.style.animation = `slideInRight 1s cubic-bezier(.06,.47,.08,.99) ${delay}ms forwards`;
                }

                observer.unobserve(entry.target); // Prevent re-triggering animation
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(element => observer.observe(element));
});

function watchForHover() {
    let lastTouchTime = 0
  
    function enableHover() {
      if (new Date() - lastTouchTime < 500) return
      document.body.classList.add('hasHover')
    }
  
    function disableHover() {
      document.body.classList.remove('hasHover')
    }
  
    function updateLastTouchTime() {
      lastTouchTime = new Date()
    }
  
    document.addEventListener('touchstart', updateLastTouchTime, true)
    document.addEventListener('touchstart', disableHover, true)
    document.addEventListener('mousemove', enableHover, true)
  
    enableHover()
  }
  
  watchForHover()


document.addEventListener("DOMContentLoaded", () => {
	const faqItems = document.querySelectorAll(".faq-item");

	faqItems.forEach(item => {
		const button = item.querySelector(".faq-question");

		button.addEventListener("click", () => {
			item.classList.toggle("active");
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('.track-appstore').forEach(button => {
		button.addEventListener('click', function () {
			console.log('📦 App Store CTA clicked'); // <-- for testing
			gtag('event', 'CTA_Click', {
				event_category: 'CTA',
				event_label: 'App Store Button'
			});
		});
	});
});


