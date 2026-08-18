// import "./App.css";
// import { Editor } from "@monaco-editor/react";
// import { MonacoBinding } from "y-monaco";
// import { useRef, useMemo, useState } from "react";
// import * as Y from "yjs";
// import { SocketIOProvider } from "y-socket.io";

// function App() {
//   const editorRef = useRef(null);
//   const providerRef = useRef(null);

//   const [username, setUsername] = useState(() => {
//     return (
//       new URLSearchParams(window.location.search).get("username") || ""
//     );
//   });

//   const [users, setUsers] = useState([]);

//   const ydoc = useMemo(() => {
//     return new Y.Doc();
//   }, []);

//   const ytext = useMemo(() => {
//     return ydoc.getText("monaco");
//   }, [ydoc]);

//   const handleMount = (editor) => {
//     editorRef.current = editor;

//     // Connect to Socket.IO / Yjs server
//     const provider = new SocketIOProvider("http://localhost:3000", "monaco", ydoc, { autoConnect: true });

//     providerRef.current = provider;

//     // Check connection status
//     provider.on("status", ({ status }) => {
//       console.log("Y-Socket.IO status:", status);
//     });

//     // Set current user's username
//     provider.awareness.setLocalStateField("user", {
//       username: username,
//     });

//     // Update connected users
//     const updateUsers = () => {
//       const states = Array.from(
//         provider.awareness.getStates().values()
//       );

//       const connectedUsers = states
//         .filter(
//           (state) =>
//             state &&
//             state.user &&
//             state.user.username
//         )
//         .map((state) => state.user);

//       setUsers(connectedUsers);
//     };

//     // Run once when connected
//     updateUsers();

//     // Run whenever users join/leave
//     provider.awareness.on("change", updateUsers);

//     // Connect Yjs document with Monaco
//     const binding = new MonacoBinding(
//       ytext,
//       editor.getModel(),
//       new Set([editor]),
//       provider.awareness
//     );

//     // Cleanup
//     return () => {
//       binding.destroy();

//       provider.awareness.off(
//         "change",
//         updateUsers
//       );

//       provider.disconnect();
//     };
//   };

//   // Join button
//   const handleJoin = (e) => {
//     e.preventDefault();

//     const name = e.target.username.value.trim();

//     if (!name) {
//       return;
//     }

//     setUsername(name);

//     window.history.pushState(
//       {},
//       "",
//       "?username=" + encodeURIComponent(name)
//     );
//   };

//   // --------------------------------
//   // LOGIN PAGE
//   // --------------------------------

//   if (!username) {
//     return (
//       <main className="login-page">
//         <form
//           onSubmit={handleJoin}
//           className="login-form"
//         >
//           <h1>Collaborative Code Editor</h1>

//           <input
//             type="text"
//             placeholder="Enter your username"
//             name="username"
//             className="username-input"
//           />

//           <button
//             type="submit"
//             className="join-button"
//           >
//             Join
//           </button>
//         </form>
//       </main>
//     );
//   }

//   // --------------------------------
//   // COLLABORATIVE EDITOR
//   // --------------------------------

//   return (
//     <main className="editor-page">

//       {/* USERS SIDEBAR */}

//       <aside className="users-panel">

//         <h1>Users</h1>

//         <div className="current-user">
//           You: {username}
//         </div>

//         <div className="users-list">

//           {users.map((user, index) => (
//             <div
//               key={index}
//               className="user-item"
//             >
//               <span className="online-dot"></span>

//               {user.username}
//             </div>
//           ))}

//         </div>

//       </aside>

//       {/* MONACO EDITOR */}

//       <section className="editor-container">

//         <Editor
//           height="100%"
//           width="100%"
//           defaultLanguage="javascript"
//           defaultValue="// Start writing your code..."
//           theme="vs-dark"
//           onMount={handleMount}
//           options={{
//             fontSize: 16,
//             minimap: {
//               enabled: false,
//             },
//             automaticLayout: true,
//           }}
//         />

//       </section>

//     </main>
//   );
// }

// export default App;


import "./App.css";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo, useState } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";

function App() {
  const editorRef = useRef(null);
  const providerRef = useRef(null);

  const [username, setUsername] = useState(() => {
    return (
      new URLSearchParams(window.location.search).get(
        "username"
      ) || ""
    );
  });

  const [users, setUsers] = useState([]);

  const ydoc = useMemo(() => {
    return new Y.Doc();
  }, []);

  const ytext = useMemo(() => {
    return ydoc.getText("monaco");
  }, [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;

    // Same server par Socket.IO connection
    const provider = new SocketIOProvider(
      window.location.origin,
      "monaco",
      ydoc,
      {
        autoConnect: true,
      }
    );

    providerRef.current = provider;

    provider.on("status", ({ status }) => {
      console.log(
        "Y-Socket.IO status:",
        status
      );
    });

    provider.awareness.setLocalStateField(
      "user",
      {
        username: username,
      }
    );

    const updateUsers = () => {
      const states = Array.from(
        provider.awareness
          .getStates()
          .values()
      );

      const connectedUsers = states
        .filter(
          (state) =>
            state &&
            state.user &&
            state.user.username
        )
        .map((state) => state.user);

      setUsers(connectedUsers);
    };

    updateUsers();

    provider.awareness.on(
      "change",
      updateUsers
    );

    const binding = new MonacoBinding(
      ytext,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );

    return () => {
      binding.destroy();

      provider.awareness.off(
        "change",
        updateUsers
      );

      provider.disconnect();
    };
  };

  const handleJoin = (e) => {
    e.preventDefault();

    const name =
      e.target.username.value.trim();

    if (!name) {
      return;
    }

    setUsername(name);

    window.history.pushState(
      {},
      "",
      "?username=" +
        encodeURIComponent(name)
    );
  };

  if (!username) {
    return (
      <main className="login-page">
        <form
          onSubmit={handleJoin}
          className="login-form"
        >
          <h1>
            Collaborative Code Editor
          </h1>

          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            className="username-input"
          />

          <button
            type="submit"
            className="join-button"
          >
            Join
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="editor-page">

      <aside className="users-panel">

        <h1>Users</h1>

        <div className="current-user">
          You: {username}
        </div>

        <div className="users-list">

          {users.map((user, index) => (
            <div
              key={index}
              className="user-item"
            >
              <span className="online-dot"></span>

              {user.username}
            </div>
          ))}

        </div>

      </aside>

      <section className="editor-container">

        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// Start writing your code..."
          theme="vs-dark"
          onMount={handleMount}
          options={{
            fontSize: 16,
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
          }}
        />

      </section>

    </main>
  );
}

export default App;