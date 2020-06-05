const { GET_FromUrl } = require("./helperSV.js");

module.exports = {
  GET_Top100: async (type) => {
    const id = (t) =>
      ({
        usuk: "ZWZB96AB",
        kpop: "ZWZB96DC",
        vpop: "ZWZB969E",
      }[t]);
    const data = await GET_FromUrl(
      `https://mp3.zing.vn/xhr/media/get-list?op=top100&id=${id(type)}`
    );
    return {
      code: "success",
      message: data,
    };
  },
};
