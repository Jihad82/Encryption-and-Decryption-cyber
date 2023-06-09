const images = document.querySelectorAll('.gallery-item img');
const modal = document.querySelector('.modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');

images.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = image.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
