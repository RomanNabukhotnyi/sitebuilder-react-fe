import { ApiProject } from '../../../../types/projects/ApiProject';

import './ProjectList.scss';

interface IProps {
  className?: string;
  projects: ApiProject[];
}

export function ProjectList({ projects }: IProps) {
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
      <div v-show="!loadingGetProjects && projects.length" className="projectsContainer">
        {/* <CTransitionList> */}
        {projectList}
        {/* </CTransitionList> */}
      </div>
      <div v-show="!loadingGetProjects && projects.length === 0" className="noProjects">
        <h3>No projects</h3>
      </div>
      <div v-show="loadingGetProjects" className="projectsContainer">
        {/* <div
        v-for="item in 3"
        :key="item"
        class="project-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      /> */}
      </div>
    </div>
  );
}
