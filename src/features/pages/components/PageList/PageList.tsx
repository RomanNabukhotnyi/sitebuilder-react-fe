import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../../common/Button/Button';

import { ApiPage } from '../../../../types/pages/ApiPage';

import './PageList.scss';

interface IProps {
  className?: string;
  loadingGetPages: boolean;
  pages: ApiPage[];
}

export function PageList({ pages, loadingGetPages }: IProps) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const openPage = (pageId: number) => {
    navigate(`/projects/${projectId}/pages/${pageId}`);
  };

  const pageList = pages.map((page) => {
    return (
      <div className="page">
        <div
          className="pageImage"
            onClick={() => openPage(page.id)}
        />
        <div className="page__body">
          <div className="page__name">
            <p>{page.name}</p>
          </div>
          <div className="actions">
            <Button
              label="Edit"
              className="button__edit"
              //   @click.stop="showEditDialog(element)"
            />
            <Button
              label="Delete"
              className="button__delete"
              //   @click.stop="deletePage(element.id)"
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="u-page-list">
      {!loadingGetPages && !!pages.length && (
        <div className="pagesContainer">
          {/* <Draggable
        v-model="draggablePages"
        tag="transition-group"
        group="pages"
        animation="200"
        ghost-class="ghost"
        :component-data="{
          name: 'pageList',
        }"
      > */}
          {pageList}
          {/* </Draggable> */}
        </div>
      )}
      {!loadingGetPages && pages.length === 0 && (
        <div className="noPages">
          <h3>No pages</h3>
        </div>
      )}
      {loadingGetPages && (
        <div className="pagesContainer">
          {/* <div
        v-for="item in 3"
        :key="item"
        className="page-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      /> */}
        </div>
      )}
    </div>
  );
}
