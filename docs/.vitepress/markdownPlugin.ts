import MarkdownIt from "markdown-it";
import { getArticleBlurImage, getOriginalImage } from "./theme/utils";
const markdownImagePlugin: MarkdownIt.PluginSimple = (md) => {
  const defaultRender = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    tokens[idx].attrSet("data-src", tokens[idx].attrs![0][1]);
    tokens[idx].attrSet("data-original-src", tokens[idx].attrs![0][1]);
    tokens[idx].attrSet(
      "data-zoom-src",
      getOriginalImage(tokens[idx].attrs![0][1])
    );
    tokens[idx].attrs![0][1] = getArticleBlurImage(tokens[idx].attrs![0][1]); // 清除 src 属性
    return defaultRender!(tokens, idx, options, env, self);
  };
};

export default markdownImagePlugin;
