"use client"

import React, { useState } from 'react';

const Blog = () => {
  const [blog] = useState({
    content:
      "<h1>Judul Blog</h1><p>Ini adalah paragraf pertama dalam artikel ini.</p><p>Ini adalah paragraf kedua, dengan <a href='#'>link contoh</a>.</p><ul><li>Point pertama</li><li>Point kedua</li></ul>"
  });

  return (
    <div className="prose prose-lg dark:prose-invert mt-6">
      {/* Render HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default Blog;
