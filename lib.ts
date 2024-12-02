
import 'dotenv/config';

export async function getInput(day: number): Promise<string> {
    const response = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
        headers: {
            Cookie: process.env.AOC_COOKIE || ''
        }
    });
    return response.text();
}