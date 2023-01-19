import { useState } from 'react';

const host = 'https://api.memegen.link/images';
const fileExtension = '.jpg';

function App() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [background, setBackground] = useState('oprah');
  const [queryString, setQuerystring] = useState(
    'https://api.memegen.link/images/oprah.jpg',
  );
  const [downloadUrl, setDownloadUrl] = useState();

  function downloadMeme(url, name) {
    fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const blobbedUrl = URL.createObjectURL(blob);
        setDownloadUrl(blobbedUrl);
        console.log(blobbedUrl);
      })
      .catch(() => console.log('Error'));
  }

  function createUrl() {
    return `${host}/${background}${top ? '/' + top : '/_'}${
      bottom ? '/' + bottom : ''
    }${fileExtension}`;
  }

  return (
    <>
      <h1>The Amazing Meme Generator!</h1>
      <p>Create. memes. quickly.</p>
      <h2>Enter your text here:</h2>
      <label>Top text </label>
      <input value={top} onChange={(e) => setTop(e.currentTarget.value)} />
      <br />
      <label>Bottom text: </label>
      <input
        value={bottom}
        onChange={(e) => setBottom(e.currentTarget.value)}
      />
      <br />
      <label>Change your template: </label>
      <input
        value={background}
        onChange={(e) => setBackground(e.currentTarget.value)}
      />
      <br />
      <br />
      <button
        data-test-id="generate-meme"
        onClick={() => {
          setQuerystring(createUrl());
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
          disabled={!downloadUrl ? true : false}
          aria-label="download meme"
        >
          Download
        </button>
      </a>
      {!downloadUrl ? <span>Create your meme first</span> : null}
    </>
  );
}

export default App;
