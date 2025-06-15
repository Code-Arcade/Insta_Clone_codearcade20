import React from 'react';
import { Code, Heart, Github, Youtube, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Instagram Clone</h1>
          <p className="text-purple-100">A modern social media experience</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* About the Project */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              About This Project
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This Instagram clone is a fully functional social media application built with modern web technologies. 
              It features real image uploads, user profiles, post creation, likes, comments, and a responsive design 
              that works seamlessly across all devices.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Real image upload from device',
                'User authentication system',
                'Create and share posts',
                'Like and comment on posts',
                'Editable user profiles',
                'Explore page for discovery',
                'Responsive mobile design',
                'Real-time interactions'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'LocalStorage'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Developer */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Developer</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  CA
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">codearcade20</h4>
                  <p className="text-gray-600">Sakthi - Full Stack Developer</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                Passionate about creating beautiful, functional web applications with modern technologies. 
                This Instagram clone showcases skills in React, TypeScript, and responsive design.
              </p>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/Code-Arcade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://youtube.com/@codearcade-se4rc?si=98L9s7oec8hpvxnm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
                <a
                  href="mailto:codearcade20@gmail.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Version Info */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Version 1.0.0 • Built with ❤️ by codearcade20
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © 2025 Instagram Clone. This is a demo project for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;