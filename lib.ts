
import 'dotenv/config';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export async function getInput(day: number): Promise<string> {
    const cacheFile = 'cache/' + day;
    if(existsSync(cacheFile)) {
        return readFileSync(cacheFile).toString();
    }
    const response = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
        headers: {
            Cookie: process.env.AOC_COOKIE || ''
        }
    });
    const result = await response.text();
    if (!existsSync('cache')) {
        mkdirSync('cache');
    }
    writeFileSync(cacheFile, result)
    return result;
}