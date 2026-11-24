'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/components/NoteDetails/NoteDetails.module.css';

type Props = {
  id: string;
};

const NotePreviewClient = ({ id }: Props) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.tag}</p>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
    </Modal>
  );
};

export default NotePreviewClient;
