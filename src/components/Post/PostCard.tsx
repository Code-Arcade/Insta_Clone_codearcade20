import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post, User } from '../../types';
import { getUserById, savePost } from '../../utils/storage';
import { useAuth } from '../../contexts/AuthContext';

interface PostCardProps {
  post: Post;
  onUserClick: (username: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUserClick }) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?.id || ''));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const postUser = getUserById(post.userId);

  const handleLike = () => {
    if (!currentUser) return;

    const updatedPost = { ...post };
    
    if (isLiked) {
      updatedPost.likes = updatedPost.likes.filter(id => id !== currentUser.id);
      setLikesCount(likesCount - 1);
    } else {
      updatedPost.likes.push(currentUser.id);
      setLikesCount(likesCount + 1);
    }
    
    setIsLiked(!isLiked);
    savePost(updatedPost);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      text: newComment.trim(),
      timestamp: Date.now(),
    };

    const updatedComments = [...comments, comment];
    const updatedPost = { ...post, comments: updatedComments };
    
    setComments(updatedComments);
    setNewComment('');
    savePost(updatedPost);
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  if (!postUser) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onUserClick(postUser.username)}
            className="flex items-center space-x-3"
          >
            <img
              src={postUser.avatar}
              alt={postUser.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800">{postUser.username}</span>
          </button>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-100">
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Heart
                className="w-6 h-6"
                fill={isLiked ? 'currentColor' : 'none'}
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-gray-700 hover:text-gray-900"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* Likes */}
        {likesCount > 0 && (
          <p className="font-medium text-gray-800 mb-2">
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </p>
        )}

        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium text-gray-800 mr-2">{postUser.username}</span>
          <span className="text-gray-800">{post.caption}</span>
        </div>

        {/* Comments */}
        {comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-gray-500 text-sm mb-2 hover:text-gray-700"
          >
            {showComments ? 'Hide' : 'View'} all {comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="space-y-1 mb-3">
            {comments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-medium text-gray-800 mr-2">{comment.username}</span>
                <span className="text-gray-800">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-gray-500 text-xs uppercase tracking-wide">
          {formatTimestamp(post.timestamp)}
        </p>
      </div>

      {/* Add Comment */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleAddComment} className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 text-sm focus:outline-none"
          />
          {newComment.trim() && (
            <button
              type="submit"
              className="text-blue-500 font-medium text-sm hover:text-blue-600"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostCard;