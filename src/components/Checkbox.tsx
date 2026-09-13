interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  note?: string;
}

export function Checkbox({ id, checked, onChange, label, note }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-[44px] w-full cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-military/5 active:bg-military/10"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-6 w-6 shrink-0 accent-military"
      />
      <span className="flex-1 min-w-0">
        <span
          className={
            checked
              ? 'block break-words text-charcoal/50 line-through'
              : 'block break-words text-charcoal'
          }
        >
          {label}
        </span>
        {note && <span className="mt-0.5 block break-words text-sm text-charcoal/60">{note}</span>}
      </span>
    </label>
  );
}
