// @flow

export type KeyboardAction =
  | {|
      type: "EnterHintsMode",
      mode: HintsMode,
    |}
  | {|
      type: "ExitHintsMode",
    |};

export type KeyboardShortcut = {|
  key: string,
  code: string,
  altKey: boolean,
  ctrlKey: boolean,
  metaKey: boolean,
  shiftKey: boolean,
|};

export type KeyboardMapping = {|
  shortcut: KeyboardShortcut,
  action: KeyboardAction,
|};

export type KeyboardOptions = {|
  suppressByDefault: boolean,
  sendAll: boolean,
|};

export type HintsMode = "Click" | "BackgroundTab" | "ForegroundTab";
