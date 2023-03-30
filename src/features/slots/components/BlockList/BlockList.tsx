import { ApiBlock } from '../../../../types/blocks/ApiBlock';
import { ImageStyles } from '../../../../types/blocks/ImageStyles';
import { TextStyles } from '../../../../types/blocks/TextStyles';
import { TextContent } from '../../../../types/blocks/TextContent';
import { ImageContent } from '../../../../types/blocks/ImageContent';

import './BlockList.scss';

interface IProps {
  blocks: ApiBlock[];
}

export function BlockList({ blocks }: IProps) {
  const blockList = blocks.map((block) => {
    return (
      <div key={block.id} className="block">
        {block.type === 'IMAGE' && <div
          className="type__image"
          style={{
            width: block.styles ? (block.styles as ImageStyles).width : undefined,
            height: block.styles ? (block.styles as ImageStyles).height : undefined,
          }}
        >
          <img src={(block.content as ImageContent).url} alt="imageContent" />
        </div>}
        {block.type === 'TEXT' && <div
          className="type__text"
          style={{
            fontWeight: block.styles ? (block.styles as TextStyles).fontWeight : undefined,
            fontSize: block.styles ? (block.styles as TextStyles).fontSize : undefined,
            color: block.styles ? (block.styles as TextStyles).color : undefined,
          }}
        >
          {(block.content as TextContent).text}
        </div>}
        {/* <UBlockMenu
          :index="index"
          :blocks-length="mySlot.blocks.length"
          :block="block"
          :blocks="mySlot.blocks"
          :my-slot="mySlot"
          class="block-list__menu"
          @show-edit-block-dialog="showEditBlockDialog"
          @move-block="moveBlock"
          @delete-block="deleteBlock"
        /> */}
      </div>
    );
  });

  return (
    <div className="u-block-list">
      {/* <CTransitionList> */}
      {blockList}
      {/* </CTransitionList> */}
    </div>
  );
}
