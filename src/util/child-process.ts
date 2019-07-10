import { spawn } from 'child_process';


export async function findEdges(imgPath: string): Promise<string> {
  return new Promise(async resolve => {
    const pythonProcess = spawn('python3',
    ["./opencvfilter.py"]);

      if (pythonProcess !== undefined) {

          pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
          });
      }
  });
}
