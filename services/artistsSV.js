const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = {
  GET_Artists: async () => {
    const html = await request(`http://mp3.zing.vn/the-loai-nghe-si`).catch(
      (err) => {
        return {
          code: "error",
          message: "Có lỗi xảy ra...",
        };
      }
    );

    if (html) {
      // console.log(html);
      let $ = cheerio.load(html);

      const data = [];

      $(".zcontent .title-section").each((i, e) => {
        const type = {
          id: i,
          name: $(e).text().trim(),
          artists: [],
        };
        data.push(type);
      });
      // console.log(data);
      console.log($(".row.fn-list").length);
      $(".row.fn-list").each((ind, el) => {
        const artists = [];
        $(el)
          .find(".artist-item")
          .each((i, ell) => {
            if (i > 0) {
              const artist = {
                name: $(ell).find("h3.name-item").text(),
                alias: $(ell)
                  .find("h3.name-item a")
                  .attr("href")
                  .replace("/nghe-si/", ""),
                thumb: $(ell).find("a.thumb img").attr("src"),
              };
              artists.push(artist);
            }
          });
        const i = data.findIndex((x) => x.id === ind);
        data[i].artists = artists;
      });
      return {
        code: "success",
        message: data,
      };
    }
  },
};
