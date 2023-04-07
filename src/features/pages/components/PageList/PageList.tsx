import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../../common/Button/Button';
import { TransitionList } from '../../../common/TransitionList/TransitionList';

import { useAppDispatch } from '../../../../app/hooks';

import { deletePage } from '../../../../store/pages/pagesSlice';

import { ApiPage } from '../../../../types/pages/ApiPage';

import './PageList.scss';

interface IProps {
  className?: string;
  loadingGetPages: boolean;
  pages: ApiPage[];
  openEditForm: (pageId: number) => void;
}

export function PageList({ pages, loadingGetPages, openEditForm }: IProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectId } = useParams();

  const openPage = (pageId: number) => {
    navigate(`/projects/${projectId}/pages/${pageId}`);
  };

  const handleDeletePage = async (pageId: number) => {
    await dispatch(
      deletePage({
        projectId: +projectId!,
        pageId,
      }),
    );
  };

  const pageList = pages.map((page) => {
    return (
      <div className="page" key={page.id}>
        <div className="pageImage" onClick={() => openPage(page.id)} />
        <div className="page__body">
          <div className="page__name">
            <p>{page.name}</p>
          </div>
          <div className="actions">
            <Button label="Edit" className="button__edit" onClick={() => openEditForm(page.id)} />
            <Button label="Delete" className="button__delete" onClick={() => handleDeletePage(page.id)} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="u-page-list">
      {!loadingGetPages && !!pages.length && <TransitionList className="pagesContainer">{pageList}</TransitionList>}
      {!loadingGetPages && pages.length === 0 && (
        <div className="noPages">
          <h3>No pages</h3>
        </div>
      )}
      {loadingGetPages && (
        <div className="pagesContainer">
          {new Array(3).fill(null).map((v, index) => {
            return (
              <div
                key={index}
                className="page-placeholder placeholder-animate"
                style={{ animationDelay: `1.${index}s` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
