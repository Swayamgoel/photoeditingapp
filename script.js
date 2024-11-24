const image = document.getElementById('image');
const fileInput = document.getElementById('file-input');
const filterSlider = document.getElementById('filter-slider');
const saveImageButton = document.getElementById('save-image');
let filters = {
    brightness: 100,
    saturation: 100,
    inversion: 0,
    grayscale: 0,
};
let rotate = 0;
let flipH = 1;
let flipV = 1;

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

function applyFilters() {
    image.style.filter = `brightness(${filters.brightness}%) saturate(${filters.saturation}%) invert(${filters.inversion}%) grayscale(${filters.grayscale}%)`;
    image.style.transform = `rotate(${rotate}deg) scaleX(${flipH}) scaleY(${flipV})`;
}

document.getElementById('brightness').addEventListener('click', () => {
    filterSlider.value = filters.brightness;
    filterSlider.oninput = () => {
        filters.brightness = filterSlider.value;
        applyFilters();
    };
});

document.getElementById('saturation').addEventListener('click', () => {
    filterSlider.value = filters.saturation;
    filterSlider.oninput = () => {
        filters.saturation = filterSlider.value;
        applyFilters();
    };
});

document.getElementById('inversion').addEventListener('click', () => {
    filterSlider.value = filters.inversion;
    filterSlider.oninput = () => {
        filters.inversion = filterSlider.value;
        applyFilters();
    };
});

document.getElementById('grayscale').addEventListener('click', () => {
    filterSlider.value = filters.grayscale;
    filterSlider.oninput = () => {
        filters.grayscale = filterSlider.value;
        applyFilters();
    };
});

document.getElementById('rotate-left').addEventListener('click', () => {
    rotate -= 90;
    applyFilters();
});

document.getElementById('rotate-right').addEventListener('click', () => {
    rotate += 90;
    applyFilters();
});

document.getElementById('flip-horizontal').addEventListener('click', () => {
    flipH *= -1;
    applyFilters();
});

document.getElementById('flip-vertical').addEventListener('click', () => {
    flipV *= -1;
    applyFilters();
});

document.getElementById('reset-filters').addEventListener('click', () => {
    filters = { brightness: 100, saturation: 100, inversion: 0, grayscale: 0 };
    rotate = 0;
    flipH = 1;
    flipV = 1;
    applyFilters();
});

saveImageButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.filter = `brightness(${filters.brightness}%) saturate(${filters.saturation}%) invert(${filters.inversion}%) grayscale(${filters.grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(flipH, flipV);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
