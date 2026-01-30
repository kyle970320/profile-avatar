import { cn } from "@/shared/lib/variants";

interface Props {
  state: Record<string, string>;
  title: string;
  items: Array<{
    key: string;
    value: string;
  }>;
  handleProfileState: (key: string, value: string) => void;
}

export default function ColorPannel({
  state,
  title,
  items,
  handleProfileState,
}: Props) {
  const acitveSkinClass = (
    defaultClass: string,
    key: string,
    value: string,
  ) => {
    return cn(
      defaultClass,
      state[key] === value ? `border-main` : "border-sub-bg",
    );
  };
  return (
    <div>
      <p className="text-foreground">{title}</p>
      <div className="flex gap-2">
        {items.map((item) => (
          <div
            style={{ backgroundColor: `#${item.value}` }}
            className={acitveSkinClass(
              "w-12 h-12 border-2 border-sub-bg rounded-xl cursor-pointer",
              item.key,
              item.value,
            )}
            onClick={() => handleProfileState(item.key, item.value)}
          />
        ))}
      </div>
    </div>
  );
}
