# Scroll restoration (marketing site)

Client-side routing in `agentruntime-site` keeps the same document shell (`Navigation` + `Footer`); only `<main>` swaps. Without an explicit scroll policy, `window.scrollY` carries over between routes — e.g. landing on a blog post or legal page while still scrolled to the footer.

This doc describes how scroll is managed, with a **saved list position** for `/blog`.

## Behavior summary

| Navigation | Scroll result |
|------------|----------------|
| Any forward link to a **non-blog** route | Top of page |
| `/blog` → click a post | Top of post; list position saved to `sessionStorage` |
| Browser **Back** to `/blog` | Restore saved list position |
| **Back to Blog** on a post (`restoreBlogScroll` state) | Restore saved list position |
| **Blog** in nav, footer, or “All blog posts” (`BlogIndexLink`) | Top of list; clears saved position |
| Home → “View all posts” / first visit to `/blog` | Top of list |
| Same-route click **Blog** while already on `/blog` | Top of list (via `onClick`) |
| In-page hash (`#heading`) on blog post TOC | Scroll to anchor |

## Implementation

### Core files

| File | Role |
|------|------|
| `src/components/ScrollManager.tsx` | Mounted once in `App.tsx` inside `BrowserRouter`; runs on every route change |
| `src/lib/blogScrollRestoration.ts` | `sessionStorage` key, save/read/clear, restore with lazy-image retry |
| `src/components/blog/BlogIndexLink.tsx` | Nav/footer “go to blog index at top” links |

### Storage

- Key: `scroll:/blog` in `sessionStorage`
- Written when leaving `/blog` for any other path
- Cleared when user explicitly opens the blog index via `BlogIndexLink` / `scrollToTop` state

### React Router location state

```ts
// Back to Blog (BlogPost.tsx)
{ restoreBlogScroll: true }

// Nav / footer Blog (BlogIndexLink)
{ scrollToTop: true }
```

### Adding another long list page

1. Add a storage key and save/restore helpers in `blogScrollRestoration.ts` (or a shared `listScrollRestoration.ts`).
2. Extend `ScrollManager` with the same leave/save + enter/restore/top branches.
3. Add an `XIndexLink` component for primary nav entry points that should reset to top.

## Testing manually

1. Open `/blog`, scroll to the middle, open a post → should land at top of post.
2. Browser back → should return to the same scroll position on the list.
3. Open a post, click **Back to Blog** → same restored position.
4. From restored position, click **Blog** in the header → should jump to top of list.
5. From home, click **View all posts** → top of list.

## Related

- Blog cover images: build-time WebP/AVIF via `scripts/optimize-blog-images.mjs` (see root `README.md`).
