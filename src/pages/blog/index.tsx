import Link from 'next/link';
import { getSortedPostsData, PostData } from '../../lib/posts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Blog({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPostsData.map(({ id, date, title }) => (
          <Card key={id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{date}</p>
              <Link href={`/blog/${id}`} passHref>
                <Button variant="link" className="mt-4">Read more</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
