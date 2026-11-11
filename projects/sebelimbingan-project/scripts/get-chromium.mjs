import chromium from '@sparticuz/chromium';
const p = await chromium.executablePath();
console.log(p);
console.log(JSON.stringify(chromium.args));
