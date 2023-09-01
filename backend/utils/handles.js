// Read handles.csv and return an array
import fs, { read } from 'fs';

const getHandles = () => {
    const csv = fs.readFileSync('./utils/handles.csv', 'utf8');
    const lines = csv.split(',');
    return lines;
}

export default getHandles;
