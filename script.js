document.addEventListener('DOMContentLoaded', function(){

    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.video-element');
    
    if (video && videoWrapper) {

        videoWrapper.classList.add('loading');
        
        video.addEventListener('loadeddata', function(){
            videoWrapper.classList.remove('loading');
        });
        
        video.addEventListener('error', function(){
            videoWrapper.classList.remove('loading');
            console.error('Video failed to load. Please check the source.');
        });
        
        if (video.readyState >= 2){
            videoWrapper.classList.remove('loading');
        }
    }

    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVH);
    setVH();
});