import { COLORS } from '../../../../../../const/const';

export default function ColorSelector(props: { onColorSelect: (color: string) => void; disabled?: boolean }) {
  const { onColorSelect, disabled } = props;

  return (
    <div className="flex gap-2">
      {COLORS.map((color) => (
        <button
          key={color}
          className={`rounded-full overflow-hidden border hover:brightness-125 hover:scale-125 duration-300`}
          onClick={() => onColorSelect(color)}
          disabled={disabled}
        >
          <div className="h-6 w-6" style={{ backgroundColor: color }}></div>
        </button>
      ))}
    </div>
  );
}
