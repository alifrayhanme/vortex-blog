import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import Placeholder from "@tiptap/extension-placeholder";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 italic",
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your post...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "whitespace-pre-wrap outline-none min-h-[300px] p-4",
        style: "white-space: pre-wrap;",
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editor?.getHTML();
    console.log({ title, category, content });
    // POST method code write here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            required
          >
            <option value="">Select category</option>
            <option value="world">World</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded text-sm ${
                  editor?.isActive("bold")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded text-sm ${
                  editor?.isActive("italic")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`px-3 py-1 rounded text-sm ${
                  editor?.isActive("heading", { level: 2 })
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className={`px-3 py-1 rounded text-sm ${
                  editor?.isActive("blockquote")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                Quote
              </button>
              <label className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-100 cursor-pointer">
                Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      editor?.chain().focus().setImage({ src: url }).run();
                    }
                  }}
                />
              </label>
            </div>
            <EditorContent editor={editor} className="bg-white" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 px-6 rounded-lg active:bg-red-700 font-medium"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
