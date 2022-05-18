/*!
 * EasePack 3.6.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */

import { emojiExp, getText } from "./strings";

let doc;
let win;
let coreInitted;
const stripExp = /(?:\r|\n|\t\t)/g; // find carriage returns, new line feeds and double-tabs.
const multipleSpacesExp = /(?:\s\s+)/g;
const initCore = () => {
  doc = document;
  win = window;
  coreInitted = 1;
};
const bonusValidated = 1;
const getComputedStyle = (element) => win.getComputedStyle(element);
const { isArray } = Array;
const { slice } = [];
const toArray = (value, leaveStrings) => {
  // takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  let type;
  return isArray(value)
    ? value
    : (type = typeof value) === "string" && !leaveStrings && value
    ? slice.call(doc.querySelectorAll(value), 0)
    : value && type === "object" && "length" in value
    ? slice.call(value, 0)
    : value
    ? [value]
    : [];
};
const isAbsolute = (vars) => vars.position === "absolute" || vars.absolute === true;
// some characters are combining marks (think diacritics/accents in European languages) which involve 2 or 4 characters that combine in the browser to form a single character. Pass in the remaining text and an array of the special characters to search for and if the text starts with one of those special characters, it'll spit back the number of characters to retain (often 2 or 4). Used in the specialChars features that was introduced in 0.6.0.
const findSpecialChars = (text, chars) => {
  let i = chars.length;
  let s;
  while (--i > -1) {
    s = chars[i];
    if (text.substr(0, s.length) === s) {
      return s.length;
    }
  }
};
const divStart = " style='position:relative;display:inline-block;'";
const cssClassFunc = (cssClass = "", tag) => {
  const iterate = ~cssClass.indexOf("++");
  let num = 1;
  if (iterate) {
    cssClass = cssClass.split("++").join("");
  }
  return () =>
    `<${tag}${divStart}${cssClass ? ` class='${cssClass}${iterate ? num++ : ""}'>` : ">"}`;
};
const swapText = (element, oldText, newText) => {
  const type = element.nodeType;
  if (type === 1 || type === 9 || type === 11) {
    for (element = element.firstChild; element; element = element.nextSibling) {
      swapText(element, oldText, newText);
    }
  } else if (type === 3 || type === 4) {
    element.nodeValue = element.nodeValue.split(oldText).join(newText);
  }
};
const pushReversed = (a, merge) => {
  let i = merge.length;
  while (--i > -1) {
    a.push(merge[i]);
  }
};
const isBeforeWordDelimiter = (e, root, wordDelimiter) => {
  let next;
  while (e && e !== root) {
    next = e._next || e.nextSibling;
    if (next) {
      return next.textContent.charAt(0) === wordDelimiter;
    }
    e = e.parentNode || e._parent;
  }
};
const deWordify = (e) => {
  const children = toArray(e.childNodes);
  const l = children.length;
  let i;
  let child;
  for (i = 0; i < l; i++) {
    child = children[i];
    if (child._isSplit) {
      deWordify(child);
    } else if (i && child.previousSibling && child.previousSibling.nodeType === 3) {
      child.previousSibling.nodeValue +=
        child.nodeType === 3 ? child.nodeValue : child.firstChild.nodeValue;
      e.removeChild(child);
    } else if (child.nodeType !== 3) {
      e.insertBefore(child.firstChild, child);
      e.removeChild(child);
    }
  }
};
const getStyleAsNumber = (name, computedStyle) => parseFloat(computedStyle[name]) || 0;
const setPositionsAfterSplit = (
  element,
  vars,
  allChars,
  allWords,
  allLines,
  origWidth,
  origHeight
) => {
  const cs = getComputedStyle(element);
  const paddingLeft = getStyleAsNumber("paddingLeft", cs);
  let lineOffsetY = -999;
  const borderTopAndBottom =
    getStyleAsNumber("borderBottomWidth", cs) + getStyleAsNumber("borderTopWidth", cs);
  const borderLeftAndRight =
    getStyleAsNumber("borderLeftWidth", cs) + getStyleAsNumber("borderRightWidth", cs);
  const padTopAndBottom =
    getStyleAsNumber("paddingTop", cs) + getStyleAsNumber("paddingBottom", cs);
  const padLeftAndRight =
    getStyleAsNumber("paddingLeft", cs) + getStyleAsNumber("paddingRight", cs);
  const lineThreshold = getStyleAsNumber("fontSize", cs) * (vars.lineThreshold || 0.2);
  const { textAlign } = cs;
  const charArray = [];
  const wordArray = [];
  const lineArray = [];
  const wordDelimiter = vars.wordDelimiter || " ";
  const tag = vars.tag ? vars.tag : vars.span ? "span" : "div";
  const types = vars.type || vars.split || "chars,words,lines";
  const lines = allLines && ~types.indexOf("lines") ? [] : null;
  const words = ~types.indexOf("words");
  const chars = ~types.indexOf("chars");
  const absolute = isAbsolute(vars);
  let { linesClass } = vars;
  const iterateLine = ~(linesClass || "").indexOf("++");
  const spaceNodesToRemove = [];
  let i;
  let j;
  let l;
  let node;
  let nodes;
  let isChild;
  let curLine;
  let addWordSpaces;
  let style;
  let lineNode;
  let lineWidth;
  let offset;
  if (iterateLine) {
    linesClass = linesClass.split("++").join("");
  }

  // copy all the descendant nodes into an array (we can't use a regular nodeList because it's live and we may need to renest things)
  j = element.getElementsByTagName("*");
  l = j.length;
  nodes = [];
  for (i = 0; i < l; i++) {
    nodes[i] = j[i];
  }

  // for absolute positioning, we need to record the x/y offsets and width/height for every <div>. And even if we're not positioning things absolutely, in order to accommodate lines, we must figure out where the y offset changes so that we can sense where the lines break, and we populate the lines array.
  if (lines || absolute) {
    for (i = 0; i < l; i++) {
      node = nodes[i];
      isChild = node.parentNode === element;
      if (isChild || absolute || (chars && !words)) {
        offset = node.offsetTop;
        if (
          lines &&
          isChild &&
          Math.abs(offset - lineOffsetY) > lineThreshold &&
          (node.nodeName !== "BR" || i === 0)
        ) {
          // we found some rare occasions where a certain character like &#8209; could cause the offsetTop to be off by 1 pixel, so we build in a threshold.
          curLine = [];
          lines.push(curLine);
          lineOffsetY = offset;
        }
        if (absolute) {
          // record offset x and y, as well as width and height so that we can access them later for positioning. Grabbing them at once ensures we don't trigger a browser paint & we maximize performance.
          node._x = node.offsetLeft;
          node._y = offset;
          node._w = node.offsetWidth;
          node._h = node.offsetHeight;
        }
        if (lines) {
          if (
            (node._isSplit && isChild) ||
            (!chars && isChild) ||
            (words && isChild) ||
            (!words && node.parentNode.parentNode === element && !node.parentNode._isSplit)
          ) {
            curLine.push(node);
            node._x -= paddingLeft;
            if (isBeforeWordDelimiter(node, element, wordDelimiter)) {
              node._wordEnd = true;
            }
          }
          if (
            node.nodeName === "BR" &&
            ((node.nextSibling && node.nextSibling.nodeName === "BR") || i === 0)
          ) {
            // two consecutive <br> tags signify a new [empty] line. Also, if the entire block of content STARTS with a <br>, add a line.
            lines.push([]);
          }
        }
      }
    }
  }

  for (i = 0; i < l; i++) {
    node = nodes[i];
    isChild = node.parentNode === element;
    if (node.nodeName === "BR") {
      if (lines || absolute) {
        node.parentNode && node.parentNode.removeChild(node);
        nodes.splice(i--, 1);
        l--;
      } else if (!words) {
        element.appendChild(node);
      }
      continue;
    }

    if (absolute) {
      style = node.style;
      if (!words && !isChild) {
        node._x += node.parentNode._x;
        node._y += node.parentNode._y;
      }
      style.left = `${node._x}px`;
      style.top = `${node._y}px`;
      style.position = "absolute";
      style.display = "block";
      // if we don't set the width/height, things collapse in older versions of IE and the origin for transforms is thrown off in all browsers.
      style.width = `${node._w + 1}px`; // IE is 1px short sometimes. Avoid wrapping
      style.height = `${node._h}px`;
    }

    if (!words && chars) {
      // we always start out wrapping words in their own <div> so that line breaks happen correctly, but here we'll remove those <div> tags if necessary and re-nest the characters directly into the element rather than inside the word <div>
      if (node._isSplit) {
        node._next = j = node.nextSibling;
        node.parentNode.appendChild(node); // put it at the end to keep the order correct.
        while (j && j.nodeType === 3 && j.textContent === " ") {
          // if there are nodes that are just a space right afterward, go ahead and append them to the end so they're not out of order.
          node._next = j.nextSibling;
          node.parentNode.appendChild(j);
          j = j.nextSibling;
        }
      } else if (node.parentNode._isSplit) {
        node._parent = node.parentNode;
        if (!node.previousSibling && node.firstChild) {
          node.firstChild._isFirst = true;
        }
        if (
          node.nextSibling &&
          node.nextSibling.textContent === " " &&
          !node.nextSibling.nextSibling
        ) {
          // if the last node inside a nested element is just a space (like T<span>nested </span>), remove it otherwise it'll get placed in the wrong order. Don't remove it right away, though, because we need to sense when words/characters are before a space like _isBeforeWordDelimiter(). Removing it now would make that a false negative.
          spaceNodesToRemove.push(node.nextSibling);
        }
        node._next = node.nextSibling && node.nextSibling._isFirst ? null : node.nextSibling;
        node.parentNode.removeChild(node);
        nodes.splice(i--, 1);
        l--;
      } else if (!isChild) {
        offset =
          !node.nextSibling && isBeforeWordDelimiter(node.parentNode, element, wordDelimiter); // if this is the last letter in the word (and we're not breaking by lines and not positioning things absolutely), we need to add a space afterwards so that the characters don't just mash together
        node.parentNode._parent && node.parentNode._parent.appendChild(node);
        offset && node.parentNode.appendChild(doc.createTextNode(" "));
        if (tag === "span") {
          node.style.display = "inline"; // so that word breaks are honored properly.
        }
        charArray.push(node);
      }
    } else if (node.parentNode._isSplit && !node._isSplit && node.innerHTML !== "") {
      wordArray.push(node);
    } else if (chars && !node._isSplit) {
      if (tag === "span") {
        node.style.display = "inline";
      }
      charArray.push(node);
    }
  }

  i = spaceNodesToRemove.length;
  while (--i > -1) {
    spaceNodesToRemove[i].parentNode.removeChild(spaceNodesToRemove[i]);
  }

  if (lines) {
    // the next 7 lines just give us the line width in the most reliable way and figure out the left offset (if position isn't relative or absolute). We must set the width along with text-align to ensure everything works properly for various alignments.
    if (absolute) {
      lineNode = doc.createElement(tag);
      element.appendChild(lineNode);
      lineWidth = `${lineNode.offsetWidth}px`;
      offset = lineNode.offsetParent === element ? 0 : element.offsetLeft;
      element.removeChild(lineNode);
    }
    style = element.style.cssText;
    element.style.cssText = "display:none;"; // to improve performance, set display:none on the element so that the browser doesn't have to worry about reflowing or rendering while we're renesting things. We'll revert the cssText later.
    // we can't use element.innerHTML = "" because that causes IE to literally delete all the nodes and their content even though we've stored them in an array! So we must loop through the children and remove them.
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    addWordSpaces = wordDelimiter === " " && (!absolute || (!words && !chars));
    for (i = 0; i < lines.length; i++) {
      curLine = lines[i];
      lineNode = doc.createElement(tag);
      lineNode.style.cssText = `display:block;text-align:${textAlign};position:${
        absolute ? "absolute;" : "relative;"
      }`;
      if (linesClass) {
        lineNode.className = linesClass + (iterateLine ? i + 1 : "");
      }
      lineArray.push(lineNode);
      l = curLine.length;
      for (j = 0; j < l; j++) {
        if (curLine[j].nodeName !== "BR") {
          node = curLine[j];
          lineNode.appendChild(node);
          addWordSpaces && node._wordEnd && lineNode.appendChild(doc.createTextNode(" "));
          if (absolute) {
            if (j === 0) {
              lineNode.style.top = `${node._y}px`;
              lineNode.style.left = `${paddingLeft + offset}px`;
            }
            node.style.top = "0px";
            if (offset) {
              node.style.left = `${node._x - offset}px`;
            }
          }
        }
      }
      if (l === 0) {
        // if there are no nodes in the line (typically meaning there were two consecutive <br> tags, just add a non-breaking space so that things display properly.
        lineNode.innerHTML = "&nbsp;";
      } else if (!words && !chars) {
        deWordify(lineNode);
        swapText(lineNode, String.fromCharCode(160), " ");
      }
      if (absolute) {
        lineNode.style.width = lineWidth;
        lineNode.style.height = `${node._h}px`;
      }
      element.appendChild(lineNode);
    }
    element.style.cssText = style;
  }

  // if everything shifts to being position:absolute, the container can collapse in terms of height or width, so fix that here.
  if (absolute) {
    if (origHeight > element.clientHeight) {
      element.style.height = `${origHeight - padTopAndBottom}px`;
      if (element.clientHeight < origHeight) {
        // IE8 and earlier use a different box model - we must include padding and borders
        element.style.height = `${origHeight + borderTopAndBottom}px`;
      }
    }
    if (origWidth > element.clientWidth) {
      element.style.width = `${origWidth - padLeftAndRight}px`;
      if (element.clientWidth < origWidth) {
        // IE8 and earlier use a different box model - we must include padding and borders
        element.style.width = `${origWidth + borderLeftAndRight}px`;
      }
    }
  }
  pushReversed(allChars, charArray);
  words && pushReversed(allWords, wordArray);
  pushReversed(allLines, lineArray);
};
const splitRawText = (element, vars, wordStart, charStart) => {
  const tag = vars.tag ? vars.tag : vars.span ? "span" : "div";
  const types = vars.type || vars.split || "chars,words,lines";
  // words = (types.indexOf("words") !== -1),
  const chars = ~types.indexOf("chars");
  const absolute = isAbsolute(vars);
  const wordDelimiter = vars.wordDelimiter || " ";
  const space = wordDelimiter !== " " ? "" : absolute ? "&#173; " : " ";
  const wordEnd = `</${tag}>`;
  let wordIsOpen = 1;
  const specialChars = vars.specialChars
    ? typeof vars.specialChars === "function"
      ? vars.specialChars
      : findSpecialChars
    : null; // specialChars can be an array or a function. For performance reasons, we always set this local "specialChars" to a function to which we pass the remaining text and whatever the original vars.specialChars was so that if it's an array, it works with the _findSpecialChars() function.
  let text;
  let splitText;
  let i;
  let j;
  let l;
  let character;
  let hasTagStart;
  let testResult;
  const container = doc.createElement("div");
  const parent = element.parentNode;

  parent.insertBefore(container, element);
  container.textContent = element.nodeValue;
  parent.removeChild(element);
  element = container;
  text = getText(element);
  hasTagStart = text.indexOf("<") !== -1;

  if (vars.reduceWhiteSpace !== false) {
    text = text.replace(multipleSpacesExp, " ").replace(stripExp, "");
  }
  if (hasTagStart) {
    text = text.split("<").join("{{LT}}"); // we can't leave "<" in the string, or when we set the innerHTML, it can be interpreted as a node
  }
  l = text.length;
  splitText = (text.charAt(0) === " " ? space : "") + wordStart();
  for (i = 0; i < l; i++) {
    character = text.charAt(i);
    if (specialChars && (testResult = specialChars(text.substr(i), vars.specialChars))) {
      // look for any specialChars that were declared. Remember, they can be passed in like {specialChars:["मी", "पा", "है"]} or a function could be defined instead. Either way, the function should return the number of characters that should be grouped together for this "character".
      character = text.substr(i, testResult || 1);
      splitText += chars && character !== " " ? `${charStart() + character}</${tag}>` : character;
      i += testResult - 1;
    } else if (character === wordDelimiter && text.charAt(i - 1) !== wordDelimiter && i) {
      splitText += wordIsOpen ? wordEnd : "";
      wordIsOpen = 0;
      while (text.charAt(i + 1) === wordDelimiter) {
        // skip over empty spaces (to avoid making them words)
        splitText += space;
        i++;
      }
      if (i === l - 1) {
        splitText += space;
      } else if (text.charAt(i + 1) !== ")") {
        splitText += space + wordStart();
        wordIsOpen = 1;
      }
    } else if (character === "{" && text.substr(i, 6) === "{{LT}}") {
      splitText += chars ? `${charStart()}{{LT}}` + `</${tag}>` : "{{LT}}";
      i += 5;
    } else if (
      (character.charCodeAt(0) >= 0xd800 && character.charCodeAt(0) <= 0xdbff) ||
      (text.charCodeAt(i + 1) >= 0xfe00 && text.charCodeAt(i + 1) <= 0xfe0f)
    ) {
      // special emoji characters use 2 or 4 unicode characters that we must keep together.
      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
      splitText +=
        chars && character !== " "
          ? `${charStart() + text.substr(i, j)}</${tag}>`
          : text.substr(i, j);
      i += j - 1;
    } else {
      splitText += chars && character !== " " ? `${charStart() + character}</${tag}>` : character;
    }
  }
  element.outerHTML = splitText + (wordIsOpen ? wordEnd : "");
  hasTagStart && swapText(parent, "{{LT}}", "<"); // note: don't perform this on "element" because that gets replaced with all new elements when we set element.outerHTML.
};
const split = (element, vars, wordStart, charStart) => {
  const children = toArray(element.childNodes);
  const l = children.length;
  const absolute = isAbsolute(vars);
  let i;
  let child;
  if (element.nodeType !== 3 || l > 1) {
    vars.absolute = false;
    for (i = 0; i < l; i++) {
      child = children[i];
      child._next = child._isFirst = child._parent = child._wordEnd = null;
      if (child.nodeType !== 3 || /\S+/.test(child.nodeValue)) {
        if (absolute && child.nodeType !== 3 && getComputedStyle(child).display === "inline") {
          // if there's a child node that's display:inline, switch it to inline-block so that absolute positioning works properly (most browsers don't report offsetTop/offsetLeft properly inside a <span> for example)
          child.style.display = "inline-block";
          child.style.position = "relative";
        }
        child._isSplit = true;
        split(child, vars, wordStart, charStart); // don't split lines on child elements
      }
    }
    vars.absolute = absolute;
    element._isSplit = true;
    return;
  }
  splitRawText(element, vars, wordStart, charStart);
};

