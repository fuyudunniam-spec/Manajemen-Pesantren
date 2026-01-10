import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
    name: string;
    color: string;
    className?: string;
}

export function CategoryBadge({ name, color, className }: CategoryBadgeProps) {
    return (
        <Badge
            className={`border ${className}`}
            style={{
                backgroundColor: `${color}15`,
                borderColor: color,
                color: color,
            }}
        >
            {name}
        </Badge>
    );
}
