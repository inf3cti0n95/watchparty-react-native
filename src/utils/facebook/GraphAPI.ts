import {
  GraphRequest,
  GraphRequestManager,
  GraphRequestConfig,
} from 'react-native-fbsdk'

export default <T>(
  endpoint: string,
  options?: GraphRequestConfig
): Promise<T | undefined> => {
  const requestManager = new GraphRequestManager()
  return new Promise((resolve, reject) => {
    const request = new GraphRequest(
      endpoint,
      options,
      (error, result: any) => {
        if (error) {
          return reject(error)
        }
        resolve(result as T | undefined)
      }
    )
    requestManager.addRequest(request).start()
  })
}
