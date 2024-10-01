import { performance } from 'node:perf_hooks'

async function measurePerformance(fn) {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()

    return {
        result,
        time: end - start,
    }
}

export { measurePerformance }
