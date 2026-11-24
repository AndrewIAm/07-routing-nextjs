import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(slug[0])
    ? (slug[0] as NoteTag)
    : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
    staleTime: 30_000,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </main>
  );
};

export default Notes;
