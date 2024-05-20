import { ModeToggle } from '@/components/theme-toggle';

export default function TopBar() {
  return (
    <div className="flex justify-between p-2">
      <div>Breadcrumb</div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
