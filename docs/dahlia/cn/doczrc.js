import { css } from 'docz-plugin-css'

export default {
  title: 'Dahlia',
  description:
    'An opinionated React Framework for building modern web applications',
  repository: 'https://github.com/forsigner/dahlia',
  hashRouter: true,
  base: '/dahlia-cn/',
  dest: '../../../pages/dahlia-cn',
  htmlContext: {
    head: {
      links: [
        // {
        // rel: 'stylesheet',
        // href: 'https://codemirror.net/theme/material.css',
        //   href:
        //     'https://cdn.jsdelivr.net/npm/codemirror-one-light-theme@1.0.0/one-light.css',
        // },
      ],
      raw: `
      <style>

        #root > div > div:first-of-type {
          width: 350px;
          min-width: 350px;
        }
        #root > div > div:first-of-type > div:first-of-type {
          padding: 30px;
          width: 350px;
          min-width: 350px;
        }
        #root > div > div:first-of-type > div:first-of-type > div:last-of-type {
          display: none;
        }
        #root > div > div:first-of-type > div:first-of-type > div:nth-child(2):before {
          background: transparent;
        }
        #root > div > div:first-of-type > div:first-of-type > div:nth-child(2) h1 {
          font-size: 2.5em;
          font-weight: 100;
        }
        .scrollbar-container {
          max-height: unset!important;
        }
        .CodeMirror {
          background-color: #f8f8f8 !important;
          font-size: 14px;
          height: 100%!important;
        }
        .CodeMirror pre {
          font-family: Hack, Monaco, Source Code Pro, Menlo, Courier New, monospace !important;
          line-height: 20.8px!important;
        }
        .CodeMirror-line {
          padding: 0 10px!important;
        }
        .CodeMirror-lines {
          padding: 10px 0!important;
        }
        .CodeMirror-linenumber {
          display: none;
          padding: 0 7px 0 5px!important;
        }
        .code-table {
          display: flex;
        }
        .code-table > div:first-of-type {
          flex: 1.5;
        }
        .code-table > div:last-of-type {
          flex: 1;
        }
        .code-table > div:last-child {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f6f9;
          font-family: Hack, Monaco, Source Code Pro, Menlo, Courier New, monospace !important;
          font-size: 4em;
          font-weight: 600;
          color: white;
        }
        .highlight {
          background: #ea567c;
          color: white;
          margin: 0 3px;
          padding: 4px 6px;
          border-radius: 3px;
        }
        .grommetux-meter {
          height: 70px;
        }
        .grommetux-meter__graphic {
          fill: transparent;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 15px;
          width: 70px;
          height: 70px;
        }
        .grommetux-meter__tracks {
          stroke: white;
        }
        .grommetux-meter__values {
          stroke: rgb(45, 55, 71);
        }
        code {
          background: #f4f6f9;
          color: #ea567c !important;
          margin: 0 3px;
          padding: 4px 6px;
          border-radius: 3px;
          font-family: Hack, Monaco, Source Code Pro, Menlo, Courier New, monospace !important;
          font-size: 14px;
        }
        a, a:visited, a:active {
          color: rgb(31, 182, 255);
          text-decoration: none;
          cursor: pointer;
        }
        p, div {
          border: none !important;
          font-size: 16px !important;
        }
        h1, h2, h3, h4, h5 {
          font-weight: bold !important;
          font-family: 'Hack, Monaco, Source Code Pro, Menlo, Courier New, monospace' !important;
        }

        li::before {
          content: '● ';
          margin-left: 5px;
          color: #CED4DE;
          font-weight: lighter !important;
          font-size: 8px !important;
          margin-right: 0px !important;
        }


.cm-s-one-light {
  font-family: Menlo, Monaco, 'Courier New', monospace;
  font-size: 12px;
  line-height: 18px;
  color: #50a14f;
  background-color: #fff;
}
.cm-s-one-light .CodeMirror-selected {
  background-color: #3e4451;
}
.cm-s-one-light .CodeMirror-gutter,
.cm-s-one-light .CodeMirror-gutters {
  border: none;
  background-color: #fff;
}
.cm-s-one-light .CodeMirror-linenumber,
.cm-s-one-light .CodeMirror-linenumbers {
  color: #9d9d9f !important;
  background-color: transparent;
}
.cm-s-one-light .CodeMirror-lines {
  color: #383a42 !important;
  background-color: transparent;
}
.cm-s-one-light .CodeMirror-cursor {
  border-left: 2px solid #56b6c2 !important;
}
/* addon: edit/machingbrackets.js & addon: edit/matchtags.js */
.cm-s-one-light .CodeMirror-matchingbracket,
.cm-s-one-light .CodeMirror-matchingtag {
  border-bottom: 2px solid #56b6c2;
  color: #383a42 !important;
  background-color: transparent;
}
.cm-s-one-light .CodeMirror-nonmatchingbracket {
  border-bottom: 2px solid #e06c75;
  color: #383a42 !important;
  background-color: transparent;
}
/* addon: fold/foldgutter.js */
.cm-s-one-light .CodeMirror-foldmarker,
.cm-s-one-light .CodeMirror-foldgutter,
.cm-s-one-light .CodeMirror-foldgutter-open,
.cm-s-one-light .CodeMirror-foldgutter-folded {
  border: none;
  text-shadow: none;
  color: #9d9d9f !important;
  background-color: transparent;
}
/* addon: selection/active-line.js */
.cm-s-one-light .CodeMirror-activeline-background {
  // background-color: rgba(153, 187, 255, 0.04);
  background-color: #000;
}

/* basic syntax */
.cm-s-one-light .cm-header {
  color: #e06c75;
}
.cm-s-one-light .cm-quote {
  color: #9d9d9f;
  font-style: italic;
}
.cm-s-one-light .cm-negative {
  color: #e06c75;
}
.cm-s-one-light .cm-positive {
  color: #e06c75;
}
.cm-s-one-light .cm-strong {
  color: #e45649;
  font-weight: bold;
}
.cm-s-one-light .cm-header .cm-strong {
  color: #e45649;
  font-weight: bold;
}
.cm-s-one-light .cm-em {
  color: #c678dd;
  font-style: italic;
}
.cm-s-one-light .cm-header .cm-em {
  color: #c678dd;
  font-style: italic;
}
.cm-s-one-light .cm-tag {
  color: #22863a;
  
}
.cm-s-one-light .cm-attribute {
  color: #6f42c1;
}
.cm-s-one-light .cm-link {
  color: #50a14f;
  border-bottom: solid 1px #50a14f;
}
.cm-s-one-light .cm-builtin {
  color: #e06c75;
}
.cm-s-one-light .cm-keyword {
  color: #0184bc;
}
.cm-s-one-light .cm-def {
  color: #444;
}
.cm-s-one-light .cm-atom {
  color: #0184bc;
}
.cm-s-one-light .cm-number {
  color: #f08d49;
}
.cm-s-one-light .cm-property {
  color: #e45649;
} /* original: #383a42 */
.cm-s-one-light .cm-qualifier {
  color: #e45649;
}
.cm-s-one-light .cm-variable,
.cm-s-one-light .cm-variable-2 {
  color: #444;
}
.cm-s-one-light .cm-string,
.cm-s-one-light .cm-string-2 {
  color: #50a14f;
}
.cm-s-one-light .cm-punctuation {
  color: #383a42;
}
.cm-s-one-light .cm-operator {
  color: #56b6c2;
} /* original: #383a42 */
.cm-s-one-light .cm-meta {
  color: #808080;
}
.cm-s-one-light .cm-bracket {
  color: #383a42;
}
.cm-s-one-light .cm-comment {
  color: #9d9d9f;
  font-style: italic;
}
.cm-s-one-light .cm-error {
  color: #e06c75;
}
/* css syntax corrections */
.cm-s-one-light .cm-m-css.cm-variable {
  color: #828997;
}
.cm-s-one-light .cm-m-css.cm-property {
  color: #383a42;
}
.cm-s-one-light .cm-m-css.cm-atom {
  color: #0184bc;
}
.cm-s-one-light .cm-m-css.cm-builtin {
  color: #56b6c2;
}
/* lua syntax corrections */
.cm-s-one-light .cm-m-lua.cm-variable {
  color: #56b6c2;
}

        .cm-s-one-light .CodeMirror-matchingbracket, .cm-s-one-light .CodeMirror-matchingtag {
          border-bottom: none;
        }
        .cm-s-one-light .cm-type {
          color: #0184bc;
        }

        </style>
        `,
    },
  },
  lineNumbers: false,
  themeConfig: {
    //mode: 'dark',
    // codemirrorTheme: 'material',
    codemirrorTheme: 'one-light',
    lineNumbers: false,
    colors: {
      primary: '#ea567c',
      sidebarBg: 'white',
    },
    styles: {
      body: {
        fontFamily:
          'Hack, Monaco, Source Code Pro, Menlo, Courier New, monospace',
        fontSize: '16px !important',
      },
      h1: {
        fontSize: 36,
      },
      h2: {
        fontSize: 28,
      },
      h3: {
        fontSize: 24,
      },

      h4: {
        fontSize: 18,
      },

      p: {
        fontSize: 16,
        fontSize: '16px !important',
      },

      div: {
        fontSize: 16,
      },
    },
  },
  plugins: [css()],
}
