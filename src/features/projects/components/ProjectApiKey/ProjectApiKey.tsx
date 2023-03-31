import { Button } from '../../../common/Button/Button';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';

import {
  selectProjectById,
  createProjectApikey,
  refreshProjectApikey,
  deleteProjectApikey,
  selectLoadingCreateApiKey,
  selectLoadingRefreshApiKey,
  selectLoadingDeleteApiKey,
} from '../../../../store/projects/projectsSlice';

import './ProjectApiKey.scss';

interface IProps {
  projectId: number;
}

export function ProjectApiKey({ projectId }: IProps) {
  const project = useAppSelector((state) => selectProjectById(state, projectId))!;
  const loadingCreateApiKey = useAppSelector(selectLoadingCreateApiKey);
  const loadingRefreshApiKey = useAppSelector(selectLoadingRefreshApiKey);
  const loadingDeleteApiKey = useAppSelector(selectLoadingDeleteApiKey);
  const dispatch = useAppDispatch();

  const createApikey = async () => {
    await dispatch(createProjectApikey(projectId));
  };

  const refreshApikey = async (apiKeyId: number) => {
    await dispatch(
      refreshProjectApikey({
        projectId,
        apiKeyId,
      }),
    );
  };

  const deleteApiKey = async (apiKeyId: number) => {
    await dispatch(
      deleteProjectApikey({
        projectId,
        apiKeyId,
      }),
    );
  };

  return (
    <div className="u-project-api-key">
      <h4>Api key</h4>
      <div className="apiKeys">
        {/* <Transition name="list"> */}
        {project.apiKey && (
          <div
            //   v-if="project.apiKey && !loadingCreateApiKey"
            className="apiKey"
            //   :class="{
            //     apiKey: true,
            //     loadingApiKey: loadingDeleteApiKey || loadingRefreshApiKey,
            //   }"
          >
            <div className="apiKey">{project.apiKey?.key}</div>
            <div className="roleAndActions">
              <div v-if="isOwner" className="actions">
                <Button
                  isDisabled={loadingRefreshApiKey}
                  label="Refresh"
                  className="button__refresh"
                  onClick={() => refreshApikey(project.apiKey!.id)}
                />
                <Button
                  isDisabled={loadingDeleteApiKey}
                  label="Delete"
                  className="button__delete"
                  onClick={() => deleteApiKey(project.apiKey!.id)}
                />
              </div>
            </div>
          </div>
        )}
        {/* </Transition> */}
      </div>
      {/* <Transition name="createButton"> */}
      {!project.apiKey && (
        <div
          // v-if="isOwner && !project.apiKey"
          className="field"
        >
          <Button
            isLoading={loadingCreateApiKey}
            isDisabled={loadingCreateApiKey}
            label="Create"
            className="button"
            onClick={createApikey}
          />
        </div>
      )}
      {/* </Transition> */}
    </div>
  );
}
