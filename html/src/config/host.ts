const host = {
  baseUrl: import.meta.env.DEV ? 'http://192.168.31.250:3000' : 'http://121.196.97.42:3000',
  assetsUrl: '',
};
host.assetsUrl = host.baseUrl + '/assets/img/Texture2D';

export { host };
