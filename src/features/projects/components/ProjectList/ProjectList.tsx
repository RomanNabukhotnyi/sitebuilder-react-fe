import { ApiProject } from '../../../../types/projects/ApiProject';

import './ProjectList.scss';

interface IProps {
  className?: string;
  loadingGetProjects: boolean;
  projects: ApiProject[];
}

export function ProjectList({ projects, loadingGetProjects }: IProps) {
  const openProject = (projectId: number) => {};

  const projectList = projects.map((project) => {
    return (
      <div key={project.id} className="project">
        {/* <UProjectMenu
            v-if="project.id === menuProjectId"
            v-model:show="menuVisible"
            :user="user"
            :project="project"
            @show-permissions="showPermissions(project)"
            @show-api-key="showApiKey(project)"
            @edit="showEditDialog(project)"
            @delete="deleteProject(project.id)"
          /> */}
        <div onClick={() => openProject(project.id)} />
        <div className="imageContainer">
          <button type="button" className="btnProjectMenu">
            {/* @click.stop="showMenu(project.id)" */}
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
      {!loadingGetProjects && projects.length && <div className="projectsContainer">
        {/* <CTransitionList> */}
        {projectList}
        {/* </CTransitionList> */}
      </div>}
      {!loadingGetProjects && projects.length === 0 && <div className="noProjects">
        <h3>No projects</h3>
      </div>}
      {loadingGetProjects && <div className="projectsContainer">
        {/* <div
        v-for="item in 3"
        :key="item"
        class="project-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      /> */}
      </div>}
    </div>
  );
}
