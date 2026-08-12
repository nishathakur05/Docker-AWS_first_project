
// import "./App.css";

// import { Editor } from "@monaco-editor/react";
// import { MonacoBinding } from "y-monaco";
// import { useRef, useMemo, useState } from "react";
// import * as Y from "yjs";
// import { SocketIOProvider } from "y-socket.io";

// function App() {
//   const editorRef = useRef(null);

//   const [username, setUsername] = useState(() => {
//     return (
//       new URLSearchParams(window.location.search).get("username") || ""
//     );
//   });

//   const [users, setUser] = useState([]); // user kon list mein dekha ne k liya

//   const ydoc = useMemo(() => new Y.Doc(), []);

//   const ytext = useMemo(() => {
//     return ydoc.getText("monaco");
//   }, [ydoc]);

//   const handleMount = (editor) => {
//     editorRef.current = editor;

//     const provider = new SocketIOProvider(
//       "http://localhost:3000",
//       "monaco",
//       ydoc,
//       {
//         autoConnect: true,
//       }
//     );

//     provider.awareness.setLocalStateField("user", { username });

//     const states = Array.from(
//       provider.awareness.getStates().values()
//     );

//     setUser(
//       states
//         .filter((user) => user && user.user && user.user.username)
//         .map((state) => state.user)
//     );

//     provider.awareness.on("change", () => {
//       const states = Array.from(
//         provider.awareness.getStates().values()
//       );

//       setUser(
//         states
//           .filter((user) => user && user.user && user.user.username)
//           .map((state) => state.user)
//           .filter((user) => Boolean(user && user.username))
//       );
//     });

//     function handleBeforeUnload(event) {
//       provider.awareness.setLocalStateField("user", null);
//     }

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     const binding = new MonacoBinding(
//       ytext,
//       editorRef.current.getModel(),
//       new Set([editorRef.current]),
//       provider.awareness
//     );

//     return () => {
//       binding.destroy();
//       provider.disconnect();
//       window.removeEventListener(
//         "beforeunload",
//         handleBeforeUnload
//       );
//     };
//   };

//   const handlejoin = (e) => {
//     e.preventDefault();

//     setUsername(e.target.username.value);
//     window.history.pushState(
//       {},
//       "",
//       "?username=" + e.target.username.value
//     );
//   };

//   if (!username) {
//     return (
//       <main className="h-screen w-full bg-gray-900 flex gap-4 p-4 items-center justify-center">
//         <form
//           onSubmit={handlejoin}
//           className="flex flex-col gap-4"
//         >
//           <input
//             type="text"
//             placeholder="Enter your username"
//             className="p-2 rounded-lg bg-gray-800 text-white"
//             name="username"
//           />

//           <button
//             className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold"
//             onClick={() => {}}
//           >
//             join
//           </button>
//         </form>
//       </main>
//     );
//   }

//   return (
//     <main className="h-screen w-full bg-gray-900 flex gap-4 p-4">

//       <aside className="h-full w-1/4 bg-amber-50 rounded-lg">

//         <h1 className="text-2xl font-bold p-4">
//           User
//         </h1>

//         <div className="flex flex-col gap-2 p-4">

//           {users.map((user, index) => (
//             <div
//               key={index}
//               className="p-2 rounded-lg bg-slate-800 text-white"
//             >
//               {user.username}
//             </div>
//           ))}

//         </div>

//       </aside>

//       <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
//         <Editor
//           height="100%"
//           defaultLanguage="javascript"
//           defaultValue="// some comment"
//           theme="vs-dark"
//           onMount={handleMount}
//         />
//       </section>

//     </main>
//   );
// }

// export default App;



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

//   const [users, setUser] = useState([]);

//   const ydoc = useMemo(() => new Y.Doc(), []);

//   const ytext = useMemo(() => {
//     return ydoc.getText("monaco");
//   }, [ydoc]);

//   const handleMount = (editor) => {
//     editorRef.current = editor;

//     // Connect frontend to backend
//     const provider = new SocketIOProvider(
//       "http://localhost:3000",
//       "monaco",
//       ydoc,
//       {
//         autoConnect: true,
//       }
//     );

//     providerRef.current = provider;

//     // Check connection status
//     provider.on("status", ({ status }) => {
//       console.log("Y-Socket.IO status:", status);
//     });

//     // User awareness
//     provider.awareness.setLocalStateField("user", {
//       username,
//     });

//     const updateUsers = () => {
//       const states = Array.from(
//         provider.awareness.getStates().values()
//       );

//       setUser(
//         states
//           .filter(
//             (state) =>
//               state &&
//               state.user &&
//               state.user.username
//           )
//           .map((state) => state.user)
//       );
//     };

//     // Get users initially

//     updateUsers();

//     // Update users whenever awareness changes
//     provider.awareness.on("change", updateUsers);

//     function handleBeforeUnload() {
//       provider.awareness.setLocalStateField("user", null);
//     }

//     window.addEventListener(
//       "beforeunload",
//       handleBeforeUnload
//     );

//     // Connect Yjs document with Monaco editor
//     const binding = new MonacoBinding(
//       ytext,
//       editorRef.current.getModel(),
//       new Set([editorRef.current]),
//       provider.awareness
//     );

//     // Cleanup
//     return () => {
//       binding.destroy();

//       provider.awareness.off("change", updateUsers);

//       provider.disconnect();

//       window.removeEventListener(
//         "beforeunload",
//         handleBeforeUnload
//       );
//     };
//   };

//   const handlejoin = (e) => {
//     e.preventDefault();

//     



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
      new URLSearchParams(window.location.search).get("username") || ""
    );
  });

  const [users, setUsers] = useState([]);

  const ydoc = useMemo(() => new Y.Doc(), []);

  const ytext = useMemo(() => {
    return ydoc.getText("monaco");
  }, [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;

    // Connect frontend to backend
    const provider = new SocketIOProvider(
      "/",
      "monaco",
      ydoc,
      {
        autoConnect: true,
      }
    );

    providerRef.current = provider;

    provider.on("status", ({ status }) => {
      console.log("Y-Socket.IO status:", status);
    });

    // Set current user's username
    provider.awareness.setLocalStateField("user", {
      username,
    });

    // Update connected users
    const updateUsers = () => {
      const states = Array.from(
        provider.awareness.getStates().values()
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

    provider.awareness.on("change", updateUsers);

    // Connect Yjs with Monaco
    const binding = new MonacoBinding(
      ytext,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );

    return () => {
      binding.destroy();
      provider.awareness.off("change", updateUsers);
      provider.disconnect();
    };
  };

  const handleJoin = (e) => {
    e.preventDefault();

    const name = e.target.username.value.trim();

    if (!name) {
      return;
    }

    setUsername(name);

    window.history.pushState(
      {},
      "",
      "?username=" + encodeURIComponent(name)
    );
  };

  // -----------------------------
  // USERNAME SCREEN
  // -----------------------------

  if (!username) {
    return (
      <main className="login-page">
        <form onSubmit={handleJoin} className="login-form">
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            className="username-input"
          />

          <button type="submit" className="join-button">
            Join
          </button>
        </form>
      </main>
    );
  }

  // -----------------------------
  // COLLABORATIVE EDITOR
  // -----------------------------

  return (
    <main className="editor-page">

      <aside className="users-panel">
        <h1>User</h1>

        <div className="users-list">
          {users.map((user, index) => (
            <div key={index} className="user-item">
              {user.username}
            </div>
          ))}
        </div>
      </aside>

      <section className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Start writing your code..."
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>

    </main>
  );
}

export default App;