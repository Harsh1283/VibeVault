import ImageKit from "imagekit";
import config from '../config/config.js';

const imagekit = new ImageKit({
  publicKey: config.imagekit_publicKey,
  privateKey:config.imagekit_privateKey,
  urlEndpoint:config.imagekit_urlEndpoint});

//   console.log("imagekit env",imagekit);
  

function uploadFile(file, fileName) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file,
            fileName: "audio-file-" + Date.now() + ".mp3",
            folder: "/audio-files/"
        }, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
export default uploadFile;
