import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Breadcrumbs, CtaBand } from '@/components/ui';
import { site } from '@/config/site';
import { formatDate, postBySlug, posts } from '@/data/posts';
import { sized } from '@/lib/img';
import { absoluteUrl, SITE_URL } from '@/lib/paths';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = postBySlug(slug);
  if (!post) return <NotFound />;
  const other = posts.find((p) => p.slug !== post.slug);

  return (
    <>
      <Seo
        title={post.title}
        description={post.dek}
        type="article"
        image={sized(post.image, 1200)}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.dek,
          datePublished: post.date,
          image: sized(post.image, 1200),
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          author: { '@type': 'Organization', name: site.name },
          publisher: { '@id': `${SITE_URL}/#business` },
        }}
      />

      <article>
        <header className="frame pb-10 pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Field notes', href: '/blog' }, { label: post.category }]} />
          <div className="mx-auto mt-10 max-w-4xl">
            <p className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-poppy px-3 py-1 font-semibold">{post.category}</span>
              <time dateTime={post.date} className="text-chaparral/70">{formatDate(post.date)}</time>
              <span className="flex items-center gap-1.5 text-chaparral/70">
                <Clock className="h-4 w-4" aria-hidden="true" /> {post.readMins} min read
              </span>
            </p>
            <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold leading-[1]">{post.title}</h1>
            <p className="mt-6 text-xl text-chaparral/80">{post.dek}</p>
            <p className="mt-6 text-sm font-semibold">By the {site.shortName} crew</p>
          </div>
        </header>

        <div className="frame">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border-2 border-chaparral">
            <Img src={post.image} alt={post.alt} priority sizes="(min-width:1024px) 64rem, 100vw" className="aspect-[16/9] w-full" />
          </div>
        </div>

        <div className="frame py-16">
          <div className="prose-nova mx-auto">{post.body}</div>
        </div>
      </article>

      <nav aria-label="Keep reading" className="frame pb-20">
        <div className="mx-auto flex max-w-prose flex-col gap-4 border-t-2 border-chaparral pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/blog" className="inline-flex items-center gap-2 font-semibold">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All field notes
          </Link>
          {other && (
            <Link to={`/blog/${other.slug}`} className="group inline-flex max-w-sm items-center gap-2 text-right font-semibold sm:justify-end">
              <span className="link-u">Next: {other.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
        </div>
      </nav>

      <CtaBand title="Rather we handled it?" body="Book a walk-through and we will put this advice to work on your property." />
    </>
  );
}
