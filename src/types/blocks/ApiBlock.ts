import type { TextContent } from "./TextContent";
import type { ImageContent } from "./ImageContent";
import type { TextAttributes } from "./TextAttributes";
import type { ImageAttributes } from "./ImageAttributes";
import type { TextStyles } from "./TextStyles";
import type { ImageStyles } from "./ImageStyles";

export interface ApiBlock {
  id: number;
  type: 'TEXT' | 'IMAGE';
  content: TextContent | ImageContent;
  attributes: TextAttributes | ImageAttributes;
  styles: TextStyles | ImageStyles;
  order: number;
}
