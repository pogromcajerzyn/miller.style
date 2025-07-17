document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            currentSectionIndex = index;
            sections[index].scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    window.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowDown':
                scrollToSection(currentSectionIndex + 1);
                break;
            case 'ArrowUp':
                scrollToSection(currentSectionIndex - 1);
                break;
            default:
                break;
        }
    });

    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(event) {
        touchEndY = event.changedTouches[0].screenY;
        handleGesture();
    });

    function handleGesture() {
        if (touchEndY < touchStartY) {
            scrollToSection(currentSectionIndex + 1);
        } else if (touchEndY > touchStartY) {
            scrollToSection(currentSectionIndex - 1);
        }
    }
});
