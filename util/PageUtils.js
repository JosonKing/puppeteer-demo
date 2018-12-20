const lodash = require('lodash');

class PageUtils {
  //获取指定内容
  static getContent(page, style, options) {
    (async () => {
      try {
        let content = await page.$eval(style, el => el.innerText);
        console.log(content);

        if (!lodash.isEmpty(options) && !!options.write) {

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
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }
}
moudel.exports = PageUtils;