export const getRequest = async BASE_URL => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject({err: true, msg: 'Something want wrong'});
        console.log(BASE_URL, 'this is catch getRequest', error);
      });
  });
};
