const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const Nightmare = require("nightmare");

module.exports = {
  GET_Artists: async () => {
    // try {
    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
    //   await page.goto("https://zingmp3.vn/the-loai-nghe-si.html");
    //   await page.waitForSelector(".container", { timeout: 10000 });

    //   const body = await page.evaluate(() => {
    //     return document.querySelector("body").innerHTML;
    //   });
    // let $ = cheerio.load(body);

    // const data = [];
    // $(".pad-top-20 section").each((i, e) => {
    //   const type = {
    //     name: $(e).find("a.z-box-title").text(),
    //     artists: [],
    //   };
    //   $(e)
    //     .find(".col-album-circle")
    //     .each((ind, el) => {
    //       const artist = {
    //         name: $(el).find(".card-info .artist a").text(),
    //         alias: $(el)
    //           .find(".card-info .artist a")
    //           .attr("href")
    //           .replace("/nghe-si/", ""),
    //         thumb: $(el).find("img").attr("src"),
    //       };
    //       type.artists.push(artist);
    //     });
    //   data.push(type);
    // });

    //   await browser.close();
    //   return {
    //     code: "success",
    //     message: data,
    //   };
    // } catch (error) {
    //   return {
    //     code: "error",
    //     message: "some error...",
    //   };
    // }
    const nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    const body = await nightmare
      .goto("https://zingmp3.vn/the-loai-nghe-si.html")
      .wait(".pad-top-20 section")
      .evaluate(() => document.body.innerHTML)
      .catch((error) => {
        console.error("Search failed:", error);
      });
    // console.log(body);
    let $ = cheerio.load(body);

    const data = [];
    console.log($(".pad-top-20 section").length);
    $(".pad-top-20 section").each((i, e) => {
      const type = {
        name: $(e).find("a.z-box-title").text(),
        artists: [],
      };
      $(e)
        .find(".col-album-circle")
        .each((ind, el) => {
          const artist = {
            name: $(el).find(".card-info .artist a").text(),
            alias: $(el)
              .find(".card-info .artist a")
              .attr("href")
              .replace("/nghe-si/", ""),
            thumb: $(el).find("img").attr("src"),
          };
          type.artists.push(artist);
        });
      data.push(type);
      // console.log(type);
    });
    // console.log(data);
    return {
      code: "success",
      message: data,
    };
  },
};
