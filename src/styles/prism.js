import { css } from 'styled-components';
import theme from '../../config/theme';

// const prism = css`
// .language-css .token.string {
//   color: #9a6e3a;
//   background: hsla(0, 0%, 100%, 0.5);
// }
// .language-css .token.string.url {
//   text-decoration: underline;
// }
// .language-html .language-css .token.punctuation {
//   color: #d4d4d4;
// }
// .language-html .language-javascript .token.punctuation {
//   color: #d4d4d4;
// }
// .language-html .token.punctuation {
//   color: #808080;
// }
// .language-regex .token.anchor {
//   color: #dcdcaa;
// }
// .line-highlight {
//   background: #f7ebc6;
//   box-shadow: inset 5px 0 0 #f7d87c;
//   left: 0;
//   line-height: inherit;
//   margin-top: 1em;
//   padding: inherit 0;
//   pointer-events: none;
//   position: absolute;
//   right: 0;
//   white-space: pre;
//   z-index: 0;
// }
// .namespace {
//   opacity: 0.7;
// }
// .style .token.string {
//   color: #9a6e3a;
//   background: hsla(0; 0%; 100%; 0.5);
// }
// :not(pre) > code[class*='language-'] {
//   background: #f9f2f4;
//   padding: 0.1em 0.3em;
//   border-radius: 0.3em;
//   white-space: normal;
//   color: #db4c69;
// }
// .token .atrule {
//   color: #ce9178;
// }
// .token .atrule.rule {
//   color: #c586c0;
// }
// .token .atrule.url {
//   color: #9cdcfe;
// }
// .token .atrule.url.function {
//   color: #dcdcaa;
// }
// .token .atrule.url.punctuation {
//   color: #d4d4d4;
// }
// attr-name {
//   color: #9cdcfe;
// }
// attr-value {
//   color: #ce9178;
// }
// attr-value.punctuation {
//   color: #ce9178;
// }
// attr-value.punctuation.attr-equals {
//   color: #d4d4d4;
// }
// .token .bold {
//   font-weight: bold;
// }
// .token .boolean {
//   color: #569cd6;
// }
// .token .builtin {
//   color: #ce9178;
// }
// .token .cdata {
//   color: #808080;
// }
// .token .char {
//   color: #ce9178;
// }
// class-name {
//   color: #4ec9b0;
// }

