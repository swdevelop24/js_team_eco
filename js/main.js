const apiKey = '';
const API_URL = `https://developer.nps.gov/api/v1/parks?limit=10&api_key=${apiKey}`;

let imageUrls = [];
let currentIndex = 0;

document.body.style.background = "#27472A"; 
document.body.style.transition = "background 1.5s ease-in-out"; 

async function fetchParkImages() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        //  이미지가 있는 공원만 필터링하여 리스트에 추가
        imageUrls = data.data
            .flatMap(park => park.images.map(img => img.url))
            .filter(url => url);
        if (imageUrls.length > 0) {
            preloadImages(imageUrls);
            fadeToImage();
            setInterval(fadeToImage, 2500); 
        }
    } catch (error) {
        console.error("Error fetching park images:", error);
    }
}

function fadeToImage() {
    if (imageUrls.length > 0) {
        document.body.style.transition = "background-image 1s ease-in-out, background-color 1s ease-in-out";
        document.body.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
        document.body.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundColor = "transparent"; // 초록색 제거
        currentIndex = (currentIndex + 1) % imageUrls.length;
    }
}

function preloadImages(urls) {
    const promises = urls.map(url => {
        const img = new Image();
        img.src = url; // 이미지를 미리 로드
        return new Promise(resolve => {
            img.onload = resolve; 
        });
    });
    return Promise.all(promises); 
}

function updateBackground() {
    if (imageUrls.length > 0) {
        // 배경색은 그대로 두고, 배경 이미지만 자연스럽게 변경
        document.body.style.transition = "background-image 1s ease-in-out";
        document.body.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
        
        currentIndex = (currentIndex + 1) % imageUrls.length;
    }
}

setTimeout(fetchParkImages, 2500); 

document.getElementById('findAnswerBtn').addEventListener('click', function() {
  window.location.href = '../pages/2_search.html'; 
});