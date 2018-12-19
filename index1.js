const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // https://wenku.baidu.com/view/8b817c43bceb19e8b9f6ba19.html
  // https://wenku.baidu.com/view/8b817c43bceb19e8b9f6ba19.html?pn=51
  await page.goto('https://wenku.baidu.com/view/8b817c43bceb19e8b9f6ba19.html', {
    waitUntil: 'networkidle2'
  });
  await page.pdf({
    path: '1.pdf',
    format: 'A4'
  });

  await browser.close();
})();

