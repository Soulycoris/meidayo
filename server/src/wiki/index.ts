import handler from './handler';

const app = new handler({
  wikiSessionCookie: '',
});

export async function wikiLaunch(): Promise<void> {
  await app.launch();
}

export default app;
