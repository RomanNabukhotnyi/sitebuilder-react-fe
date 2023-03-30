import './ProjectMenu.scss';

interface IProps {
  setIsOpenMenu: (value: boolean) => void;
  setIsEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsApiKeyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPermissionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProject: () => void;
}

export function ProjectMenu({ setIsEditFormOpen, deleteProject, setIsOpenMenu, setIsApiKeyOpen, setIsPermissionsOpen }: IProps) {
  return (
    <div className="u-project-menu">
      <div v-if="show" className="overlay" onClick={() => setIsOpenMenu(false)} />
      {/* <Transition
      v-if="show"
      name="menu"
    > */}
      <div className="menu">
        <div className="action" onClick={() => setIsPermissionsOpen(true)}>
          Permissions
        </div>
        <div v-if="isOwner" className="action" onClick={() => setIsApiKeyOpen(true)}>
          Api key
        </div>
        <div v-if="isOwner" className="action" onClick={() => setIsEditFormOpen(true)}>
          Edit
        </div>
        <div v-if="isOwner" className="action" onClick={() => deleteProject()}>
          Delete
        </div>
      </div>
      {/* </Transition> */}
    </div>
  );
}
