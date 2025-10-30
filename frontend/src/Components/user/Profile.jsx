import React from 'react'
import { FaCrown, FaStar, FaUserCircle } from 'react-icons/fa'

const Profile = ({userType, user}) => {
  return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <FaUserCircle size={80} className="text-gray-400" />
                {userType === 'admin' && (
                  <FaCrown size={20} className="absolute -top-2 -right-2 text-yellow-500" />
                )}
                {userType === 'moderator' && (
                  <FaStar size={20} className="absolute -top-2 -right-2 text-blue-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    userType === 'admin' ? 'bg-yellow-100 text-yellow-800' :
                    userType === 'moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-tertiary font-medium">
                  {user.postsCount} Posts Published
                </p>
              </div>
            </div>
          </div>
  )
}

export default Profile