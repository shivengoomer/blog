import { useState, useEffect } from "react";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import SearchBar from "./components/Searchbar";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [view, setView] = useState("list"); // list, detail, create
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setView("detail");
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      fetchPosts();
      setView("list");
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtered posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamically determine height based on post length
  const getRandomHeight = (text) => {
    const baseHeight = 150;
    const extraHeight = Math.min(text?.length * 0.5, 200); // scale with text
    const randomOffset = Math.floor(Math.random() * 80); // for variety
    return baseHeight + extraHeight + randomOffset;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-gray-900 tracking-tight cursor-pointer hover:text-blue-600 transition"
            onClick={() => setView("list")}
          >
            ✨ Sundar Blog
          </h1>
          <nav className="flex items-center gap-3">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition ${
                view === "list"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setView("create")}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-sm hover:bg-pink-600 transition text-sm font-medium"
            >
              ➕ New Post
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {view === "list" && (
          <><div className="pb-10">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500"></div>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="break-inside-avoid bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transform transition duration-300 overflow-hidden cursor-pointer"
                    style={{
                      height: `${getRandomHeight(
                        post.body || post.description || ""
                      )}px`,
                    }}
                    onClick={() => handleViewPost(post)}
                  >
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-2/3 object-cover"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.body || post.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === "detail" && selectedPost && (
          <PostDetail
            post={selectedPost}
            onDelete={handleDeletePost}
            onBack={() => setView("list")}
          />
        )}

        {view === "create" && (
          <CreatePost
            onCreate={() => {
              fetchPosts();
              setView("list");
            }}
            onCancel={() => setView("list")}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t py-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Sundar Blog • Crafted with ❤️
        </div>
      </footer>
    </div>
  );
}

export default App;
