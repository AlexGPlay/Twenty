import redis from 'redis';

const client = redis.createClient();

export function setKeyValue(key: string, value: string): Promise<Boolean>{
  return new Promise((resolve, reject) => {
    client.set(key, value, (err) => {
      if(err) reject(err);
      resolve(true);
    });
  });
}

export function getValue(key: string): Promise<string | null>{
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if(err) reject(err);
      resolve(res);
    });
  });
}

export function removeKey(key: string): Promise<Number>{
  return new Promise((resolve, reject) => {
    client.del(key, (err, res) => {
      if(err) reject(err);
      resolve(res);
    });
  });
}

export function getKeys(pattern: string): Promise<string[]>{
  return new Promise((resolve, reject) => {
    client.keys(pattern, (err, res) => {
      if(err) reject(err);
      resolve(res);
    });
  })
}