// types/js-beautify.d.ts
declare module 'js-beautify' {
  export const html: (code: string, options?: Record<string, any>) => string;
  export const css: (code: string, options?: Record<string, any>) => string;
  export const js: (code: string, options?: Record<string, any>) => string;
}