import { ActionListItem } from '../../../types/ActionMenu';

import './ActionMenu.scss';

interface IProps {
  isColumn: boolean;
  actions: ActionListItem[];
  handler: (actionName: string) => void;
}

export function ActionMenu({ isColumn, actions, handler }: IProps) {
  const actionList = actions.map((action) => {
    return (
      <div
        key={action.iconName}
        className={`action-menu__list-item ${action.isDisabled ? 'action-menu__list-item--disabled' : ''}`}
        onClick={() => handler(action.actionName)}
      >
        <span className="material-icons-outlined md-18">{action.iconName}</span>
      </div>
    );
  });

  return (
    <div className="c-action-menu">
      <div className={`action-menu__list ${isColumn ? 'action-menu__list--column' : ''}`}>{actionList}</div>
    </div>
  );
}
