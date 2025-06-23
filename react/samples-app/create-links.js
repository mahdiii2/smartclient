#!/usr/bin/env node

const fs = require('fs');
const isomorphic = "isomorphic";
const reactSamples = "isomorphic/system/reactSamples";

function createDirLink(target, path, title) {
    if (fs.existsSync(path)) {
        console.log(`Not creating the ${title} link as a link or directory is already present`);
    } else {
        fs.symlinkSync(target, path, 'junction');
        console.log(`Created the ${title} link`);
    }
}

createDirLink(`../../${isomorphic}`, "isomorphic", "isomorphic runtime");
createDirLink(`../../${reactSamples}/build`, "build", "React build directory");
createDirLink(`../../../${reactSamples}/source`, "src/examples", "React source directory");
