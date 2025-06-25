//Git deployment setup
//Run these commands in terminal after initializing the repo
cd path-to-your-project-folder

git init
git add .
git commit -m "Deploy Christ Secret Service"
git remote add origin https://github.com/shadow1215225/cjcpur-secret-service.git
git branch -M main
git push -u origin main


import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Mail, Lock } from "lucide-react";

// --- UI Components ---
function Card({ children, className }) {
  return <div className={`rounded-xl shadow-md p-4 ${className}`}>{children}</div>;
}
function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
function Button({ children, className, ...props }) {
  return <button className={`px-4 py-2 rounded ${className}`} {...props}>{children}</button>;
}
function Input({ className, ...props }) {
  return <input className={`px-3 py-2 rounded ${className}`} {...props} />;
}

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Login/Register Form ---
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("loggedIn", "true");
      navigate("/members");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          localStorage.setItem("loggedIn", "true");
          navigate("/members");
        } catch (regError) {
          alert("Registration failed: " + regError.message);
        }
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="flex items-center gap-2">
        <Mail className="text-yellow-500" />
        <Input
          placeholder="Email"
          className="bg-black text-white border border-yellow-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Lock className="text-yellow-500" />
        <Input
          placeholder="Password"
          type="password"
          className="bg-black text-white border border-yellow-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="bg-yellow-500 text-black w-full">
        Sign In / Register
      </Button>
    </form>
  );
}

// --- Home Page ---
function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-yellow-500 mb-8 text-center"
      >
        Christ_secret_service
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg max-w-2xl mx-auto text-white text-center mb-12"
      >
        Uncovering stories, building community, and sharing Christ-centered insight for and by Christ students — online and offline.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="bg-zinc-900 border-[1px] border-yellow-500">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
              {isLoggedIn ? "Welcome Back" : "Join the Community"}
            </h2>
            {isLoggedIn ? (
              <Button onClick={handleLogout} className="bg-yellow-500 text-black w-full">Logout</Button>
            ) : (
              <LoginForm />
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-[1px] border-yellow-500">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Support the Mission</h2>
            <p className="text-white mb-4">
              Help us continue to serve the Christ student community. Every contribution matters.
            </p>
            <a href="https://donate.stripe.com/test_dR6eXR1x1gsrfqY4gg" target="_blank" rel="noopener noreferrer">
              <Button className="bg-yellow-500 text-black hover:opacity-90 w-full">
                Donate Now
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <Link to="/blog">
          <Button className="text-yellow-500 underline text-sm bg-transparent">Visit the Blog</Button>
        </Link>
        <Link to="/store">
          <Button className="text-yellow-500 underline text-sm bg-transparent ml-4">Enter the Store</Button>
        </Link>
        <Link to="/members">
          <Button className="text-yellow-500 underline text-sm bg-transparent ml-4">Member Area</Button>
        </Link>
      </motion.div>
    </div>
  );
}

// --- Blog Page ---
function Blog() {
  return (
    <div className="text-white bg-black min-h-screen p-10">
      <h2 className="text-3xl text-yellow-500 mb-6">Latest Blog Posts</h2>
      <ul className="space-y-4">
        <li className="border-b border-yellow-500 pb-2">🍪 Talent Hunt Crunchies</li>
        <li className="border-b border-yellow-500 pb-2">👻 The Ghost of the Unfortunate</li>
        <li className="border-b border-yellow-500 pb-2">🥵 PU HOTS</li>
      </ul>
    </div>
  );
}

// --- Store Page ---
function Store() {
  return (
    <div className="text-white bg-black min-h-screen p-10">
      <h2 className="text-3xl text-yellow-500 mb-6">Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-800 border border-yellow-500">
          <CardContent className="p-4">
            <h3 className="text-xl text-yellow-500">Custom Meme Stickers</h3>
            <p className="text-white">₹49 – DM us on Instagram to order.</p>
            <Button className="mt-2 bg-yellow-500 text-black w-full">Buy</Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border border-yellow-500">
          <CardContent className="p-4">
            <h3 className="text-xl text-yellow-500">Info on Sale</h3>
            <p className="text-white">₹199 – Secret info on someone from 1st PU.</p>
            <Button className="mt-2 bg-yellow-500 text-black w-full">Buy</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Member Area Page ---
function MemberArea() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return (
    <div className="text-white bg-black min-h-screen p-10">
      <h2 className="text-3xl text-yellow-500 mb-6">Member Area</h2>
      {!isLoggedIn ? (
        <p>You must sign in to view this content.</p>
      ) : (
        <div>
          <p className="mb-6">Welcome to the secret info zone! 🕵️‍♂️</p>
          <form className="space-y-4">
            <Input className="bg-black text-white border border-yellow-500" placeholder="Submit gossip anonymously..." />
            <Button className="bg-yellow-500 text-black">Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
}

// --- App Entry Point ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/store" element={<Store />} />
        <Route path="/members" element={<MemberArea />} />
      </Routes>
    </Router>
  );
}
