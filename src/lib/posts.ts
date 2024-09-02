import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostData = {
	id: string;
	title: string;
	date: string;
};

export function getSortedPostsData(): PostData[] {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData: PostData[] = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, "");

		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const matterResult = matter(fileContents);

		// Ensure the front matter data has the correct type
		return {
			id,
			...(matterResult.data as Omit<PostData, "id">), // Cast to the correct type
		};
	});

	// Sort posts by date
	return allPostsData.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}
