import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><marquee>Johnny</marquee></p>
      </header>
      <header className="App-body">
        <dl><dt>CSS (Cascading Style Sheets)</dt><dd>a style sheet language used for describing the look and formatting of a document written in markup language</dd></dl>
        <dl><dt>image</dt><dd>A serialized copy of the entire state of a computer system stored in some non-volatile form such as a file. A system is said to be capable of using system images if it can be shut down and later restored to exactly the same state.</dd></dl>
        <dl><dt>container</dt><dd>An operating system-level virtualization or application-level virtualization over multiple network resources so that software applications can run in isolated user spaces called containers in any cloud or non-cloud environment, regardless of type or vendor.</dd></dl>
        <dl><dt>volume</dt><dd>A single accessible storage area with a single file system, typically (though not necessarily) resident on a single partition of a hard disk. Although a volume might be different from a physical disk drive, it can still be accessed with an operating system's logical interface. However, a volume differs from a partition.</dd></dl>
      </header>
    </div>
  );
}

export default App;
