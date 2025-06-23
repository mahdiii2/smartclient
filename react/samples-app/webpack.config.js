const path = require("path");
const webpack = require("webpack");

const DefinePlugin = webpack.DefinePlugin;
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const getFilesFromDir = require("./config/files");
const PAGE_DIR = path.join("src", "examples", path.sep);

const htmlPlugins = getFilesFromDir(PAGE_DIR, [".html"]).map(filePath => {
    const fileName = filePath.replace(PAGE_DIR, "");
    
    console.log('fileName = ', fileName);
    
    // { chunks:["contact", "vendor"], template: "src/pages/contact.html",  filename: "contact.html"}
    return new HtmlWebPackPlugin({
        chunks: [fileName.replace(path.extname(fileName), ""), "vendor"],
        template: filePath,
        filename: fileName
    });
});

// { contact: "./src/pages/contact.js" }
const entry = getFilesFromDir(PAGE_DIR, [".jsx"]).reduce((obj, filePath) => {
    const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
    obj[entryChunkName] = `./${filePath}`;
    return obj;
}, {});

// optimization/minimization settings
function getOptimizationConfig(env, argv) {
    let cacheGroups = {
        vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            enforce: true
        },
        framework: {
            test: /samples-app[\/\\]isomorphic[\/\\](?!react)/,
            chunks: "all",
            name: "isomorphic",
            enforce: true
        },
        reactglue: {
            test: /samples-app[\/\\](src[\/\\])?isomorphic[\/\\]react/,
            chunks: "all",
            name: "isomorphic-react",
            enforce: true
        }
    };
    let optimization = {
        minimize: false,
        splitChunks: {
            cacheGroups: cacheGroups
        }
    };

    if (argv.mode === 'production') {
        Object.assign(optimization, {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                                        exclude: /isomorphic(?!\-)/,
                    terserOptions: {
                        keep_fnames: true
                    }
                })
            ]
        });
    }
    return optimization;
}

function getProdRootDir(env, argv) {
    if (argv.mode !== 'production') return;
    let dir = process.env.REACT_SAMPLES_PROD_ROOT;
    if (dir) return JSON.stringify(dir);
}

function getOutputFilename(env, argv) {
    //if (!argv.watch) return "[name].[id].js";
}

module.exports = (env, argv) => ({
    entry: entry,
    output: {
        path: path.join(__dirname, "build"),
        filename: getOutputFilename(env, argv)
    },
    devtool: process.env.WEBPACK_SERVE ? 'eval-source-map' : false,
    plugins: [
        ...htmlPlugins,

        new DefinePlugin({
            // expose dir to browser code
            prodRootDir: getProdRootDir(env, argv)
        })
    ],
    resolve: {
        symlinks: false,
        alias: {
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src", "components")
        }
    },
    module: {
        rules: [{
                test: /\.(js$|jsx$)/i,

                exclude: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "isomorphic", "system")
                ],
                
                use: {
                    loader: "babel-loader",
                    options: {
                        sourceType: "unambiguous"
                    }
                },
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
                /*
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        modules: true,
                    },                    
                }],
                */
                exclude: /node_modules/,
            },

            {
                test: /\.(svg|jpg|gif|png)$/i,

                exclude: /node_modules/,
            },

            {
                test: /\.(xml)$/i,
                type: "asset/resource",
                exclude: /node_modules/,
                generator: {
                    filename: '[path][name][ext][query]'
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                exclude: /node_modules/,
            }
        ]
    },
    optimization: getOptimizationConfig(env, argv)
});
