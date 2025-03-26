const video = document.getElementById("camera")
const button = document.getElementById("capturar")
const buttonpb = document.getElementById("capturar-pb")
const canva = document.getElementById("foto")
const canva_pb = document.getElementById("foto-pb")
const btn_desativar = document.getElementById("desativar")
const btn_ativar = document.getElementById("ativar")
const btn_apagar = document.getElementById("apagar")
const fotosCapturadas = document.getElementById("fotos-capturadas")

let stream

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({video: true})
        video.srcObject = stream
    } catch (erro) {
        alert("Erro ao abrir a Câmera")
    }
}

function closeCamera() {
    video.srcObject.getTracks().forEach(track => track.stop())
    video.style.display = null
}

function capturarFoto(grayscale = false) {
    const novoCanvas = document.createElement('canvas')
    const contexto = novoCanvas.getContext('2d')

    novoCanvas.width = video.videoWidth
    novoCanvas.height = video.videoHeight

    contexto.drawImage(video, 0, 0, novoCanvas.width, novoCanvas.height)

    if (grayscale) {
        novoCanvas.style.filter = "grayscale(100%)"
    }

    novoCanvas.style.display = 'block'
    novoCanvas.style.width = '24%'
    novoCanvas.style.border = '2px solid black'
    novoCanvas.style.marginTop = '10px'
    novoCanvas.style.transform = 'scaleX(-1)'
    fotosCapturadas.prepend(novoCanvas)
}

function apagarFotos() {
    fotosCapturadas.innerHTML = ''
}

button.addEventListener('click', function() {
    capturarFoto(false)
})

buttonpb.addEventListener('click', function() {
    capturarFoto(true)
})

btn_ativar.addEventListener('click', function() {
    startCamera()
})

btn_desativar.addEventListener('click', function() {
    closeCamera()
})

btn_apagar.addEventListener('click', function() {
    apagarFotos()
})