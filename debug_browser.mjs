import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`PAGE ERROR: ${msg.text()}`);
        }
    });

    page.on('pageerror', error => {
        console.log(`UNCAUGHT EXCEPTION: ${error.message}`);
    });

    console.log('Navigating to page...');
    await page.goto('http://localhost:5173/junior/grade/2/how-much-can-you-carry?skillId=1007', { waitUntil: 'networkidle' });

    // Wait a bit to ensure all React rendering finishes
    await new Promise(r => setTimeout(r, 2000));

    const content = await page.content();
    if (content.includes('class="g1-bg-blobs"')) {
        console.log("Page seems to have rendered successfully.");
    } else {
        console.log("Page rendered blank.");
    }

    await browser.close();
})();
