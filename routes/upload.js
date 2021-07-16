const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path'); //used to concate directories
const sharp = require("sharp"); //for image compression
//setup for uploading image using multer

const multer = require('multer');
const MAX_FILE_SIZE = 1024 * 1024 * 5
//save image in uploads destination 
function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {

        cb(null, true)
    } else {
        console.log("File type: ", file.mimetype)
        cb(null, false, new Error('File type not supported or file size is larger than 5 MB '))
    }

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + new Date().toDateString() + '-' + file.fieldname + ".jpg")
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter: fileFilter
})


app.get('/', (req, res) => {
    res.render("upload", {
        title: "Upload Page"
    })
});

app.post("/", upload.single("image"), async (req, res, next) => {
    //console.log(path.resolve(req.file.destination,'resized',req.file.filename))
    await sharp(req.file.path)
        .resize({
            width: 224,
            height: 224,
            fit: sharp.fit.fill
        })
        .toFormat('jpeg')
        .jpeg({
            quality: 100,
            chromaSubsampling: '4:4:4',
            force: true
        })
        .toFile(
            path.resolve(req.file.destination, 'resized', req.file.filename)
        )
    fs.unlinkSync(req.file.path)
    //console.log(path.join(process.cwd() + req.file.destination + "resized" + req.file.filename))
    var obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(path.resolve(process.cwd(), req.file.destination, "resized", req.file.filename)),
            contentType: 'image/png'
        }
    }

})



module.exports = app