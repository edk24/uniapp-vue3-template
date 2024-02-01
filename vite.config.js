import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssRemToResponsivePixel from 'postcss-rem-to-responsive-pixel'
import postcssWeappTailwindcssRename from 'weapp-tailwindcss-webpack-plugin/postcss'
import vwt from 'weapp-tailwindcss-webpack-plugin/vite'

const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp = process.env.UNI_PLATFORM === 'app'
const weappTailwindcssDisabled = isH5 || isApp
const path = require('path')

const postcssPlugin = [autoprefixer(), tailwindcss()]
if (!weappTailwindcssDisabled) {
    postcssPlugin.push(
        postcssRemToResponsivePixel({
            rootValue: 32,
            propList: ['*'],
            transformUnit: 'rpx',
        })
    )
    postcssPlugin.push(postcssWeappTailwindcssRename())
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni(), weappTailwindcssDisabled ? undefined : vwt()],
    css: {
        postcss: {
            plugins: postcssPlugin,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@static': path.resolve(__dirname, 'src/static'),
        },
    },
    transpileDependencies: ['z-paging']
})