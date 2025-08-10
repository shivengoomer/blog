export default function PostList({ posts, onViewPost }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onViewPost(post)}
          >
            <h3 className="text-xl font-medium text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-2">{post.body}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}