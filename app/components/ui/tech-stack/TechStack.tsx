import { Icon } from "@/components/ui/icon";
import type { IconName } from "@shared-types/icons";
import Button from "@/components/ui/button";
import capitalizeFirstLetter from './../../utils/capitalizeFirstLetter';

export interface TechStackGroup {
    id: string;
    title: string;
    items: readonly IconName[];
    listClassName: string;
    itemClassName: string;
    titleClassName?: string;
    wrapperClassName?: string;
}

interface TechStackProps {
    className?: string;
    groups: readonly TechStackGroup[];
}

export default function TechStack({ className = "", groups }: TechStackProps) {
    return (
        <div className={className}>
            {groups.map((group) => (
                <div key={group.id} className={group.wrapperClassName}>
                    <h2 className={group.titleClassName}>{group.title}</h2>
                    <ul className={group.listClassName}>
                        {group.items.map((tech) => (
                            <li key={tech} className={group.itemClassName}>
                                <Button className="btn-primary btn-tech" >
                                    <Icon name={tech} aria-hidden="true" focusable="false" />
                                    <span className="sr-only">{capitalizeFirstLetter(tech)}</span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
