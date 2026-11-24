import '@/app/globals.css';
import LayoutNotes from '@/components/LayoutNotes/LayoutNotes';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesFilterLayout = ({ children, sidebar }: Props) => {
  return <LayoutNotes sidebar={sidebar}>{children}</LayoutNotes>;
};

export default NotesFilterLayout;
