document.addEventListener('DOMContentLoaded', () => {
    const audioList = document.querySelectorAll('#playlist audio');
    const pauseButton = document.getElementById('pause-button');
    const pauseIcon = document.getElementById('pause-icon');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const progressBar = document.getElementById('progress-bar');
    const progressBarContainer = document.getElementById('progress-bar-container');
    let currentSongIndex = 0;
    let isPlaying = false;

    // Defina o volume inicial para 50%
    audioList[currentSongIndex].volume = 0.5;

    // Função para alternar entre os ícones de play e pause
    function togglePlayPauseIcon() {
        if (isPlaying) {
            pauseIcon.classList.remove('fa-play');
            pauseIcon.classList.add('fa-pause');
        } else {
            pauseIcon.classList.remove('fa-pause');
            pauseIcon.classList.add('fa-play');
        }
    }

    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        const currentTime = audioList[currentSongIndex].currentTime;
        const duration = audioList[currentSongIndex].duration;
        const progressPercentage = (currentTime / duration) * 100;
        progressBar.value = progressPercentage;
    }

    // Reproduza a primeira música automaticamente quando o evento 'canplay' for acionado
    audioList[currentSongIndex].addEventListener('canplay', () => {
        if (!isPlaying) {
            audioList[currentSongIndex].play();
            isPlaying = true;
            togglePlayPauseIcon();
        }
    });

    // Pausar a música quando o botão de pausa é clicado
    pauseButton.addEventListener('click', () => {
        if (isPlaying) {
            audioList[currentSongIndex].pause();
            isPlaying = false;
        } else {
            audioList[currentSongIndex].play();
            isPlaying = true;
        }
        togglePlayPauseIcon();
    });

    // Avançar para a próxima música
    nextButton.addEventListener('click', () => {
        audioList[currentSongIndex].pause();
        currentSongIndex = (currentSongIndex + 1) % audioList.length;
        audioList[currentSongIndex].currentTime = 0;
        audioList[currentSongIndex].play();
        isPlaying = true;
        togglePlayPauseIcon();
    });

    // Retroceder para a música anterior
    prevButton.addEventListener('click', () => {
        audioList[currentSongIndex].pause();
        currentSongIndex = (currentSongIndex - 1 + audioList.length) % audioList.length;
        audioList[currentSongIndex].currentTime = 0;
        audioList[currentSongIndex].play();
        isPlaying = true;
        togglePlayPauseIcon();
    });

    // Atualizar a posição da música com base no clique na barra de progresso
    progressBarContainer.addEventListener('click', (event) => {
        const clickX = event.clientX;
        const progressBarRect = progressBarContainer.getBoundingClientRect();
        const progressPercentage = ((clickX - progressBarRect.left) / progressBarRect.width) * 100;
        const duration = audioList[currentSongIndex].duration;
        const newPosition = (progressPercentage / 100) * duration;
        audioList[currentSongIndex].currentTime = newPosition;
        updateProgressBar();
    });

    // Adicione um ouvinte para cada áudio na lista de reprodução para atualizar a barra de progresso
    audioList.forEach((audio, index) => {
        audio.addEventListener('timeupdate', () => {
            updateProgressBar();
        });
    });
});
