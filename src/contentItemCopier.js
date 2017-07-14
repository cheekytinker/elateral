import superagent from 'superagent';
import clone from 'clone';

function getContentItem(host, fromToken, contentItemKey) {
  return new Promise((resolve, reject) => {
    superagent
      .get(`${host}/msc-browsable-content-services/contentlinks/${contentItemKey}`)
      .set('Authorization', `Elateral-MSC-Service-Token ${fromToken}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
  });
}

function removeAccessGroups(item) {
  const copy = clone(item);
  const keys = copy.AccessGroups.map(ag => ag.Key);
  copy.Tags = copy.Tags.filter(t => !keys.find(k => k === t));
  copy.AccessGroups = [];
  return copy;
}

async function createContentItem(host, toToken, item) {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${host}/msc-browsable-content-services/contentlinks/`)
      .send(item)
      .set('Authorization', `Elateral-MSC-Service-Token ${toToken}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
  });
}
function removeKey(item) {
  const copy = clone(item);
  copy.Key = null;
  return copy;
}
function fixPreview(item) {
  const copy = clone(item);
  copy.IsPreviewManuallyCreated = false;
  return copy;
}
async function contentItemCopier(host, fromToken, contentItemKey, toToken) {
  let item = await getContentItem(host, fromToken, contentItemKey);
  item = removeAccessGroups(item);
  item = removeKey(item);
  item = fixPreview(item);
  await createContentItem(host, toToken, item);
}

module.exports = {
  contentItemCopier,
};
