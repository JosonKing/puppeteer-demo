const puppeteer = require('puppeteer');
const fs = require('fs');

function getContent(page) {
  (async () => {
    try {
      // 使用css选择器的方式
      let content = await page.$eval('div.indent', el => el.innerText);
      console.log(content);

      // 写入文件内容（如果文件不存在会创建一个文件）
      // 传递了追加参数 { 'flag': 'a' }
      fs.writeFile('./test2.txt', content, {
        'flag': 'a'
      }, function (error) {
        if (error) {
          throw error;
        }
        console.log('Saved success');

        // 写入成功后读取测试
        // fs.readFile('./test2.txt', 'utf-8', function (error, data) {
        //   if (error) {
        //     throw error;
        //   }
        //   console.log(data);
        // });
      });
    } catch (error) {
      console.log(error)
    }
  })()
}

(async () => {
  try {
    // 创建一个浏览器实例 Browser 对象
    let browser = await puppeteer.launch({
      // 是否不显示浏览器， 为true则不显示
      'headless': false,
    });
    // 通过浏览器实例 Browser 对象创建页面 Page 对象
    let page = await browser.newPage();
    // 设置浏览器信息
    const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36";
    await Promise.all([
      page.setUserAgent(UA),
      // 允许运行js
      page.setJavaScriptEnabled(true),
      // 设置页面视口的大小
      page.setViewport({
        width: 1100,
        height: 1080
      }),
    ]);

    // // 地址
    // let chapter_list_url = `http://book.km.com/shuku/1490966.html`
    // // 打开章节列表
    // await page.goto(chapter_list_url);
    // // 使用css选择器的方式
    // let content = await page.$eval('#xtopjsinfo > div.container > div.container-fix > div.col_a > div.abook > div.summary > p.desc', el => el.innerText);
    // console.log(content);

    // // 地址
    // let chapter_list_url = `https://wenku.baidu.com/view/8b817c43bceb19e8b9f6ba19.html`
    // // 打开章节列表
    // await page.goto(chapter_list_url);
    // await page.click('.fc2e');
    // // 使用css选择器的方式
    // let content = await page.$eval('#pageNo-1 > div.reader-parent-3c3fd258f7ec4afe05a1df15 > div.reader-wrap3c3fd258f7ec4afe05a1df15 > div.reader-main-3c3fd258f7ec4afe05a1df15 > div.reader-txt-layer > div.ie-fix', el => el.innerText);
    // console.log(content);

    // // 地址
    // let url = `https://news.ycombinator.com/`
    // // 打开章节列表
    // await page.goto(url);
    // // await page.click('.fc2e');
    // // 使用css选择器的方式
    // let content = await page.$eval('table.itemlist > tbody', el => el.innerText);
    // console.log(content);

    // 地址
    let url = `https://book.douban.com/top250?icn=index-book250-all`
    // await page.click('.fc2e');
    // 打开章节列表
    await page.goto(url);

    await getContent(page);

    await page.waitFor(4000)

    await (async () => {
      for (let i = 0; i < 9; i++) {
        await page.click('.next');

        await page.waitFor(4000)

        await getContent(page);
      }
    })()

  } catch (error) {
    console.log(error)
  }


})()