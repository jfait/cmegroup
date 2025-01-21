import { getTaxonomy } from '../../../scripts/taxonomy.js';

function renderItem(item, catId) {
  const pathStr = item.path.split('/').slice(0, -1).join('<span class="psep"> / </span>');
  return `
  <span class="path">${pathStr}
    <span data-title="${item.title}" class="tag cat-${catId % 4}">${item.title}</span>
  </span>
`;
}

function renderItems(item, catId) {
  let html = item.hide ? '' : renderItem(item, catId);
  Object.keys(item).forEach((key) => {
    if (!['title', 'name', 'path', 'hide'].includes(key)) {
      html += renderItems(item[key], catId);
    }
  });

  return html;
}

function initTaxonomy(taxonomy) {
  let html = '';
  Object.values(taxonomy).forEach((cat, idx) => {
    html += '<div class="category">';
    html += `<h2>${cat.title}</h2>`;
    Object.keys(cat).forEach((key) => {
      if (!['title', 'name', 'path', 'hide'].includes(key)) {
        html += renderItems(cat[key], idx);
      }
    });
    html += '</div>';
  });
  const results = document.getElementById('results');
  results.innerHTML = html;
}

function filter() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('#results .tag').forEach((tag) => {
    const { title } = tag.dataset;
    const offset = title.toLowerCase().indexOf(searchTerm);
    if (offset >= 0) {
      const before = title.substring(0, offset);
      const term = title.substring(offset, offset + searchTerm.length);
      const after = title.substring(offset + searchTerm.length);
      tag.innerHTML = `${before}<span class="highlight">${term}</span>${after}`;
      tag.closest('.path').classList.remove('filtered');
    } else {
      tag.closest('.path').classList.add('filtered');
    }
  });
}

function toggleTag(target) {
  target.classList.toggle('selected');
  // eslint-disable-next-line no-use-before-define
  displaySelected();
}

function displaySelected() {
  const selEl = document.getElementById('selected');
  const selTagsEl = selEl.querySelector('.selected-tags');
  const toCopyBuffer = [];

  selTagsEl.innerHTML = '';
  const selectedTags = document.querySelectorAll('#results .path.selected');
  if (selectedTags.length > 0) {
    selectedTags.forEach((path) => {
      const clone = path.cloneNode(true);
      clone.classList.remove('filtered', 'selected');
      const tag = clone.querySelector('.tag');
      tag.innerHTML = tag.dataset.title;
      clone.addEventListener('click', () => {
        toggleTag(path);
      });
      toCopyBuffer.push(tag.dataset.title);
      selTagsEl.append(clone);
    });

    selEl.classList.remove('hidden');
  } else {
    selEl.classList.add('hidden');
  }

  const copybuffer = document.getElementById('copybuffer');
  copybuffer.value = toCopyBuffer.join(', ');
}

async function init() {
  const tax = await getTaxonomy();

  initTaxonomy(tax);

  const selEl = document.getElementById('selected');
  const copyButton = selEl.querySelector('button.copy');
  copyButton.addEventListener('click', () => {
    const copyText = document.getElementById('copybuffer');
    navigator.clipboard.writeText(copyText.value);

    copyButton.disabled = true;
  });

  selEl.querySelector('button.clear').addEventListener('click', () => {
    const selectedTags = document.querySelectorAll('#results .path.selected');
    selectedTags.forEach((tag) => {
      toggleTag(tag);
    });
  });

  document.querySelector('#search').addEventListener('keyup', filter);

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.category .path');
    if (target) {
      toggleTag(target);
    }
  });
}

init();
