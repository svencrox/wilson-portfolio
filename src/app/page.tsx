import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

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
		<main className="flex flex-col lg:flex-row min-h-screen">
			{/* Left Column - Fixed on Desktop, Stacked on Mobile/Tablet */}
			<div className="w-full lg:w-1/3 lg:sticky lg:top-0 flex flex-col justify-start min-h-screen px-4 py-16">
				{/* Hero Section */}
				<section className="text-center mb-16">
					<h1 className="text-3xl font-bold mb-4">Wilson Ting</h1>
					<p className="text-xl mb-8">Frontend Developer</p>
				</section>

				{/* About Section */}
				<section id="about" className="mb-16 text-center">
					<p className="text-lg">
						I am a skilled Front End Developer with extensive experience in creating and deploying web applications using Angular 15+,
						ReactJS, Nextjs, HTML, and CSS. Proven track record in integrating REST APIs and developing responsive Single Page
						Applications for clients in banking, e-commerce, and finance. Adept at using Agile methodologies and tools like JIRA, Git, and
						Bitbucket to efficiently manage projects. Committed to staying updated with the latest web development trends to deliver
						innovative solutions
					</p>
				</section>

				{/* Contact Section */}
				<section id="contact" className="mb-16 text-center">
					<h2 className="text-2xl font-bold mb-4">Links</h2>
					<div className="flex gap-2 justify-center">
						<a href="https://www.linkedin.com/in/wilson-chun-heng-ting/" target="_blank">
							<Linkedin color="#64ffda" />
						</a>
						<a href="https://github.com/svencrox" target="_blank">
							<Github color="#64ffda" href="https://github.com/svencrox" target="_blank" />
						</a>
					</div>
				</section>
			</div>

			{/* Right Column - Scrollable */}
			<div className="w-full lg:w-2/3 overflow-y-auto px-4 py-16">
				{/* Projects Section */}
				<section id="projects" className="text-center w-full max-w-5xl mb-16">
					<h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
					<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{/* Example Project Cards */}
						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="mb-2">SoundMeter FYP</CardTitle>
								<CardDescription>
									Python coded with weightage to convert raw sound pressure to sound decibel for meaningful usage.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="link" asChild>
									<Link className="pl-0" href="https://github.com/svencrox/soundmeterFYPA" target="_blank">
										View Project
									</Link>
								</Button>
							</CardContent>
						</Card>
						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="mb-2">Iron Temple</CardTitle>
								<CardDescription>
									An app to record and custom make training programs to make training together easier.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="link" asChild>
									<Link className="pl-0" href="https://github.com/svencrox/IronTemple" target="_blank">
										View Project
									</Link>
								</Button>
							</CardContent>
						</Card>
						<Card className="shadow-lg">
							<CardHeader>
								<CardTitle className="mb-2">WeatherApp React</CardTitle>
								<CardDescription>
									Light and easy react app using openWeatherAPI to demonstrate the usage of API data integration using create react
									app.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="link" asChild>
									<Link className="pl-0" href="https://github.com/svencrox/weather-app-react" target="_blank">
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
					<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
