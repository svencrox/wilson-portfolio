import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

// Define the PostData type for TypeScript
type PostData = {
	id: string;
	title: string;
	date: string;
};

// Fetch blog posts as a server-side function
async function getRecentPosts(): Promise<PostData[]> {
	const postsDirectory = path.join(process.cwd(), "content/posts");
	const fileNames = fs.readdirSync(postsDirectory);

	const posts = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, "");
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const { data } = matter(fileContents);

		return {
			id,
			title: data.title,
			date: data.date,
		};
	});

	// Sort posts by date
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	// Return the latest 3 posts
	return posts.slice(0, 3); // Only return the latest 3 posts
}

export default async function Home() {
	// Fetch recent posts in a server component
	const recentPosts = await getRecentPosts();

	return (
		<main className="flex min-h-screen">
			{/* Left Column - Fixed */}
			<div className="w-1/3 sticky top-0 flex flex-col justify-start min-h-screen px-4 py-16">
				{/* Hero Section */}
				<section className="text-center mb-16">
					<h1 className="text-3xl font-bold mb-4">Wilson Ting</h1>
					<p className="text-xl mb-8">Software Developer</p>
				</section>

				{/* About Section */}
				<section id="about" className="max-w-xs mb-16 text-center">
					<p className="text-lg">
						I am a passionate developer with a focus on creating interactive and scalable web applications using the latest technologies.
						With expertise in JavaScript, React, Next.js, and more, I love crafting intuitive and user-friendly experiences.
					</p>
				</section>

				{/* Contact Section */}
				<section id="contact" className="max-w-xs mb-16 text-center">
					<h2 className="text-2xl font-bold mb-4">Links</h2>
					<Button asChild>
						<Link href="#">Get In Touch</Link>
					</Button>
				</section>
			</div>

			{/* Right Column - Scrollable */}
			<div className="w-2/3 overflow-y-auto px-4 py-16">
				{/* Projects Section */}
				<section id="projects" className="text-center w-full max-w-5xl mb-16">
					<h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{/* Example Project Cards */}
						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle>Project One</CardTitle>
								<CardDescription>A brief description of Project One.</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="link" asChild>
									<Link className="pl-0" href="#">
										View Project
									</Link>
								</Button>
							</CardContent>
						</Card>
						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle>Project Two</CardTitle>
								<CardDescription>A brief description of Project Two.</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="link" asChild>
									<Link className="pl-0" href="#">
										View Project
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Blog Section */}
				<section id="blog" className="w-full max-w-5xl mb-16">
					<h2 className="text-2xl font-bold mb-8 text-center">Recent Blog Posts</h2>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{recentPosts.map(({ id, title, date }) => (
							<Card key={id} className="shadow-lg">
								<CardHeader>
									<CardTitle>{title}</CardTitle>
									<CardDescription>{date}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant="link" asChild>
										<Link className="pl-0" href={`/blog/${id}`}>
											Read More
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-8">
						<Button asChild>
							<Link href="/blog">View All Posts</Link>
						</Button>
					</div>
				</section>
			</div>
		</main>
	);
}
