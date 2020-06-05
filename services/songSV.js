const { GET_FromUrl } = require("./helperSV.js");
const request = require("request-promise");

module.exports = {
  GET_Song: async (id, alias) => {
    const html = await request(
      `https://mp3.zing.vn/bai-hat/${alias}/${id}.html`
    ).catch((err) => {
      return {
        code: "error",
        message: "Có lỗi xảy ra...",
      };
    });

    if (html) {
      const regex = /key=.{33}/; // get the resouce url
      const match = html.toString().match(regex);
      if (!match) {
        return {
          code: "error",
          message: "Không tìm thầy bài hát",
        };
      } else {
        const [matchUrl] = match;
        // console.log(matchUrl);
        const data = await GET_FromUrl(
          `https://mp3.zing.vn/xhr/media/get-source?type=audio&${matchUrl}`
        );
        return {
          code: "success",
          message: data,
        };
      }
    }
    return {
      code: "error",
      message: "Có lỗi xảy ra...",
    };
  },
};
