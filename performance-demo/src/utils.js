export function checkPerf(target, name, desc) {
  const oldFn = desc.value
  desc.value = function() {

    performance.mark(name)
    const result = oldFn.apply(this, arguments)
    performance.mark(name)

    const [start, end] = performance.getEntriesByName(name)
    console.log(`%c${name} took ${end.startTime - start.startTime} ms to run`, 'font-weight: bold')

    return result
  }
  return desc
}

