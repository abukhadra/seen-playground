const fs = require('node:fs');

start()

function start() {
    fs.readFile('./dist/src/splay.html', 'utf8', (err, data) => {
      if (err) { console.error(err); return; }
      data = data.replace(/\\|`|\$/g, '\\$&');
      data = `export default function SeenPlayground(id, parent, opts) { 
                const code = \`${data}\`
                const iframe = document.createElement('iframe');
                iframe.id = id;
                iframe.sandbox = 'allow-forms allow-scripts allow-same-origin';
                iframe.setAttribute("style","width:100%; height: 100%;");
                parent.replaceChildren()
                parent.appendChild(iframe)
                const iframe_win = iframe.contentWindow || iframe;                
                iframe.srcdoc = \` \$\{code.replace("'%SEEN_PLAYGROUND__OPTS%'", \`\$\{JSON.stringify(opts)}\`)} \`;
                return iframe;
              }`
      writeToJS(data)
    });
}

function writeToJS(data) {
  fs.writeFile('./splay.js', data, err => {
  if (err) { console.error(err);  return; }
});
}
