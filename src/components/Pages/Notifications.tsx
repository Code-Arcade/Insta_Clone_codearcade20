import React from 'react';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

const Notifications: React.FC = () => {
  // Sample notifications data - in a real app this would come from storage/API
  const notifications = [
    {
      id: '1',
      type: 'like',
      username: 'janesmith',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'liked your photo.',
      timestamp: Date.now() - 3600000, // 1 hour ago
      postImage: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: '2',
      type: 'comment',
      username: 'mikejohnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'commented: "Amazing shot! 📸"',
      timestamp: Date.now() - 7200000, // 2 hours ago
      postImage: 'https://images.pexels.com/photos/1308624/pexels-photo-1308624.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: '3',
      type: 'follow',
      username: 'sarah_photo',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'started following you.',
      timestamp: Date.now() - 86400000, // 1 day ago
    },
    {
      id: '4',
      type: 'like',
      username: 'alex_travels',
      avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'liked your photo.',
      timestamp: Date.now() - 172800000, // 2 days ago
      postImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" fill="currentColor" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="py-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
        </div>

        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <img
                    src={notification.avatar}
                    alt={notification.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{notification.username}</span>
                    {' '}
                    <span className="text-gray-600">{notification.message}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>

                {notification.postImage && (
                  <div className="flex-shrink-0">
                    <img
                      src={notification.postImage}
                      alt="Post"
                      className="w-12 h-12 rounded object-cover"
                    />
                  </div>
                )}

                {notification.type === 'follow' && (
                  <div className="flex-shrink-0">
                    <button className="px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors">
                      Follow
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-500">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications yet</h3>
              <p className="text-gray-600">When someone likes or comments on your posts, you'll see it here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;