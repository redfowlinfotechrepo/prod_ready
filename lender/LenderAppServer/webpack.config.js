/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import nodeExternals from "webpack-node-externals";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildMode = "production"; //process.env.NODE_ENV === "production" ? "production" : "development";

export default {
  entry: "./src/app.js",
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["nanoid"], // Bundles specified libraries alone and leaves other node_modules out
    }),
  ],
  /* Uncomment this block if you start using typescript in future
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },*/
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: buildMode,
};
