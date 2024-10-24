import Image from "next/image";
import Link from "next/link";

import { Projekt } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

type Props = { projekt: Projekt; num: number };

export default async function PostCard({ projekt, num } : Props) {
  const media = await getFeaturedMediaById(projekt.featured_media);
  const author = await getAuthorById(projekt.author);
  let show = false;
  if (num == 0) {
    show = true;
  }
  const date = new Date(projekt.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(projekt.categories[0]);

  return (
    <Link
      href={`/projekte/${projekt.slug}`}
      className={cn(
        "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
        "hover:bg-accent/75 transition-all"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center">
          <Image
            className="h-full w-full object-cover"
            src={media.source_url}
            alt={projekt.title.rendered}
            width={400}
            height={200}
            priority={show}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: projekt.title.rendered }}
          className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        ></div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html:
              projekt.content.rendered.split(" ").slice(0, 12).join(" ").trim() +
              "...",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-4">
        <hr />
        <div className="flex justify-between items-center text-xs">
          <p>{category.name}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}
