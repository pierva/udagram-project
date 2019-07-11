import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
      const photo = await Jimp.read(inputURL);
      const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
      await photo
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(__dirname+outpath, (img)=>{
        resolve(__dirname+outpath);
      });
    })
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

// validateExtension
// helper function to check whether a file as image extension
// INPUTS
//    imageUrl
// OUTPUT
//    boolean
export function validateExtension(imageUrl: string) {
  if (imageUrl) {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'tiff'];
    const urlParts = imageUrl.split('.');
    if (validExtensions.includes(urlParts[urlParts.length-1].toLowerCase())) {
      return true;
    }
    return false;
  }
}
