const stream = require('stream')
const express = require('express')
const multer = require('multer')
const path = require('path')
const{google} = require('googleapis')

const uploadRouter = express.Router();
const upload = multer()

//const KEYFILEPATH = path.join(__dirname + "\\credentials.json")
const KEYFILEPATH = path.join(__dirname + "/credentials.json")

const SCOPES = ['https://www.googleapis.com/auth/drive']
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes:SCOPES
})

const uploadFile = async (fileObject)=>{
    const bufferStream = new stream.PassThrough()
    bufferStream.end(fileObject.buffer)
    console.log(KEYFILEPATH)
    
    const {data} = await google.drive({
        version:'v3',
        auth
    }).files.create({
        media:{
            mimeType:fileObject.mimeType,
            body : bufferStream,

        },
        requestBody:{
                name:fileObject.originalname,
                //id du dossier parent
                parents: ['1F5Sw4PAxUGvsLlvPJl1pqsabSJ0XLL-F'],
        },
        fields:"id,name",
    });
    
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data

}


uploadRouter.post('/upload',upload.any(),async (req,res)=>{
    try{
        
        const {body,files} = req
        datafile =[]
        console.log(files)
        for(let f = 0; f<files.length; f++){
            datafile.push(await uploadFile(files[f]))
        }
        console.log(body)


        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        res.status(200).send({'datafile':datafile})
    }
    catch(f){
        res.send(f.message)
    }
})

module.exports = uploadRouter
