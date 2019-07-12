import {spawn} from "child_process";
const path = require('path');


export async function findEdges(imgPath: string, lower: string, upper: string):
                                Promise<string> {
  return new Promise(async (resolve, reject) => {
    lower = lower ? lower : '';
    upper = upper ? upper: '';
    const pythonProcess = spawn('python3',[
        path.join(__dirname, "opencvfilter.py"),
        '-i', imgPath,
        '-l', lower,
        '-u', upper
      ]);
    if (pythonProcess !== undefined) {
        pythonProcess.stdout.on('data', (data) => {
          resolve(data.toString());
        });
        process.stderr.on('data', function (data){
          console.log(data.toString());
          resolve(data);
        });
    } else {
      reject('Unable to process the image in python');
    }
  });
}
