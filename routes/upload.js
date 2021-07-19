const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path'); //used to concate directories
const sharp = require("sharp"); //for image compression
const Image = require("../models/Image")
const helpers =  require('../bin/helpers')
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
        title: "Upload Page",
        message: "Please upload an image supported formats are PNG/JPEG up to 5MB."
    })
});

app.post("/", upload.single("image"), async (req, res, next) => {
    try {
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

        // Python request part

        // const http = require('http');

        // const postData = JSON.stringify({
        //     image: obj.img.data

        // });

        // const options = {
        //     hostname: '127.0.0.1',
        //     port: 3000,
        //     path: '/exportImg',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Content-Length': Buffer.byteLength(postData)
        //     }
        // };

        // const requset = http.request(options, (res) => {
        //     console.log(`STATUS: ${res.statusCode}`);
        //     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        //     res.setEncoding('utf8');
        //     res.on('data', (chunk) => {
        //         console.log(`BODY: ${chunk}`);
        //     });
        //     res.on('end', () => {
        //         console.log('No more data in response.');
        //     });
        // });

        // requset.on('error', (e) => {
        //     console.error(`problem with request: ${e.message}`);
        // });

        // // Write data to request body
        // requset.write(postData);
        // requset.end();

        //Upload "processed" image to model

        //Prepare image object
        const imageObj = {
            name: req.body.name,
            img: {
                data: fs.readFileSync(path.resolve(process.cwd(), req.file.destination, "resized", req.file.filename)),
                contentType: 'image/jpeg'
            },
            date: new Date()
        }
        
        //Insert object into model
        helpers.insertOne(Image,imageObj)

        res.status(200).render("upload", {
            title: "Upload Page",
            message: "Success! upload another..."
        });

    } catch (err) {
        console.log("Inside upload handler ", err.message)
        res.status(415).send({
            "Error": err.message
        })

    }
})



module.exports = app