// code[class*='language-'] {
//   -moz-hyphens: none;
//   -moz-tab-size: 4;
//   -o-tab-size: 4;
//   -webkit-hyphens: none;
//   background: none;
//   color: #d4d4d4;
//   direction: ltr;
//   font-family: 'Menlo' 'Monaco' 'Consolas' 'Andale Mono' 'Ubuntu Mono'
//     'Courier New' monospace;
//   font-size: 13px;
//   hyphens: none;
//   line-height: 1.5;
//   -ms-hyphens: none;
//   tab-size: 4;
//   text-align: left;
//   text-shadow: none;
//   white-space: pre;
//   word-break: normal;
//   word-spacing: normal;
//   word-wrap: normal;
// }
// code[class*='language-'] *::selection {
//   text-shadow: none;
//   background: #75a7ca;
// }
// code[class*='language-'] ::-moz-selection {
//   text-shadow: none;
//   background: #b3d4fc;
// }
// code[class*='language-'] ::selection {
//   text-shadow: none;
//   background: #b3d4fc;
// }
// code[class*='language-']::-moz-selection {
//   text-shadow: none;
//   background: #b3d4fc;
// }
// code[class*='language-']::selection {
//   text-shadow: none;
//   background: #75a7ca;
// }
// code[class*='language-css'] {
//   color: #ce9178;
// }
// code[class*='language-html'] {
//   color: #d4d4d4;
// }
// code[class*='language-javascript'] {
//   color: #9cdcfe;
// }
// code[class*='language-jsx'] {
//   color: #9cdcfe;
// }
// code[class*='language-tsx'] {
//   color: #9cdcfe;
// }
// code[class*='language-typescript'] {
//   color: #9cdcfe;
// }
// .token .comment {
//   color: #6a9955;
// }
// .token .console {
//   color: #9cdcfe;
// }
// .token .constant {
//   color: #9cdcfe;
// }
// .token .deleted {
//   color: #ce9178;
// }
// .token .doctype {
//   color: slategray;
// }
// .token .doctype.doctype-tag {
//   color: #569cd6;
// }
// .token .doctype.name {
//   color: #9cdcfe;
// }
// .token .entity {
//   color: #569cd6;
//   background: hsla(0; 0%; 100%; 0.5);
//   cursor: help;
// }
// .token .escape {
//   color: #d7ba7d;
// }
// .token .exports.maybe-class-name {
//   color: #9cdcfe;
// }
// .token .function {
//   color: #dcdcaa;
// }
// .token .function.maybe-class-name {
//   color: #dcdcaa;
// }
// .token .important {
//   color: #569cd6;
//   font-weight: bold;
// }
// .token .imports.maybe-class-name {
//   color: #9cdcfe;
// }
// .token .inserted {
//   color: #b5cea8;
// }
// .token .interpolation {
//   color: #9cdcfe;
// }
// .token .italic {
//   font-style: italic;
// }
// .token .keyword {
//   color: #569cd6;
// }
// .token .keyword.control-flow {
//   color: #c586c0;
// }
// .token .keyword.module {
//   color: #c586c0;
// }
// .token .maybe-class-name {
//   color: #4ec9b0;
// }
// .token .namespace {
//   opacity: 0.7;
//   color: #4ec9b0;
// }
// .token .number {
//   color: #b5cea8;
// }
// .token .operator {
//   color: #d4d4d4;
//   background: hsla(0, 0%, 100%, 0.5);
// }
// .token .operator.arrow {
//   color: #569cd6;
// }
// .token .parameter {
//   color: #9cdcfe;
// }
// pre[class*='language-'] {
//   color: #d4d4d4;
//   background: #1e1e1e;
//   text-shadow: none;
//   font-family: 'Menlo' 'Monaco' 'Consolas' 'Andale Mono' 'Ubuntu Mono'
//     'Courier New' 'monospace';
//   font-size: 13px;
//   hyphens: none;
//   line-height: 1.5;
//   margin: 0.5em 0;
//   -ms-hyphens: none;
//   overflow: auto;
//   padding: 1em;
//   tab-size: 4;
//   text-align: left;
//   text-shadow: none;
//   white-space: pre;
//   word-break: normal;
//   word-spacing: normal;
//   word-wrap: normal;
// }
// pre[class*='language-'] *::selection {
//   text-shadow: none;
//   background: #75a7ca;
// }
// pre[class*='language-'] ::-moz-selection {
//   text-shadow: none;
//   background: #b3d4fc;
// }
// pre[class*='language-'] ::selection {
//   text-shadow: none;
//   background: #b3d4fc;
// }
// pre[class*='language-'] > code[class*='language-'] {
//   position: relative;
//   z-index: 1;
// }
// pre[class*='language-']::-moz-selection {
//   text-shadow: none;
//   background: #b3d4fc;
// }
// pre[class*='language-']::selection {
//   text-shadow: none;
//   background: #75a7ca;
// }
// pre[class*='language-css'] {
//   color: #ce9178;
// }
// pre[class*='language-html'] {
//   color: #d4d4d4;
// }
// pre[class*='language-javascript'] {
//   color: #9cdcfe;
// }
// pre[class*='language-jsx'] {
//   color: #9cdcfe;
// }
// pre[class*='language-tsx'] {
//   color: #9cdcfe;
// }
// pre[class*='language-typescript'] {
//   color: #9cdcfe;
// }
// pre[data-line] {
//   position: relative;
// }
// .token .prolog {
//   color: #6a9955;
// }
// .token .property {
//   color: #9cdcfe;
// }
// .token .punctuation {
//   color: #d4d4d4;
// }
// .token .punctuation.interpolation-punctuation {
//   color: #569cd6;
// }
// .token .regex {
//   color: #d16969;
// }
// .token .selector {
//   color: #d7ba7d;
// }
// .token .string {
//   color: #ce9178;
// }
// .token .symbol {
//   color: #b5cea8;
// }
// .token .tag {
//   color: #569cd6;
// }
// .token .tag.punctuation {
//   color: #808080;
// }
// .token .unit {
//   color: #b5cea8;
// }
// .token .url {
//   color: #9a6e3a;
//   background: hsla(0, 0%, 100%, 0.5);
// }
// .token .variable {
//   color: #9cdcfe;
// }
// `

const prism = css`
  .gatsby-highlight-code-line {
    background-color: rgb(255 255 255 / 17%);
    display: block;
    overflow: auto;
  }
  .gatsby-highlight-code-line:before {
    content: '+';
    position: absolute;
    left: 7px;
    font-size: 14px;
    color: white;
  }
  p > code,
  li > code {
    color: #f8f8f2;
    background: #131316;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    padding: 0.4em 0.5em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 10px;
    tab-size: 4;
    hyphens: none;
  }

  code[class*='language-text'] {
    background: #cdcdcd;
    border-radius: 10px;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    background: none;
    font-size: 15px;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 10px;
    &::-webkit-scrollbar-thumb {
      border-radius: 0 0 10px 10px;
      background: ${theme.colors.primary.base};
    }
    &::-webkit-scrollbar-track {
      background: ${theme.colors.black.light};
      border-radius: 0 0 10px 10px;
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
  }

  pre[class*='language-'] {
    background: #282c34;
  }

  p > code[class*='language-'],
  li > code[class*='language-'] {
    border-radius: 0.3em;
    background: rgba(52, 152, 219, 0.2);
    color: var(--color-md-text);
    padding: 2px 6px;
    position: relative;
  }

  .token.operator {
    color: #bc78d7;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }
  .token.punctuation {
    color: #88c6be;
  }
  .namespace {
    opacity: 0.7;
  }
  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #fc929e;
  }
  .token.boolean,
  .token.number {
    color: #ae81ff;
  }

  .token.attr-name {
    color: #c5a5c5;
  }
  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #8dc891;
  }
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #f8f8f2;
  }
  .token.attr-value,
  .token.atrule,
  .token.function {
    color: #79b6f2;
  }
  .token.class-name {
    color: #fac863;
  }
  .token.keyword {
    color: #c5a5c5;
  }
  .token.regex,
  .token.important {
    color: #fd971f;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
`;

export default prism;
