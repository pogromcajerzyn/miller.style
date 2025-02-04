
function about_toggle() {

    const textToType = `Welcome to my creative hub!

    From a young age, my aspiration has consistently revolved around the pursuit of becoming a deviser. Despite evolving interests in collateral fields over the years, the core motivation has always remained constant: the innate desire to create.

    I'm passionate about sailing, engaging in DIY projects (in physics, electronics, and mechanics), exploring the art of cooking, practicing photography, teaming up with friends in video games like Destiny 2 and CS: GO, and weightlifting.

    Driven by curiosity, my background in physics and mechatronics is consistently guided by a dedicated commitment to the art of creation.`;

    handleClick();
    var para = document.getElementById("about_me");
    var myTextSpan = document.getElementById("my_text");

    if (!para.classList.contains("expanded_about_me")) {
        myTextSpan.textContent = "";
        var index = 0;

        typeSound = document.getElementById("key")
        typeSound.volume = 0.07;
        typeSound.currentTime = 0;

        function type() {
            typeSound.play();
            const currentText = textToType.slice(0, index + 1);
            myTextSpan.textContent = currentText;
            index++;

            if (index < textToType.length) {
                setTimeout(type, 5);
            }
        }
        type();
    }
    para.classList.toggle("expanded_about_me");
}


function more_toggle() {
    handleClick();
    var para = document.getElementById("more");
    para.classList.toggle("expanded_more");
}
