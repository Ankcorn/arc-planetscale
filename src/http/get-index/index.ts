import arc from '@architect/functions';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true
      }
    });
  
    return {
      html: `<html>
      <body>
        <h1>Arc Planetscale Forum</h1>
        <div>${posts.map(el => (`<li>${el?.author?.name} - ${el.title} - ${el.content || 'no content'} </li>`)).toString()
        }</div>
        <div>
          <form method="post" action="comment">
          <div><label>Title<input type="text" name="title" /></label</div>
            
            <div><label>Comment<textarea name="comment"></textarea></label></div>
            <div><label>Email<input type="email" name="email" /></label></div>
            <div><label>Name<input type="text" name="name" /></label></div>
            <div><button type="submit">Submit</button> </div>
          </form>
        </div>
      </body>
      </html>`
    }
  } catch(e) {
    return {
      html: e.message
    }
  }
}

export const handler = arc.http.async(main);
