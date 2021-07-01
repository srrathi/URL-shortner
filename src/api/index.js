import axios from "axios";

export const shortenUrlCallApi = async (longUrl, urlCode) => {
  const urlData = await axios
    .post("/api/url/shorten", {
      longUrl: longUrl,
      userUrlCode: urlCode,
    })
    .catch((error) => console.log(error.message));
  console.log(urlData);
  return urlData;
};
