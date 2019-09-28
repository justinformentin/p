import { css } from 'react-emotion';
import theme from '../../config/theme';

const prism = css`
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
      background: ${theme.colors.primary.base};
    }
    &::-webkit-scrollbar-track {
      background: ${theme.colors.black.light};
    }
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
  }

  pre[class*='language-'] {
    background: #282c34;
  }

  p > code[class*='language-'],
  li > code[class*='language-'] {
    border-radius: 0.3em;
    background: rgba(52, 152, 219, 0.2);
    color: #2e3246;
    bottom: 2px;
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
