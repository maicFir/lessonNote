
import gulp from 'gulp';
import rollup from 'rollup';
import { builds, getConfig } from './config';

export const buildTask = () => {
    const buildsKeys = Object.keys(builds);
    gulp.task('build', () => {
        const bundle = buildsKeys.map(async (key) => {
            return {
                value: await rollup.rollup(getConfig),
                key
            }
        });
        bundle.forEach((v) => {
            const item = getConfig[v.key]
            v.value.write({
                ...item
            })
        })
    })
}