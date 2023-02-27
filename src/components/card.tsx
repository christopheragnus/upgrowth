import React from 'react';

interface Tag {
  title: string;
  type: string;
}

interface CardInterface {
  id: string;
  tags: Tag[];
  createdAt: string;
  altDescription: string;
  imageUrl: string;
}

export default function Card({
  id,
  tags,
  createdAt,
  altDescription,
  imageUrl,
}: CardInterface) {
  return (
    <div className="mb-10">
      <div className="max-w-sm bg-cyan-100 border border-black rounded-lg shadow">
        <a href={imageUrl}>
          <img className="rounded-t-lg" src={imageUrl} alt={altDescription} />
        </a>
        <div className="p-5">
          <p className="mb-2 text-m font-bold tracking-tight text-gray-900">
            Description: {altDescription}
          </p>
          <a href={imageUrl}>
            <p className="mb-2 text-m tracking-tight text-gray-900">
              Image ID: {id}
            </p>
          </a>
          <p className="mb-3 text-s text-gray-700">
            Tags:{' '}
            {tags.map((tag, key) => (
              <li key={key}>{tag.title}</li>
            ))}
          </p>
          <p>Created At: {createdAt}</p>
        </div>
      </div>
    </div>
  );
}