export default class SplitText {
  constructor(element, vars) {
    coreInitted || initCore();
    this.elements = toArray(element);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.originals = [];
    this.vars = vars || {};
    bonusValidated && this.split(vars);
  }

  split(vars) {
    this.isSplit && this.revert();
    this.vars = vars = vars || this.vars;
    this.originals.length = this.chars.length = this.words.length = this.lines.length = 0;
    let i = this.elements.length;
    const tag = vars.tag ? vars.tag : vars.span ? "span" : "div";
    const wordStart = cssClassFunc(vars.wordsClass, tag);
    const charStart = cssClassFunc(vars.charsClass, tag);
    let origHeight;
    let origWidth;
    let e;
    // we split in reversed order so that if/when we position:absolute elements, they don't affect the position of the ones after them in the document flow (shifting them up as they're taken out of the document flow).
    while (--i > -1) {
      e = this.elements[i];
      this.originals[i] = e.innerHTML;
      origHeight = e.clientHeight;
      origWidth = e.clientWidth;
      split(e, vars, wordStart, charStart);
      setPositionsAfterSplit(e, vars, this.chars, this.words, this.lines, origWidth, origHeight);
    }
    this.chars.reverse();
    this.words.reverse();
    this.lines.reverse();
    this.isSplit = true;
    return this;
  }

  revert() {
    const { originals } = this;
    if (!originals) {
      throw new Error("revert() call wasn't scoped properly.");
    }
    this.elements.forEach((e, i) => (e.innerHTML = originals[i]));
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
    return this;
  }

  static create(element, vars) {
    return new SplitText(element, vars);
  }
}
