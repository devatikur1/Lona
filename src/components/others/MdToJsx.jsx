// md-to-jsx-browser.jsx
// Lightweight client-side Markdown -> JSX (React) converter
// No dependencies. Returns real React elements (not dangerouslySetInnerHTML).
// Supports: headings, paragraphs, ul/ol lists, blockquotes, code fences, inline code, bold, italic, links, images, hr.

import React from "react";

// ---------- Parsing (block-level) ----------
function parseBlocks(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeBuf = [];

  while (i < lines.length) {
    const line = lines[i];

    // fenced code blocks
    const fence = line.match(/^```\s*(\w+)?\s*$/);
    if (fence) {
      if (!inCode) {
        inCode = true;
        codeLang = fence[1] || "";
        codeBuf = [];
      } else {
        blocks.push({ type: "code", lang: codeLang, text: codeBuf.join("\n") });
        inCode = false;
        codeLang = "";
        codeBuf = [];
      }
      i++;
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      i++;
      continue;
    }

    // horizontal rule
    if (/^(?:-{3,}|\*{3,})\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      blocks.push({ type: "heading", level: h[1].length, text: h[2] });
      i++;
      continue;
    }

    // blockquote
    const bq = line.match(/^>\s?(.*)$/);
    if (bq) {
      let content = bq[1] || "";
      i++;
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        content += "\n" + lines[i].replace(/^>\s?/, "");
        i++;
      }
      blocks.push({ type: "blockquote", text: content });
      continue;
    }

    // lists (only simple contiguous lists)
    const ul = line.match(/^\s*([-*])\s+(.*)$/);
    const ol = line.match(/^\s*(\d+)\.\s+(.*)$/);
    if (ul || ol) {
      const listType = ul ? "ul" : "ol";
      const items = [];
      let match = ul || ol;
      items.push(match[2]);
      i++;
      while (i < lines.length) {
        const nextUl = lines[i].match(/^\s*([-*])\s+(.*)$/);
        const nextOl = lines[i].match(/^\s*(\d+)\.\s+(.*)$/);
        if ((listType === "ul" && nextUl) || (listType === "ol" && nextOl)) {
          items.push(listType === "ul" ? nextUl[2] : nextOl[2]);
          i++;
        } else break;
      }
      blocks.push({ type: listType, items });
      continue;
    }

    // paragraph (accumulate until blank line or block start)
    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    let para = line;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,6}\s+/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^\s*([-*])\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(?:-{3,}|\*{3,})\s*$/.test(lines[i])
    ) {
      para += "\n" + lines[i];
      i++;
    }
    blocks.push({ type: "para", text: para });
  }

  return blocks;
}

// ---------- Inline parsing (produces array of strings and React elements) ----------
function parseInline(str, keyPrefix = "") {
  // We'll scan left-to-right matching the earliest inline token.
  // Supported: image ![alt](src), link [text](url), `code`, **bold**, *italic*

  const out = [];
  let idx = 0;
  let keyCounter = 0;

  const patterns = [
    { type: "image", re: /!\[([^\]]*)\]\(([^)]+)\)/y },
    { type: "link", re: /\[([^\]]+)\]\(([^)]+)\)/y },
    { type: "code", re: /`([^`]+)`/y },
    { type: "bold", re: /\*\*([^*]+)\*\*/y },
    { type: "italic", re: /\*([^*]+)\*/y },
  ];

  while (idx < str.length) {
    let found = null;
    let matchPos = Infinity;
    let matchObj = null;

    for (const p of patterns) {
      p.re.lastIndex = idx;
      const m = p.re.exec(str);
      if (m && m.index < matchPos) {
        found = p;
        matchPos = m.index;
        matchObj = m;
      }
    }

    if (!found) {
      out.push(str.slice(idx));
      break;
    }

    if (matchPos > idx) {
      out.push(str.slice(idx, matchPos));
    }

    // handle the match
    if (found.type === "image") {
      const alt = matchObj[1];
      const src = matchObj[2];
      out.push(
        React.createElement("img", {
          key: keyPrefix + ":" + keyCounter++,
          alt: alt,
          src: src,
          style: { maxWidth: "100%" },
        })
      );
    } else if (found.type === "link") {
      const text = matchObj[1];
      const url = matchObj[2];
      out.push(
        React.createElement(
          "a",
          {
            key: keyPrefix + ":" + keyCounter++,
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          text
        )
      );
    } else if (found.type === "code") {
      out.push(
        React.createElement(
          "code",
          { key: keyPrefix + ":" + keyCounter++ },
          matchObj[1]
        )
      );
    } else if (found.type === "bold") {
      out.push(
        React.createElement(
          "strong",
          { key: keyPrefix + ":" + keyCounter++ },
          matchObj[1]
        )
      );
    } else if (found.type === "italic") {
      out.push(
        React.createElement(
          "em",
          { key: keyPrefix + ":" + keyCounter++ },
          matchObj[1]
        )
      );
    }

    idx = found.re.lastIndex;
  }

  return out;
}

// ---------- Render blocks to React elements ----------
function renderBlock(block, index) {
  const k = "b" + index;
  switch (block.type) {
    case "heading": {
      const children = parseInline(block.text, k);
      const Tag = "h" + Math.min(6, Math.max(1, block.level));
      return React.createElement(Tag, { key: k }, children);
    }
    case "para": {
      const children = parseInline(block.text, k);
      return React.createElement("p", { key: k }, children);
    }
    case "ul": {
      return React.createElement(
        "ul",
        { key: k },
        block.items.map((it, idx) =>
          React.createElement(
            "li",
            { key: k + ":" + idx },
            parseInline(it, k + ":" + idx)
          )
        )
      );
    }
    case "ol": {
      return React.createElement(
        "ol",
        { key: k },
        block.items.map((it, idx) =>
          React.createElement(
            "li",
            { key: k + ":" + idx },
            parseInline(it, k + ":" + idx)
          )
        )
      );
    }
    case "blockquote": {
      return React.createElement(
        "blockquote",
        { key: k },
        parseInline(block.text, k)
      );
    }
    case "code": {
      return React.createElement(
        "pre",
        { key: k },
        React.createElement(
          "code",
          { className: block.lang ? "language-" + block.lang : undefined },
          block.text
        )
      );
    }
    case "hr": {
      return React.createElement("hr", { key: k });
    }
    default:
      return null;
  }
}

// ---------- Public React component ----------
export default function MdToJsx({ md }) {
  const blocks = React.useMemo(() => parseBlocks(md || ""), [md]);
  return React.createElement(
    "div",
    { className: "md-content" },
    blocks.map((b, i) => renderBlock(b, i))
  );
}

// ---------- Optional helper: plain JS function to get HTML string ----------
// If you want a vanilla JS (non-React) HTML string converter, you can reuse parseBlocks
// and map to simple HTML strings — but for safety & simplicity, prefer React component above.

// Usage example (React):
// <MdToJsx md={`# Title\nHello **world**\n- item1\n- item2`}/>

// Limitations:
// - Inline parsing is intentionally simple and greedy; nested emphasis inside bold may not always behave like CommonMark.
// - Tables, footnotes, and some GFM features are not implemented.
// - This is meant for small-to-medium sized markdown. For heavy-duty use, use a proper markdown library.
