import { useState } from 'react';

const host = 'https://api.memegen.link/images';
const fileExtension = '.jpg';

function App() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [background, setBackground] = useState('oprah');
  const [queryString, setQueryString] = useState(
    'https://api.memegen.link/images/oprah.jpg',
  );
  const [downloadUrl, setDownloadUrl] = useState('');
  // const [previewError, setPreviewError] = useState(false);

  function downloadMeme(url) {
    fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const blobbedUrl = URL.createObjectURL(blob);
        setDownloadUrl(blobbedUrl);
      })
      .catch(() => console.log('Error'));
  }

  function sanitizeUrl(string) {
    return string
      .replace(/\?/g, '~q')
      .replace(/#/g, '~h')
      .replace(/\//g, '~s')
      .replace(/\?/g, '~q')
      .replace(/&/g, '~a')
      .replace(/%/g, '~p')
      .replace(/#/g, '~h')
      .replace(/\//g, '~s')
      .replace(/\\/, '~b')
      .replace(/</g, '~l')
      .replace(/>/g, '~g');
  }

  function createUrl() {
    const result = `${host}/${sanitizeUrl(background)}${
      top ? '/' + sanitizeUrl(top) : '/_'
    }${bottom ? '/' + sanitizeUrl(bottom) : ''}${fileExtension}`;
    console.log(result);
    return result;
  }

  return (
    <>
      <h1>The Amazing Meme Generator!</h1>
      <p>Create. memes. quickly.</p>
      <h2>Enter your text here:</h2>
      <label htmlFor="topText">Top text </label>
      <input
        id="topText"
        value={top}
        onChange={(e) => setTop(e.currentTarget.value)}
      />
      <br />
      <label htmlFor="bottomText">Bottom text: </label>
      <input
        id="bottomText"
        value={bottom}
        onChange={(e) => setBottom(e.currentTarget.value)}
      />
      <br />
      <label htmlFor="backgroundText">Change your template: </label>
      <input
        id="backgroundText"
        value={background}
        onChange={(e) => setBackground(e.currentTarget.value)}
      />
      {/* {previewError && <span>`${background}his is not a valid meme`</span>} */}
      <br />
      <button
        data-test-id="generate-meme"
        onClick={() => {
          setQueryString(createUrl());
          downloadMeme(createUrl());
        }}
      >
        Update Preview
      </button>
      <br />
      <h2>This is your preview:</h2>
      <div>
        <img
          src={queryString}
          alt="preview of the meme"
          width="400"
          data-test-id="meme-image"
        />
      </div>
      <br />
      <a
        download={`${background}_${top ? top : 'x'}_${bottom ? bottom : 'y'}`}
        href={downloadUrl}
      >
        <button
          disabled={downloadUrl === '' ? true : false}
          aria-label="download meme"
        >
          Download
        </button>
      </a>
      {downloadUrl === '' ? <span>Create your meme first</span> : null}
    </>
  );
}

export default App;
