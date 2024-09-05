import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostData = {
	id: string;
	title: string;
	date: string;
	contentHtml: string; // Include HTML content here
};

export async function getSortedPostsData(): Promise<PostData[]> {
	const fileNames = fs.readdirSync(postsDirectory);

	// Use Promise.all to wait for all async operations
	const allPostsData: PostData[] = await Promise.all(
		fileNames.map(async (fileName) => {
			const id = fileName.replace(/\.md$/, "");

			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");

			const matterResult = matter(fileContents);

			// Convert Markdown to HTML
			const processedContent = await remark().use(remarkHtml).process(matterResult.content);
			const contentHtml = processedContent.toString();

			return {
				id,
				contentHtml,
				title: matterResult.data.title as string, // Ensure title is a string
				date: matterResult.data.date as string, // Ensure date is a string
			};
		})
	);

	// Sort posts by date
	return allPostsData.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}
