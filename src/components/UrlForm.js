import React, { useState } from "react";
import { shortenUrlCallApi } from "../api";
import CustomTooltip from "./CustomTooltip";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrlCode, setShortUrlCode] = useState("");
  const [tooltipText, setTooltipText] = useState("Copy To Clipboard");
  const [showClipboard, setShowClipboard] = useState(false);

  const copyClipboardBtnClick = (e) => {
    e.preventDefault();
    setTooltipText("Copied to Clipboard");
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrlCode}`).then(
      function () {
        // console.log('Copying to clipboard was successful!');
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const callApiFunction = async () => {
    const urlData = await shortenUrlCallApi(longUrl, shortUrlCode);
    console.log(urlData);
    setShortUrlCode(urlData.data.urlCode);
    setShowClipboard(true);
  };

  return (
    <div className="form">
      <div className="title">URL-Shortner</div>
      <div className="subtitle">Shorten your long URL's with a small URL</div>
      <div className="input-container ic1">
        <input
          onChange={(e) => setLongUrl(e.target.value)}
          id="longUrl"
          className="input"
          type="text"
          placeholder=" "
        />
        <div className="cut"></div>
        <label htmlFor="longUrl" className="placeholder">
          Paste Long URL
        </label>
      </div>
      <div className="input-container ic2">
        <input
          onChange={(e) => {
            setShowClipboard(false);
            setShortUrlCode(e.target.value);
            setTooltipText("Copy To Clipboard");
          }}
          id="shortUrl"
          className="input"
          type="text"
          placeholder=" "
        />
        <div className="cut"></div>
        <label htmlFor="shortUrl" className="placeholder">
          Short URL code (optional)
        </label>
      </div>
      {showClipboard ? (
        <div className="url-container">
          <p
            style={{
              maxWidth: "100%",
              wordWrap: "break-word",
              textAlign: "center",
            }}
          >
            {window.location.origin}/{shortUrlCode}
          </p>
          <button onClick={(e) => copyClipboardBtnClick(e)} className="tooltip">
            <i className="fas fa-2x fa-copy"></i>
            <CustomTooltip text={tooltipText} />
          </button>
        </div>
      ) : null}

      <button onClick={callApiFunction} type="text" className="submit">
        Shorten Url <i className="fas fa-angle-double-right"></i>
      </button>
    </div>
  );
};

export default UrlForm;
