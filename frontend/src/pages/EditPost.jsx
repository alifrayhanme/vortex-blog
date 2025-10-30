import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { useUpdatePostMutation, useUploadImageMutation, useGetPostQuery } from '../features/api/apiSlice'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'
import { FaBold, FaItalic, FaQuoteLeft, FaList, FaListOl } from 'react-icons/fa'

const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation()
  const { data: postData, isLoading: isLoadingPost } = useGetPostQuery(id)
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  
  const isLoading = isUpdating || isUploading

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

  useEffect(() => {
    if (postData?.data) {
      setTitle(postData.data.title)
      setCategory(postData.data.category)
      setImagePreview(postData.data.image_url)
      editor?.commands.setContent(postData.data.content)
    }
  }, [postData, editor])

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
    
    if (!title || !category || !editor?.getHTML()) {
      alert('Please fill all required fields')
      return
    }

    try {
      let imageUrl = postData?.data?.image_url

      if (image) {
        const imageFormData = new FormData()
        imageFormData.append('image', image)
        const imageResponse = await uploadImage(imageFormData).unwrap()
        imageUrl = imageResponse.imageUrl
      }
      
      const postUpdateData = {
        id,
        title,
        category,
        content: editor.getHTML(),
        image_url: imageUrl
      }
      
      await updatePost(postUpdateData).unwrap()
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to update post:', error)
      alert('Failed to update post. Please try again.')
    }
  }

  if (isLoadingPost) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  }

  if (!editor) return null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      
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
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 max-w-xs h-auto rounded-lg" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          
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
            >
              <option value="0">Paragraph</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
            </select>
          </div>

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
            {isLoading ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost