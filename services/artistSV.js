const puppeteer = require("puppeteer");
const { GET_FromUrl } = require("./helperSV.js");

module.exports = {
  GET_Artist: async (alias) => {
    return await new Promise(async (r) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const mainUrl = `https://zingmp3.vn/nghe-si/${alias}`;
      let mainUrlStatus;
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const url = request.url();
        request.continue();
      });
      page.on("requestfailed", (request) => {
        const url = request.url();
      });
      let data = {};
      page.on("response", async (response) => {
        const request = response.request();
        const url = request.url();
        const status = response.status();
        if (url === mainUrl) {
          mainUrlStatus = status;
        }

        // if (
        //   url.includes(
        //     `https://zingmp3.vn/api/oa/get-artist-info?alias=${alias}`
        //   )
        // ) {
        //   const res = await GET_FromUrl(url);
        //   data.cover = res.data.cover;
        //   data.name = res.data.name;
        // }

        // if (url.includes(`https://zingmp3.vn/api/oa/get-home?alias=${alias}`)) {
        //   const res = await response.json();
        //   data = Object.assign(data, res.data[1]);
        //   r({
        //     code: "success",
        //     message: data,
        //   });
        // }
        // console.log(url);
        if (
          url.includes(
            `https://zingmp3.vn/api/artist/get-detail?alias=${alias}`
          )
        ) {
          console.log(url);
          const res = await response.json();
          data = {
            cover: res.data.cover,
            thumb: res.data.thumbnail,
            items: res.data.song.items,
            name: res.data.name,
          };
          r({
            code: "success",
            message: data,
          });
        }
      });
      await page.goto(mainUrl);

      await browser.close();
    });
  },
};
