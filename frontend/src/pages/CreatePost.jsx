
import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { useCreatePostMutation, useUploadImageMutation } from '../features/api/apiSlice'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'
import { FaBold, FaItalic, FaQuoteLeft, FaList, FaListOl } from 'react-icons/fa'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  
  const isLoading = isCreating || isUploading

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your post content here...'
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg'
        }
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4'
      }
    }
  })

  const categories = ['Technology', 'Health', 'Business', 'Sports', 'Politics', 'Science', 'Arts', 'World']

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title || !category || !editor?.getHTML() || !image) {
      alert('Please fill all fields and select an image')
      return
    }

    // Check if user is authenticated
    const token = localStorage.getItem('accessToken')
    if (!currentUser?._id || !token) {
      alert('User authentication error. Please login again.')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      navigate('/signin')
      return
    }

    try {
      // Upload image first
      const imageFormData = new FormData()
      imageFormData.append('image', image)
      const imageResponse = await uploadImage(imageFormData).unwrap()
      
      // Create post with image URL
      const postData = {
        title,
        category,
        content: editor.getHTML(),
        author: currentUser._id,
        image_url: imageResponse.imageUrl
      }
      
      await createPost(postData).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to create post:', error)
      
      // Check if it's an authentication error
      if (error.status === 401 || error.data?.message?.includes('token') || error.data?.message?.includes('Unauthorized')) {
        alert('User authentication error. Please login again.')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate('/signin')
      } else {
        alert('Failed to create post. Please try again.')
      }
    }
  }

  if (!editor) return null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 max-w-xs h-auto rounded-lg" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          
          {/* Editor Toolbar */}
          <div className="border border-gray-300 rounded-t-lg p-3 bg-gray-50 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <FaQuoteLeft />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <FaList />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <FaListOl />
            </button>
            <select
              onChange={(e) => {
                const level = parseInt(e.target.value)
                if (level === 0) {
                  editor.chain().focus().setParagraph().run()
                } else {
                  editor.chain().focus().toggleHeading({ level }).run()
                }
              }}
              className="px-3 py-1 rounded border"
              aria-label="Select heading level"
            >
              <option value="0">Paragraph</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
            </select>
          </div>

          {/* Editor Content */}
          <div className="border border-t-0 border-gray-300 rounded-b-lg">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost