import handler from './handler';

const app = new handler({
  wikiSessionCookie: '',
});

app.launch();
