import { Directory } from './directory';
import fs from 'fs';

const drive: Directory = new Directory();
const commandText = fs.readFileSync('commandScript.txt', 'utf-8');

commandText.split(/\r?\n/).forEach(line =>  {
  const command = line.split(' ');

  switch (command[0]) {
    case 'CREATE':
      drive.create(command[1]);
      break;
    case 'LIST':
      drive.list();
      break;
    case 'MOVE':
      drive.move(command[1], command[2]);
      break;
    case 'DELETE':
      const result = drive.delete(command[1]);
      if (result !== 'Success') {
        console.log(result);
      }
      break;
    default:
      console.log(`Command ${command[0]} not found.`);
  }
});

