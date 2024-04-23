const fs = require('fs');
const path = require('path');
const { Compilation } = require('webpack');
const { RawSource } = require('webpack-sources');

class AutoIndexPlugin {
  constructor(inputDir) {
    if (!inputDir || typeof inputDir !== 'string') {
      throw new Error('Input directory path must be a valid string');
    }
    this.inputDir = inputDir;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('AutoIndexPlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'AutoIndexPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        async (assets, callback) => {
          console.log('Input directory:', this.inputDir);
          const files = fs.readdirSync(this.inputDir);
          const exportEntries = files
            .filter(file => file.endsWith('.ts') && file !== 'index.ts')
            .map(file => `export * from './${file.replace(/\.ts$/, '')}';\n`)
            .join('');

          console.log('Export entries:', exportEntries);

          const outputPath = path.join(this.inputDir, 'index.ts');
          console.log('Output path:', outputPath);

          const assetKey = outputPath.replace(compiler.options.output.path || '', '').replace(/^\/|\\/, '');
          console.log('Asset key:', assetKey);

          fs.writeFileSync(outputPath, exportEntries);
          callback();
        }
      );
    });
  }
}

module.exports = AutoIndexPlugin;
