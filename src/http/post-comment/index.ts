import arc, { HttpRequest } from '@architect/functions';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main(req: HttpRequest) {
	const input: { name: string, title: string, comment: string, email: string } = req.body

	let user = await prisma.user.findUnique({
		where: {
			email: input.email
		}
	})

	if (!user) {
		user = await prisma.user.create({
			data: {
				name: input.name,
				email: input.email
			}
		});
	}
	await prisma.post.create({
		data: {
			title: input.title,
			content: input.comment,
			authorId: user.id
		}
	})
	return {
		status: 302,
		headers: {
			location: '/'
		}
	}
}

export const handler = arc.http.async(main);
