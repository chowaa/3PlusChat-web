import { Plugin } from 'vite';

export function sassPlugin(): Plugin {
  return {
    name: 'sass',
    transform(code, id) {
      if (id.endsWith('.scss')) {
        const result = compileSass(code);
        return {
          code: result.css.toString(),
          map: result.map.toString()
        };
      }
    }
  };
}

function compileSass(code: string) {
  // 使用sass编译器将SCSS代码转换为CSS
  const result = require('sass').renderSync({
    data: code,
    outputStyle: 'compressed'
  })
  return result;
}
