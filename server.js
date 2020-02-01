var app = require('express')(); //Express lets node connect to the web
var http = require('http').createServer(app); //Create an HTTP connection
var io = require('socket.io')(http); //Require socket, lets websockets communicate between server and client 
var fs = require('fs'); //File system
var siofu = require('socketio-file-upload'); 
const crypto = require('crypto');

app.use(siofu.router); //Set up SocketIO File Upload
const algorithm = 'aes-256-ctr'; //Set crypto encryption algorithm
let publicKey = 'whenurpizzarollsaredone'; //Default encryption key
publicKey = crypto.createHash('sha256').update(publicKey).digest('base64').substr(0,32); //Turn it into the key
const ivLength = 16; //Initialization vector length


app.get('/', function(req,res){ //When user first goes to the home page,
    res.sendFile(__dirname + '/index.html'); //Send them to the index.
});

app.get('/download', function(req,res){ //Lets users download the files.
    var downloadId = req.param('id'); //Chooses which fileid to download from
    const folder = __dirname + '/download/' + downloadId + '/'; //Checks for the folder for the fileid
    fs.readdirSync(folder).forEach(file => { //For each file in that folder
        console.log('Downloading ' + file); //Say it's being downloaded
        const iv = Buffer.alloc(ivLength, 0);; //Create initialization vector
        var cipher = crypto.createDecipheriv(algorithm, publicKey, iv); //Create decipher for the file
        var input = fs.createReadStream(folder + file); //Take the encrypted file
        var output = fs.createWriteStream(folder + file.slice(0, -4)); //Remove .enc from the name
        input.pipe(cipher).pipe(output); //Decrypt the file
        output.on('finish', function(){ //When the decryption is complete
            res.download(folder + file.slice(0, -4), req.param('file'), function(err){
                fs.unlinkSync(folder + file.slice(0, -4)); //Delete the unencrypted file when done
            }); //Prompt the user to download the unencrypted file.
        });
    });
});

io.sockets.on('connection', function(socket){ //When the user performs an event with Socket.io (opening page, clicking button)
    var uploader = new siofu();
    uploader.dir = __dirname + '/' + 'download/12345'; //File upload path
    uploader.listen(socket); //Listen for the user to submit the file
    uploader.on('complete', function(event){ //When the user clicks the submit button
        console.log('file uploading');
        if(event.file.success){ //If the file is successfully uploaded
            console.log(event.file.name); //Print file name
            const iv = Buffer.alloc(ivLength, 0); //Create initialization vector
            const cipher = crypto.createCipheriv(algorithm, publicKey, iv); //Create cipher using algorithm, publickey, and iv
            var input = fs.createReadStream(uploader.dir + '/' + event.file.name) //read the original file
            var output = fs.createWriteStream(uploader.dir + '/' + event.file.name + '.enc'); //create location for encrypted file
            input.pipe(cipher).pipe(output); //encrypt the file

            output.on('finish', function(){ //when the encryption is completed
                fs.unlinkSync(uploader.dir + '/' + event.file.name); //delete the unencrypted file
                console.log('file encrypted'); //say the file in encrypted
            });
        }
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});