import { Button } from '@/components/ui/button';

type Directory = {
  icon: string;
  title: string;
};

const defaultDirectories: Directory[] = [
  {
    icon: '📦',
    title: 'All notes',
  },
];

const directoriesMock: Directory[] = [
  {
    icon: '🍑',
    title: 'Fruits',
  },
  {
    icon: '📕',
    title: 'Books',
  },
];

function DirectoriesList({ directories }: { directories: Directory[] }) {
  const allDirectories = [...defaultDirectories, ...directories];

  return (
    <ul className="flex flex-col bg-red-700 w-full p-4 gap-2">
      {allDirectories.map((category) => (
        <li>
          <Button className="w-full justify-start">
            {category.icon} {category.title}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default function DirectoriesPanel() {
  return (
    <div className="min-h-screen bg-green-400">
      <DirectoriesList directories={directoriesMock} />
    </div>
  );
}
