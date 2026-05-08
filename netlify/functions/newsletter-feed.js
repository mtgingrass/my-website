exports.handler = async function () {
  try {
    const res = await fetch('https://newsletter.markgingrass.com/feed');
    const xml = await res.text();

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
      const chunk = match[1];
      items.push({
        title: cdata(chunk, 'title'),
        link: text(chunk, 'link'),
        description: cdata(chunk, 'description'),
        pubDate: text(chunk, 'pubDate'),
      });
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ items: [] }) };
  }
};

function cdata(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  return m ? m[1].trim() : '';
}

function text(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`));
  return m ? m[1].trim() : '';
}
