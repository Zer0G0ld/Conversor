// Adicione o script ffmpeg.js no seu HTML para usar a biblioteca 
async function convertTo(format) {
    var videoUrl = document.getElementById("videoUrl").value;
    if (videoUrl) {
        // Iniciar o ffmpeg
        await createFFmpeg({ log: true }).then(async (ffmpeg) => {
            await ffmpeg.load();
            const response = await fetch(videoUrl);
            const videoBlob = await response.blob();
            ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoBlob));
            await ffmpeg.run('-i', 'input.mp4', `output.${format}`);
            const outputFile = ffmpeg.FS('readFile', `output.${format}`);
            const downloadUrl = URL.createObjectURL(new Blob([outputFile.buffer], { type: `video/${format}` }));
            document.getElementById("downloadLink").innerHTML = `<a href="${downloadUrl}" download>Download</a>`;
            ffmpeg.FS('unlink', 'input.mp4');
            ffmpeg.FS('unlink', `output.${format}`);
        });
    } else {
        alert("Por favor, insira um URL de vídeo do YouTube.");
    }
}

function downloadConvertedFile() {
    var downloadLinkElement = document.querySelector('#downloadLink a');
    if (downloadLinkElement) {
        downloadLinkElement.click();
    } else {
        alert("Nenhum arquivo convertido disponível para download.");
    }
}
