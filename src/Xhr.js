export default function(url, config = {}) {
  config.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if(config.body) config.body = JSON.stringify(config.body);
  
  try {
    return fetch(url, config).then(res => {
      if(res.status >= 300) return Promise.reject(res);
      if(res.status === 204) return Promise.resolve();
      return Promise.resolve(res.json());
    });
  } catch(err) {
    console.log(err);
    return err;
  }
}