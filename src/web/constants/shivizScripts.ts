import { IShiVizScripts } from "../types/shiviz";

const pathToShivizJsDir = "media/js/shiviz";
const shivizScripts: IShiVizScripts = {
  builder: {
    folderPath: `${pathToShivizJsDir}/builder`,
    files: [
      "builderGraph",
      "builderNode",
      "graphBuilder",
      "graphBuilderHost",
      "graphBuilderNode",
    ],
  },
  graph: {
    folderPath: `${pathToShivizJsDir}/graph`,
    files: [
      "abstractGraph",
      "abstractNode",
      "dfsGraphTraversal",
      "graphEvent",
      "graphTraversal",
    ],
  },
  logEventMatcher: {
    folderPath: `${pathToShivizJsDir}/logEventMatcher`,
    files: [
      "lemAST",
      "lemInterpreter",
      "lemParser",
      "lemToken",
      "lemTokenizer",
      "logEventMatcher",
    ],
  },
  model: {
    folderPath: `${pathToShivizJsDir}/model`,
    files: [
      "logEvent",
      "modelGraph",
      "modelNode",
      "parser",
      "vectorTimestamp",
      "vectorTimestampSerializer",
    ],
  },
  motifFinder: {
    folderPath: `${pathToShivizJsDir}/motifFinder`,
    files: [
      "broadcastGatherFinder",
      "customMotifFinder",
      "motif",
      "motifDrawer",
      "motifFinder",
      "motifGroup",
      "motifNavigator",
      "requestResponseFinder",
      "textQueryMotifFinder",
    ],
  },
  transform: {
    folderPath: `${pathToShivizJsDir}/transform`,
    files: [
      "collapseSequentialNodesTransformation",
      "hideHostTransformation",
      "highlightHostTransformation",
      "highlightMotifTransformation",
      "showDiffTransformation",
      "transformation",
      "transformer",
    ],
  },
  util: {
    folderPath: `${pathToShivizJsDir}/util`,
    files: ["exception", "regexp", "util"],
  },
  visualization: {
    folderPath: `${pathToShivizJsDir}/visualization`,
    files: [
      "abbreviation",
      "controller",
      "global",
      "hostPermutation",
      "layout",
      "view",
      "visualEdge",
      "visualGraph",
      "visualNode",
    ],
  },
  trexUtil: {
    folderPath: `${pathToShivizJsDir}/trexUtil`,
    files: [
      "trexParser",
      "generateShiVizCompatibleInput",
      "generateVectorClock",
    ],
  },
  misc: {
    folderPath: `${pathToShivizJsDir}`,
    files: ["clusterer", "deployed", "dev", "searchBar", "shiviz"],
  },
  localScripts: {
    folderPath: `${pathToShivizJsDir}/local_scripts`,
    files: ["d3.v4.min", "jquery-3.2.1.min"],
  },
};

export default shivizScripts;
