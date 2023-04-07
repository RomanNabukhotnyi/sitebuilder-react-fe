import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { deleteProject } from '../../../../store/projects/projectsSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { ProjectMenu } from '../ProjectMenu/ProjectMenu';
import { TransitionList } from '../../../common/TransitionList/TransitionList';

import { ApiProject } from '../../../../types/projects/ApiProject';

import './ProjectList.scss';

interface IProps {
  className?: string;
  loadingGetProjects: boolean;
  projects: ApiProject[];
  openMenu: (projectId: number) => void;
  openEditForm: () => void;
  setIsApiKeyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPermissionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectList({
  projects,
  loadingGetProjects,
  openMenu,
  openEditForm,
  setIsApiKeyOpen,
  setIsPermissionsOpen,
}: IProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [menuProjectId, setMenuProjectId] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openProject = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject(menuProjectId));
  };

  const handleOpenMenu = (projectId: number) => {
    setMenuProjectId(projectId);
    openMenu(projectId);
    setIsOpenMenu(true);
  };

  console.log(new Array(3).map((v, index) => {
    return (
      <div
        key={index}
        className="project-placeholder placeholder-animate"
        style={{ animationDelay: `1.${index}s` }}
      />
    );
  }))

  const projectList = projects.map((project) => {
    return (
      <div key={project.id} className="project">
        {isOpenMenu && project.id === menuProjectId && (
          <ProjectMenu
            v-if="project.id === menuProjectId"
            setIsOpenMenu={setIsOpenMenu}
            setIsApiKeyOpen={setIsApiKeyOpen}
            openEditForm={openEditForm}
            setIsPermissionsOpen={setIsPermissionsOpen}
            deleteProject={handleDeleteProject}
          />
        )}
        <div className="projectHover" onClick={() => openProject(project.id)} />
        <div className="imageContainer">
          <button type="button" className="btnProjectMenu" onClick={() => handleOpenMenu(project.id)}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#554d56"
                fillRule="evenodd"
                d="M11.437 7.5a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1H7.563a2 2 0 0 1 3.874 0H19.5a.5.5 0 1 1 0 1h-8.063zm-1.07 0a.995.995 0 0 0 0-1 1 1 0 1 0 0 1zm3.196 4.5a2 2 0 0 1 3.874 0H19.5a.5.5 0 1 1 0 1h-2.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 1 1 0-1h9.063zm1.07 0a.995.995 0 0 0 0 1 1 1 0 1 0 0-1zm-5.196 6a2 2 0 0 1-3.874 0H4.5a.5.5 0 1 1 0-1h1.063a2 2 0 0 1 3.874 0H19.5a.5.5 0 1 1 0 1H9.437zm-1.07 0a.995.995 0 0 0 0-1 1 1 0 1 0 0 1z"
              />
            </svg>
          </button>
        </div>
        <div className="project__body">
          <div className="projectName">{project.name}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="u-project-list">
      {!loadingGetProjects && !!projects.length && (
        <TransitionList className="projectsContainer">{projectList}</TransitionList>
      )}
      {!loadingGetProjects && projects.length === 0 && (
        <div className="noProjects">
          <h3>No projects</h3>
        </div>
      )}
      {loadingGetProjects && (
        <div className="projectsContainer">
          {new Array(3).fill(null).map((v, index) => {
            return (
              <div
                key={index}
                className="project-placeholder placeholder-animate"
                style={{ animationDelay: `1.${index}s` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
