import './style.css';
import './node_modules/highlight.js/styles/atom-one-dark.css';
import { marked } from "marked";
import hljs from "highlight.js";
import Split from "split-grid";

import renderMathInElement from 'katex/contrib/auto-render';

hljs.highlightAll();

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    if (hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
  langPrefix: 'hljs language-',
  breaks: true,
});


function updatePreview(event) {
  const MDcontent = event.target.value;
  const MD_to_html = marked(MDcontent);

  const previewElement = document.getElementById('preview');
  previewElement.innerHTML = MD_to_html;

  renderMathInElement(previewElement, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[\\n", right: "\\n\\]", display: true },
    ],
    throwOnError: false
  });

  previewElement.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });

};

document.getElementById('editor').addEventListener('input', updatePreview);

Split({
  columnGutters: [{
    track: 1,
    element: document.querySelector('.vertical-gutter'),
  }]
});
