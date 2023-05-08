const runInWorker = <T, R>(func: Function, data: T): Promise<R> => {
    return new Promise((resolve, reject) => {
        const funcString = `
          const ${func.name} = ${func.toString()}
            onmessage = (event) => {
              const data = event.data;
              const result = ${func.name}(data);
              postMessage(result);
            }
          `

        const blob = new Blob([funcString], { type: 'text/javascript' })
        const url = URL.createObjectURL(blob)
        const worker = new Worker(url)
        worker.onmessage = (event) => {
            const result = event.data as R
            resolve(result)
            worker.terminate()
            URL.revokeObjectURL(url)
        }
        worker.onerror = (error) => {
            reject(error)
            worker.terminate()
            URL.revokeObjectURL(url)
        }
        worker.postMessage(data)
    })
}

export default runInWorker
