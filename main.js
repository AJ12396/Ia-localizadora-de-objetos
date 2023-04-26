var objectName
var status = ""
var objects = []

function setup() {
    canvas = createCanvas(380,380)
    canvas.center()
    camera = createCapture(VIDEO)
    camera.hide()
    camera.size(380,380)
}

function modelLoaded() {
    console.log("O modelo foi carregado corretamente!")
    status = true
    objectToDetector.detect(camera, gotResults)
}

function start() {
    objectToDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detectando objetos"
    objectName = document.getElementById("objectName").value
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
    
}

function draw() {
    image(camera, 0, 0, 380, 380)
    if (status != "") {
        objectToDetector.detect(camera, gotResults)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: detectando objetos"
            fill("red")
            percent = Math.floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if (objects[i].label == objectName) {
                document.getElementById("numberOfObjects").innerHTML = objectName + " encontrado!" 
                video.stop()
            } else {
                document.getElementById("numberOfObjects").innerHTML =  objectName + " não encontrado!" 
            }
        }
    }
}

