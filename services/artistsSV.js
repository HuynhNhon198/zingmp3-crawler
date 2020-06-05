// const request = require("request-promise");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

module.exports = {
  GET_Artist: async () => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://zingmp3.vn/the-loai-nghe-si.html");
      await page.waitForSelector(".container", { timeout: 1000 });

      const body = await page.evaluate(() => {
        return document.querySelector("body").innerHTML;
      });
      let $ = cheerio.load(body);

      console.log($("a.z-box-title").text());

      await browser.close();
      return $("a.z-box-title").text();
    } catch (error) {
      console.log(error);
      return {
        code: "error",
        message: "some error...",
      };
    }
  },
};
