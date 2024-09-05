import { GetStaticProps } from 'next';
import { getSortedPostsData, PostData } from '../../lib/posts';

type BlogProps = {
  allPostsData: PostData[];
};

export default function Blog({ allPostsData }: BlogProps) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <a href={`/blog/${id}`} className="text-blue-500 hover:underline">
              {title}
            </a>
            <p className="text-gray-500">{date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const allPostsData = await getSortedPostsData(); // Ensure it is awaited and resolved

  return {
    props: {
      allPostsData, // Only return fully resolved data
    },
  };
};
