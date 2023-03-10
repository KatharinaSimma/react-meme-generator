import { useState } from 'react';
import {
  Button,
  Container,
  Controls,
  Download,
  Header,
  History,
  Preview,
} from './styledComponents';

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
  const [memeHistory, setMemeHistory] = useState([]);

  // create a URL string for requests, incl special characters
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
    return result;
  }

  // when creating the preview set the download URL via request + blob (for downloadability)
  function blobUrl(url) {
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

  // use state to access storage
  function historyToState() {
    const keys = Object.keys(window.localStorage);
    const justKeys = keys.filter((k) => {
      return parseInt(parseInt(k));
    });
    justKeys.sort((a, b) => b - a);
    const keyMap = [];
    justKeys.forEach((e) => {
      keyMap.push(JSON.parse(window.localStorage[e]));
    });
    console.log(keyMap);
    setMemeHistory(keyMap);
  }

  // save download to history
  function saveToHistory() {
    const keys = Object.keys(window.localStorage);
    const justKeys = keys.filter((k) => {
      return parseInt(parseInt(k));
    });
    const meme = {
      num: justKeys.length + 1,
      topText: top,
      bottomText: bottom,
      image: background,
      extension: fileExtension,
    };
    const id = justKeys.length + 1;
    window.localStorage.setItem(id, JSON.stringify(meme));
    historyToState();
  }

  // render history to table
  function history() {
    return memeHistory.map((meme) => {
      return (
        <tr key={meme.num}>
          <td>{meme.num}</td>
          <td>{meme.topText}</td>
          <td>{meme.bottomText}</td>
          <td>{meme.image}</td>
          <td>{meme.extension}</td>
        </tr>
      );
    });
  }

  return (
    <Container>
      <Header className="header">
        <h1>The Amazing Meme Generator!</h1>
        <h2>Create. memes. quickly.</h2>
      </Header>

      <Controls className="controls">
        <h3>Enter your text here:</h3>
        <label htmlFor="topText">Top text: </label>
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
        <label htmlFor="backgroundText">Meme template</label>
        <input
          id="backgroundText"
          value={background}
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
        <br />
        <Button
          data-test-id="generate-meme"
          onClick={() => {
            setQueryString(createUrl());
            blobUrl(createUrl());
          }}
        >
          Update Preview
        </Button>
      </Controls>

      <Preview className="preview">
        <img
          src={queryString}
          alt="preview of the meme"
          width="400"
          data-test-id="meme-image"
        />
      </Preview>

      <Download className="download">
        <a
          download={`${background}_${top ? top : 'x'}_${bottom ? bottom : 'y'}`}
          href={downloadUrl}
        >
          <Button
            disabled={downloadUrl === '' ? true : false}
            aria-label="download meme"
            onClick={() => saveToHistory()}
          >
            Download
          </Button>
        </a>
        {downloadUrl === '' ? <span> Create your meme first</span> : null}
      </Download>

      <History className="history">
        <hr />
        <h3>Your History</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Top Text</th>
              <th>Bottom Text</th>
              <th>Meme template</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{history()}</tbody>
        </table>
        <Button
          onClick={() => {
            window.localStorage.clear();
            setMemeHistory([]);
          }}
        >
          Clear your History
        </Button>
      </History>
    </Container>
  );
}

export default App;
