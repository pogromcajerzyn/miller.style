function updateFontScaler() {
    const container = document.getElementById('me_overlay');

    if (container) {
        const containerWidth = container.offsetWidth;
        const fontScaler = containerWidth * 0.004; // Adjust the multiplier as needed

        document.documentElement.style.setProperty('--font-scaler', fontScaler);
    }
}

document.addEventListener('DOMContentLoaded', updateFontScaler);
window.addEventListener('resize', updateFontScaler);


document.documentElement.style.setProperty('--max-width', "calc(" + document.getElementById('middle_column').offsetWidth + 'px - var(--main-borders))');
console.log(document.getElementById('middle_column').offsetWidth);