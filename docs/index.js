// @flow strict-local

import * as React from "preact";

import config from "../project.config";
import KeyboardShortcut, { shortcuts } from "./KeyboardShortcuts";
import Page from "./Page";
import render from "./render";
import Scripts from "./Scripts";
import ShortcutsSummary from "./ShortcutsSummary";

const SECTIONS = [
  {
    id: "what",
    title: "What is Link Hints?",
    content: (
      <>
        <p>
          Link Hints is a browser extension that complements the built-in
          keyboard shortcuts with ones for clicking.
        </p>
        <p>
          Press {shortcuts.EnterHintsMode_Click}. This makes little yellow boxes
          with letters, called <dfn>hints,</dfn> appear next to links (and other
          clickable things). Type the letters to click the link. Alternatively,
          hold <KeyboardShortcut shift /> and type a bit of the link text.
        </p>
        <p>
          There are a few variations on the above shortcut for opening links in
          new tabs or selecting text.
        </p>
        <p>The keyboard shortcuts and hints are fully customizable.</p>
      </>
    ),
  },
  {
    id: "not",
    title: (
      <>
        What is Link Hints <em>not?</em>
      </>
    ),
    content: (
      <>
        <p>Here are some features that Link Hints won’t implement.</p>
        <ul>
          <li>Vim-like keyboard shortcuts.</li>
          <li>Custom actions.</li>
          <li>Scrolling.</li>
        </ul>
        <p>
          I’d like to focus on link hinting and do it really well. That’s
          complicated enough.
        </p>
        <p>
          I’m interested in{" "}
          <a href={`${config.meta.issues}6`}>
            making Link Hints work together with Vim plugins
          </a>
          , though.
        </p>
      </>
    ),
  },
  {
    id: "differences",
    title: "How is Link Hints different?",
    content: (
      <>
        <p>
          Using hints to click links is not at all a new idea. What does Link
          Hints bring to the table?
        </p>
        <p>
          Link Hints keeps track of all clickable elements in the background
          when your browser is idle. This makes hints appear quickly regardless
          of page size.
        </p>
        <p>
          Other than accurately finding clickable elements, Link Hints also
          focuses on placing the hints intuitively and being generally easy to
          use and configure.
        </p>
        <p>For the technically interested, here’s a list of fancy things:</p>
        <ul>
          <li>
            Full{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM">
              Shadow DOM
            </a>{" "}
            support, including{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode">
              “closed” shadow roots
            </a>
            .
          </li>
          <li>
            Seamless{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe">
              iframe
            </a>{" "}
            support.
          </li>
          <li>
            Detection of covered elements using{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/elementFromPoint">
              elementFromPoint
            </a>
            .
          </li>
          <li>
            Background tracking of visible elements using{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">
              MutationObserver
            </a>
            ,{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">
              IntersectionObserver
            </a>{" "}
            and{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback">
              requestIdleCallback
            </a>
            .
          </li>
          <li>Tracking of elements with click listeners.</li>
          <li>Tracking of scrollable elements in Firefox.</li>
          <li>Tracking elements and updating hints while showing them.</li>
          <li>Text based hint positioning.</li>
          <li>
            Hint generation using weighted{" "}
            <a href="https://en.wikipedia.org/wiki/Huffman_coding">
              Huffman coding
            </a>
            .
          </li>
          <li>Links with the same URL get the same hint.</li>
          <li>
            Elaborate workarounds for Firefox’s overzealous popup blocker and
            CSP rules.
          </li>
          <li>Support for different keyboard layouts.</li>
        </ul>
      </>
    ),
  },
  {
    id: "permissions",
    title: "What permissions does Link Hints need?",
    content: (
      <>
        <p>
          Browser extensions ask for{" "}
          <a href="https://support.mozilla.org/en-US/kb/permission-request-messages-firefox-extensions">
            permission
          </a>{" "}
          to certain features when installed. This is to prevent extensions from
          silently stealing all your browsing data behind your back.
        </p>
        <p>These are the permissions Link Hints needs:</p>
        <ul>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/permission-request-messages-firefox-extensions#w_access-your-data-for-all-websites">
              Access your data for all websites
            </a>
            : The whole point of Link Hints is to run on all websites, monitor
            them for links and let you click them. Link Hints never sends any
            data anywhere.
          </li>
          <li>
            Storage: Link Hints needs to be able to save your options. (This one
            might not appear in the installation UI, but most extensions use
            it.)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "issues",
    title: "Why doesn’t Link Hints work on some pages?",
    content: (
      <>
        <p>
          Browser extensions are not allowed to run on some pages, such as
          Chrome’s and Firefox’s extension stores, the New Tab page and internal
          settings pages.
        </p>
        <p>
          The Link Hints toolbar button is faded out to indicate this. Regular
          look: <span className="ToolbarButton" />. Faded:{" "}
          <span className="ToolbarButtonDisabled" />.
        </p>
        <p>Other possible reasons include:</p>
        <ul>
          <li>
            The web page area is not focused. The Link Hints shortcuts only work
            when the web page area is focused, not when the address bar or the
            dev tools or any other part of the browser has focus. To move focus
            back to the page, either click somewhere on the page with the mouse,
            or press <KeyboardShortcut press="F6" /> one or two times. This
            isn’t ideal, but part of the limitations of browser extensions.
          </li>
          <li>You’re using Responsive Design Mode in Firefox.</li>
          <li>
            The site is using some fancy technique that Link Hints does not
            support yet, or there’s a bug in Link Hints. Please{" "}
            <a href={config.meta.newIssue}>report an issue</a>!
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "missing-hints",
    title: "Why don’t some elements get hints?",
    content: (
      <>
        <p>Finding which elements should get hints is tricky business.</p>
        <p>
          First off, Link Hints need a clue from the site that an element is
          clickable. If the site is using <em>semantic markup</em> that’s easy.
          If it isn’t, Link Hints still tries to detect which elements have
          click listeners attached to them.
        </p>
        <p>
          Sometimes, though, there’s nothing at all showing that the element is
          clickable. In such cases, the best thing would be if the site could
          change their markup to be more accessible. That would be a win not
          only for Link Hints users, but also for screen reader users and for
          accessibility in general.
        </p>
        <p>
          Link Hints has special workarounds for some sites such as Twitter and
          Gmail, but such hacks should be kept to a minimum.
        </p>
        <p>
          It could also be that the element is legit clickable, but an
          improvement is needed in Link Hints’ detection logic.
        </p>
        <p>
          Finally, it could also be that Link Hints did identify the element as
          clickable, but thought that it wasn’t visible. For example, Link Hints
          avoids giving hints to elements behind dropdown menus, but it could of
          course be confused.
        </p>
        <p>
          Feel free to <a href={config.meta.newIssue}>report issues</a> about
          missing hints!
        </p>
      </>
    ),
  },
  {
    id: "story",
    title: "What is the story behind Link Hints?",
    content: (
      <>
        <p>
          In 2013 <a href="https://github.com/lydell">Simon Lydell</a> started
          contributing to the{" "}
          <a href="https://github.com/akhodakivskiy/VimFx">VimFx</a> browser
          extension, making significant work on its link hinting feature. After
          a while, he became the main developer.
        </p>
        <p>
          When VimFx was discontinued in 2017 (due to Firefox dropping their old
          extension system in favor of cross-browser <em>Web Extensions</em>),
          Simon started thinking about making a new extension, porting his
          favorite feature of VimFx – link hinting.
        </p>
        <p>
          During experimentation in the early 2018, a way of keeping track of
          clickable elements in the background was discovered (for the
          technically interested, a combination of{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">
            MutationObserver
          </a>
          ,{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">
            IntersectionObserver
          </a>{" "}
          and{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback">
            requestIdleCallback
          </a>
          ). This showed potential for greatly improving on the VimFx link
          hinting.
        </p>
        <p>
          A couple of months later, the first commit of Link Hints was made
          (then called “Synth”). Soon it was stable enough to be used for
          day-to-day browsing. After almost two years of experimentation,
          development and real-world usage, Link Hints is planned to be released
          during the second half of 2019.
        </p>
      </>
    ),
  },
];

export default () =>
  render(
    <Page
      title="Link Hints"
      description="A browser extension that lets you click with your keyboard."
      css={config.docs.indexCss.output}
    >
      <Header />
      <Nav />

      <main className="Container">
        <Reasons />

        <div className="Demos">
          <Demo
            title={
              <span>
                Click using <em>hints.</em>
              </span>
            }
          />
          <Demo title="Filter by text." filterByText />
        </div>

        <ShortcutsSummary />

        <div className="QuickLinks">
          <ul>
            {SECTIONS.map(section => (
              <li key={section.id}>
                <a href={`#${section.id}`} data-quick={section.id}>
                  #{section.id}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {SECTIONS.map(section => (
          <section key={section.id} id={section.id}>
            <h2>
              <a href={`#${section.id}`}>{section.title}</a>
            </h2>
            {section.content}
          </section>
        ))}

        <p id="note">
          🚧 Link Hints is under development and is not yet released. 🚧
        </p>
      </main>

      <Scripts macifyKbd observeQuickLinks />
    </Page>
  );

function Header() {
  return (
    <header className="Header">
      <div className="Header-inner Container">
        <div className="Header-titleWrapper">
          <h1 className="Header-title">Link Hints</h1>
          <p className="Header-subTitle">
            A browser extension that lets you click with your keyboard.
          </p>
        </div>

        <Keyboard />

        <p className="Header-buttons">
          <a href="#note" className="Button">
            Add to Firefox
          </a>
          <a href="#note" className="Button">
            Add to Chrome
          </a>
        </p>
      </div>
    </header>
  );
}

function Keyboard() {
  return (
    <div className="Keyboard">
      <div>
        {Array.from({ length: 12 }, () => (
          <div />
        ))}
      </div>
      <div>
        {Array.from({ length: 11 }, (_, index) => (
          <div className={index === 6 ? "Keyboard-icon" : undefined} />
        ))}
      </div>
      <div>
        {Array.from({ length: 10 }, () => (
          <div />
        ))}
      </div>
    </div>
  );
}

const NAV = [
  {
    href: config.meta.repo,
    emoji: "📦",
    text: "GitHub",
  },
  {
    href: config.meta.changelog,
    emoji: "📝",
    text: "Changelog",
  },
  {
    href: config.meta.newIssue,
    emoji: "🐞",
    text: "Report issue",
  },
  {
    href: `${config.docs.root}/${config.docs.tutorial.output}`,
    emoji: "📖",
    text: "Tutorial",
  },
];

function Nav() {
  return (
    <nav>
      <ul className="Container Container--noPaddingSmall">
        {NAV.map(item => (
          <li key={item.href}>
            <a href={item.href}>
              <span className="emoji">{item.emoji}</span> {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const REASONS = [
  {
    emoji: "💻",
    text: "Have a bad touchpad?",
  },
  {
    emoji: "🖱",
    text: "Trouble using a mouse?",
  },
  {
    emoji: "⌨️",
    text: "Love keyboard shortcuts?",
  },
];

function Reasons() {
  return (
    <ul className="Reasons">
      {REASONS.map(reason => (
        <li key={reason.emoji}>
          <span className="emoji">{reason.emoji}</span> {reason.text}
        </li>
      ))}
    </ul>
  );
}

function Demo({
  title,
  filterByText = false,
}: {|
  title: React.Node,
  filterByText?: boolean,
|}) {
  function Hint({
    hint2,
    highlighted = false,
    children,
  }: {|
    hint2?: string,
    highlighted?: boolean,
    children: string,
  |}) {
    return filterByText && hint2 == null ? null : (
      <span
        className={`hint ${filterByText && highlighted ? "highlighted" : ""}`}
      >
        {filterByText ? hint2 : children}
      </span>
    );
  }

  function Match({ children }: {| children: string |}) {
    return (
      <span className={filterByText ? "matchedText" : undefined}>
        {children}
      </span>
    );
  }

  return (
    <figure>
      <div className="Demo" aria-hidden="true">
        <div className="Demo-inner">
          <div className="Demo-bar">
            <div className="Demo-input" onClick="">
              <span className="Demo-relative">
                <Hint>F</Hint>lorem ipsum
              </span>
            </div>
            <div className="Demo-button" onClick="">
              <span className="Demo-relative">
                <Hint>J</Hint>Setar
              </span>
            </div>
          </div>
          <div className="Demo-box">
            <p>
              <a>
                <Hint>D</Hint>Lorem ipsum
              </a>
            </p>
            <p>Dolor sit amet, consectetur adipiscing elit.</p>
            <p>
              <a>
                <Hint>L</Hint>Sed do
              </a>
              <a>
                <Hint hint2="F" highlighted>
                  R
                </Hint>
                Eius<Match>lab</Match>
              </a>
              <a>
                <Hint>O</Hint>Tempor
              </a>
            </p>
          </div>
          <div className="Demo-box">
            <p>
              <a>
                <Hint hint2="J">K</Hint>Incididunt ut <Match>lab</Match>ore
              </a>
            </p>
            <p>Et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <p>
              <a>
                <Hint>A</Hint>Nostrud
              </a>
              <a>
                <Hint>E</Hint>Exercitation
              </a>
              <a>
                <Hint>H</Hint>Ullamco
              </a>
            </p>
          </div>
          <div className="Demo-box">
            <p>
              <a>
                <Hint hint2="D">S</Hint>
                <Match>Lab</Match>oris nisi aliquip
              </a>
            </p>
            <p>
              Ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>
            <p>
              <a>
                <Hint>U</Hint>In voluptate
              </a>
              <a>
                <Hint>I</Hint>Velit esse
              </a>
              <a>
                <Hint>W</Hint>Cillum
              </a>
            </p>
          </div>
          {filterByText && <span className="status">lab</span>}
        </div>
      </div>

      <figcaption>{title}</figcaption>
    </figure>
  );
}
