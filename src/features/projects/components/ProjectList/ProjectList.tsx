import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { deleteProject } from '../../../../store/projects/projectsSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { ProjectMenu } from '../ProjectMenu/ProjectMenu';

import { ApiProject } from '../../../../types/projects/ApiProject';

import './ProjectList.scss';

interface IProps {
  className?: string;
  loadingGetProjects: boolean;
  projects: ApiProject[];
  setIsEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsApiKeyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPermissionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectList({ projects, loadingGetProjects, setIsEditFormOpen, setIsApiKeyOpen, setIsPermissionsOpen }: IProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [menuProjectId, setMenuProjectId] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openProject = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDeleteProject = (projectId: number) => {
    dispatch(deleteProject(projectId));

  };

  const openMenu = (projectId: number) => {
    setMenuProjectId(projectId);
    setIsOpenMenu(true);
  };

  const projectList = projects.map((project) => {
    return (
      <div key={project.id} className="project">
        {isOpenMenu && project.id === menuProjectId && (
          <ProjectMenu
            v-if="project.id === menuProjectId"
            setIsOpenMenu={setIsOpenMenu}
            // openPermissions: () => void;
            // openApiKey: () => void;
            setIsApiKeyOpen={setIsApiKeyOpen}
            setIsEditFormOpen={setIsEditFormOpen}
            setIsPermissionsOpen={setIsPermissionsOpen}
            deleteProject={() => handleDeleteProject(project.id)}
            // :user="user"
            // :project="project"
            // @show-permissions="showPermissions(project)"
            // @show-api-key="showApiKey(project)"
            // @edit="showEditDialog(project)"
            // @delete="deleteProject(project.id)"
          />
        )}
        <div className="projectHover" onClick={() => openProject(project.id)} />
        <div className="imageContainer">
          <button type="button" className="btnProjectMenu" onClick={() => openMenu(project.id)}>
            {/* <CIconMenu /> */}
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
        <div className="projectsContainer">
          {/* <CTransitionList> */}
          {projectList}
          {/* </CTransitionList> */}
        </div>
      )}
      {!loadingGetProjects && projects.length === 0 && (
        <div className="noProjects">
          <h3>No projects</h3>
        </div>
      )}
      {loadingGetProjects && (
        <div className="projectsContainer">
          {/* <div
        v-for="item in 3"
        :key="item"
        class="project-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      /> */}
        </div>
      )}
    </div>
  );
}
