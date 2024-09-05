import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostData } from '../../lib/posts'; // Import the PostData type

type PostProps = {
  postData: PostData & { contentHtml: string }; // Extend PostData to include HTML content
};

export default function Post({ postData }: PostProps) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <p className="text-gray-500 mb-6">{postData.date}</p>
      {/* Apply prose class here */}
      <article className="prose lg:prose-lg dark:prose-invert">
        {/* Render content with dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''), // remove the .md extention
    },
  }));

  return {
    paths,
    fallback: false, // All paths are pre-rendered; `false` means other routes should 404.
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const slug = params?.slug as string; // Ensure the slug is a string
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id (slug) and contentHtml
  const postData: PostData & { contentHtml: string } = {
    id: slug, // Include 'id' which corresponds to the 'slug'
    contentHtml: contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date, // Cast to the correct type
  };

  return {
    props: {
      postData,
    },
  };
};
