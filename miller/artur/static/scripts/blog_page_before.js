function handleClickBlog(clickedElement) {
    handleClick();

    var doc = document.documentElement.style

    var borders = 2* parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--small-edges'));
    var thumbnailWidth = clickedElement.clientWidth;

    doc.setProperty('--thumbnail-width-now', thumbnailWidth+borders+'px');
    doc.setProperty('--thumbnail-height-now', (thumbnailWidth/4)*3+borders+'px');

    var postSpaceWidth = document.getElementById('post_space').clientWidth;
    doc.setProperty('--post_space_width_now', postSpaceWidth + 'px');

    if (postSpaceWidth > thumbnailWidth + borders){

        doc.setProperty('--post-preview-predicted-height', (thumbnailWidth/4)*3+borders+'px');
        doc.setProperty('--content-offset-left', thumbnailWidth+'px');
        doc.setProperty('--content-offset-top', 0 + 'px');

    } else{
        doc.setProperty('--post-preview-predicted-height', (thumbnailWidth/2)*3+borders+'px');
        doc.setProperty('--content-offset-left', 0+'px');
        doc.setProperty('--content-offset-top', (thumbnailWidth/4)*3+'px');
    }

    clickedElement.classList.toggle('expanded_post_block');

    var childContainers = clickedElement.querySelectorAll('.thumbnail_wrapper');
    childContainers.forEach(function(childContainer) {
        childContainer.classList.toggle('expended_thumbnail_wrapper');
    });



    var containers = document.querySelectorAll('.post_block');
    containers.forEach(function(container) {
        if (container !== clickedElement) {
            container.classList.remove('expanded_post_block');

            var otherChildContainers = container.querySelectorAll('.thumbnail_wrapper');
            otherChildContainers.forEach(function(otherChildContainer) {
                otherChildContainer.classList.remove('expended_thumbnail_wrapper');
            });
        }
    });
}
