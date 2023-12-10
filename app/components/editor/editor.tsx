"use client";

import { useEffect, useRef } from "react";
import { EditorView, lineNumbers } from "@codemirror/view";
import { history } from "@codemirror/commands";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { bracketMatching, syntaxHighlighting } from "@codemirror/language";
import { oneDarkHighlightStyle, oneDark } from "@codemirror/theme-one-dark";
import { EditorState } from "@codemirror/state";
import { graphql } from "cm6-graphql";
import { defaultTextEditor } from "@/app/constants/constants";

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myTheme = EditorView.theme({
      "&": {
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(245 239 251)",
        display: "flex",
      },
      ".cm-scroller": { overflow: "auto" },
      ".cm-content, .cm-gutter": { minHeight: "200px", width: "100%" },
      ".cm-gutters": {
        backgroundColor: "rgb(240 231 250)",
      },
    });
    if (editorRef.current && !editorRef.current.firstChild) {
      const state = EditorState.create({
        doc: defaultTextEditor,
        extensions: [
          myTheme,
          bracketMatching(),
          closeBrackets(),
          history(),
          autocompletion(),
          lineNumbers(),
          oneDark,
          syntaxHighlighting(oneDarkHighlightStyle),
          graphql(),
        ],
      });
      new EditorView({
        state,
        parent: editorRef.current!,
      });
    }
  }, []);

  return <div ref={editorRef} className="h-full w-1/2 flex shadow-xl" />;
};

export default Editor;
