document.addEventListener('DOMContentLoaded', function() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.video-element');
    
    if (video && videoWrapper) {
        videoWrapper.classList.add('loading');
        
        video.addEventListener('loadeddata', function() {
            videoWrapper.classList.remove('loading');
        });
        
        video.addEventListener('error', function() {
            videoWrapper.classList.remove('loading');
            console.error('Video failed to load. Please check the source.');
        });
        
        if (video.readyState >= 2) {
            videoWrapper.classList.remove('loading');
        }
        
        video.addEventListener('fullscreenchange', handleFullscreenChange);
        video.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        video.addEventListener('mozfullscreenchange', handleFullscreenChange);
        video.addEventListener('MSFullscreenChange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            if (document.fullscreenElement || 
                document.webkitFullscreenElement || 
                document.mozFullScreenElement || 
                document.msFullscreenElement) {
                video.style.objectFit = 'contain';
            } else {
                video.style.objectFit = 'contain';
            }
        }
        
        window.addEventListener('resize', function() {
            if (document.fullscreenElement) {
                video.style.objectFit = 'contain';
            }
        });
    }

    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVH);
    setVH();
    
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (video) {
                video.style.display = 'none';
                video.offsetHeight;
                video.style.display = 'block';
            }
        }, 200);
    });
});